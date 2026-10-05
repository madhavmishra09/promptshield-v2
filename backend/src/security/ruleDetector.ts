import type { MatchedRule, DetectionResult } from "./types.js"
import { securityRules } from "./rules.js"
export function detectPromptInjection(prompt: string): DetectionResult {
    const categories: string[] = [];
    const matchRules: MatchedRule[] = [];
    let rawScore: number = 0;
    for (const rule of securityRules) {
        if (rule.pattern.test(prompt)) {
            const matchedRule: MatchedRule = {
                ruleId: rule.id,
                ruleName: rule.name,
                category: rule.category,
                weight: rule.weight
            }
            matchRules.push(matchedRule);
            rawScore += rule.weight;
            categories.push(rule.category);
        }
    }
    const ruleRisk: number = Math.min(rawScore, 100);
    return {
        detected: ruleRisk !== 0,
        ruleName: matchRules[0]?.ruleName ?? "",
        matchedRules: matchRules,
        categories: categories
    };
}