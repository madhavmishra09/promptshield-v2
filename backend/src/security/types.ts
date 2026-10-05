export interface SecurityRule {
    id: string,
    name: string,
    category: string,
    pattern: RegExp,
    weight: number,
    description: string
}
export interface MatchedRule {
    ruleId: string,
    ruleName: string,
    category: string,
    weight: number
}
export interface DetectionResult {
    detected: boolean,
    ruleName: string,
    matchedRules: MatchedRule[],
    categories: string[]
}
export interface RiskEngineInput {
    matchedRules: MatchedRule[];
    mlProbabilty: number;
}
export interface RiskEngineResult {
    ruleRisk: number;
    mlProbability: number;
    finalRisk: number;
}
export type PolicyDecision = "ALLOW" | "BLOCK";
export interface PolicyInput {
    finalRisk: number;
}
export interface PolicyResult {
    decision: PolicyDecision;
}
export interface OutputValidationInput {
    output: string;
}

export interface OutputValidationResult {
    safe: boolean;
}
export interface ChatInput {
    userId: number;
    prompt: string;
}
export interface ChatResult {
    response: string;
    decision: PolicyDecision;
    risk: number;
}
export interface OllamaInput{
    prompt:string;
}
export interface OllamaResult{
    response: string;
}
export interface ChatLogInput {
    userId: number;
    prompt: string;
    response: string;
    detected: boolean;
    matchedRules: MatchedRule[];
    categories: string[];
    ruleRisk?: number;
    mlProbability?: number;
    finalRisk?: number;
    decision: PolicyDecision;
}
export interface MlResult {
    probability: number;
}