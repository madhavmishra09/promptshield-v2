import type { RiskEngineInput, RiskEngineResult } from "./types.js";

export default function riskEngine(
    input: RiskEngineInput
): RiskEngineResult {
    const ruleResult=input.matchedRules;
    let rawScore=0;
    for(const rule of ruleResult){
        rawScore+=rule.weight;
    }
    const ruleRisk=Math.min(rawScore,100);
    return{
        ruleRisk: ruleRisk,
    }
}