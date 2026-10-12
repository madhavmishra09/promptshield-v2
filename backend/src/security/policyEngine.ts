import type { PolicyInput, PolicyResult } from "./types.js";

const BLOCK_THRESHOLD = 70;

export default function policyEngine(
    input: PolicyInput
): PolicyResult {
    if (input.finalRisk >= BLOCK_THRESHOLD) {
        return {
            decision: "BLOCK",
        };
    }

    return {
        decision: "ALLOW",
    };
}