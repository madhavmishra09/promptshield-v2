import type { ChatInput, ChatResult } from "../security/types.js";

import { detectPromptInjection } from "../security/ruleDetector.js";
import riskEngine from "../security/riskEngine.js";
import policyEngine from "../security/policyEngine.js";
import outputValidator from "../security/outputValidator.js";

import mlService from "./ml.service.js";
import ollamaService from "./ollama.service.js";
import loggingService from "./logging.service.js";

export default async function chatService(
    input: ChatInput
): Promise<ChatResult> {
    const detectionResult = detectPromptInjection(input.prompt);

    // Obtain the ML probability. If the ML service fails, do not
    // send the prompt to the LLM without a security assessment.
    let mlProbability: number;

    try {
        const mlResult = await mlService(input.prompt);
        mlProbability = mlResult.probability;
    } catch (error) {
        console.error("PromptShield ML service failed:", error);

        const blockedResponse =
            "Request blocked because security analysis is unavailable.";

        await loggingService({
            userId: input.userId,
            prompt: input.prompt,
            response: blockedResponse,
            detected: detectionResult.detected,
            matchedRules: detectionResult.matchedRules,
            categories: detectionResult.categories,
            decision: "BLOCK",
        });

        return {
            response: blockedResponse,
            decision: "BLOCK",
            risk: 100,
        };
    }

    const riskResult = riskEngine({
        matchedRules: detectionResult.matchedRules,
        mlProbability,
    });


    const criticalRuleIds = new Set([
        "RULE-001", // Ignore previous instructions
        "RULE-002", // Override system/developer instructions
        "RULE-003", // System prompt extraction
        "RULE-004", // Developer instruction extraction
        "RULE-007", // Security bypass
        "RULE-008", // Security control removal
        "RULE-009", // Credential extraction
        "RULE-010", // Internal information extraction
        "RULE-012", // Trusted content injection
        "RULE-013", // Instruction priority manipulation
    ]);

    const criticalRuleMatched = detectionResult.matchedRules.some(
        (rule) => criticalRuleIds.has(rule.ruleId)
    );

    const policyResult = policyEngine({
        finalRisk: riskResult.finalRisk,
    });

    const shouldBlock =
        criticalRuleMatched || policyResult.decision === "BLOCK";

    if (shouldBlock) {

        const blockedResponse = "Request blocked by PromptShield.";

        await loggingService({
            userId: input.userId,
            prompt: input.prompt,
            response: blockedResponse,
            detected: detectionResult.detected || mlProbability >= 0.45,
            matchedRules: detectionResult.matchedRules,
            categories: detectionResult.categories,
            ruleRisk: riskResult.ruleRisk,
            mlProbability: riskResult.mlProbability,
            finalRisk: riskResult.finalRisk,
            decision: "BLOCK",
        });

        return {
            response: blockedResponse,
            decision: "BLOCK",
            risk: criticalRuleMatched
    ? Math.max(riskResult.finalRisk, 70)
    : riskResult.finalRisk,
        };
    }

    const ollamaResult = await ollamaService({
        prompt: input.prompt,
    });

    const validationResult = outputValidator({
        output: ollamaResult.response,
    });

    if (!validationResult.safe) {
        const blockedResponse = "Response blocked by PromptShield.";

        await loggingService({
            userId: input.userId,
            prompt: input.prompt,
            response: blockedResponse,
            detected: detectionResult.detected,
            matchedRules: detectionResult.matchedRules,
            categories: detectionResult.categories,
            ruleRisk: riskResult.ruleRisk,
            mlProbability: riskResult.mlProbability,
            finalRisk: riskResult.finalRisk,
            decision: "BLOCK",
        });

        return {
            response: blockedResponse,
            decision: "BLOCK",
            risk: 100,
        };
    }

    await loggingService({
        userId: input.userId,
        prompt: input.prompt,
        response: ollamaResult.response,
        detected: detectionResult.detected,
        matchedRules: detectionResult.matchedRules,
        categories: detectionResult.categories,
        ruleRisk: riskResult.ruleRisk,
        mlProbability: riskResult.mlProbability,
        finalRisk: riskResult.finalRisk,
        decision: "ALLOW",
    });

    return {
        response: ollamaResult.response,
        decision: "ALLOW",
        risk: riskResult.finalRisk,
    };
}