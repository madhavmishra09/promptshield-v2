import type {
    RiskEngineInput,
    RiskEngineResult
} from "./types.js";

export default function riskEngine(
    input: RiskEngineInput
): RiskEngineResult {

    let rawScore = 0;

    for (const rule of input.matchedRules) {
        rawScore += rule.weight;
    }

    const ruleRisk = Math.min(rawScore, 100);

    const mlProbability = input.mlProbability;

    const ALPHA = 0.4;
    const BETA = 0.6;

    const combinedRisk =
        ALPHA * (ruleRisk / 100) +
        BETA * mlProbability;

    const finalRisk = Math.min(
        combinedRisk * 100,
        100
    );

    return {
        ruleRisk,
        mlProbability,
        finalRisk
    };
}