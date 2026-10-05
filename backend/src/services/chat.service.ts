import type { ChatInput, ChatResult } from "../security/types.js";

import { detectPromptInjection } from "../security/ruleDetector.js";

import outputValidator from "../security/outputValidator.js";

import ollamaService from "./ollama.service.js";

import loggingService from "./logging.service.js";


export default async function chatService(
    input: ChatInput
): Promise<ChatResult> {

    const detectionResult = detectPromptInjection(input.prompt);


    // Block detected prompt injections
    if (detectionResult.detected) {

        const blockedResponse = "Request blocked by PromptShield.";

        await loggingService({
            userId: input.userId,
            prompt: input.prompt,
            response: blockedResponse,
            detected: true,
            matchedRules: detectionResult.matchedRules,
            categories: detectionResult.categories,
            decision: "BLOCK",
            ruleRisk: 0
        });

        return {
            response: blockedResponse,
            decision: "BLOCK",
            risk: 100
        };
    }


    // Send safe prompt to Ollama
    const ollamaResult = await ollamaService({
        prompt: input.prompt
    });


    // Validate LLM output
    const validationResult = outputValidator({
        output: ollamaResult.response
    });


    // Block unsafe/empty output
    if (!validationResult.safe) {

        const blockedResponse = "Response blocked by PromptShield.";

        await loggingService({
            userId: input.userId,
            prompt: input.prompt,
            response: blockedResponse,
            detected: false,
            matchedRules: detectionResult.matchedRules,
            categories: detectionResult.categories,
            decision: "BLOCK",
            ruleRisk: 0
        });

        return {
            response: blockedResponse,
            decision: "BLOCK",
            risk: 100
        };
    }


    // Log successful interaction
    await loggingService({
        userId: input.userId,
        prompt: input.prompt,
        response: ollamaResult.response,
        detected: false,
        matchedRules: detectionResult.matchedRules,
        categories: detectionResult.categories,
        decision: "ALLOW",
        ruleRisk: 0
    });


    // Return validated response
    return {
        response: ollamaResult.response,
        decision: "ALLOW",
        risk: 0
    };
}