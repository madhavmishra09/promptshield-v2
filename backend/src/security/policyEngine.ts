import type { PolicyInput, PolicyResult } from "./types.js";
export default function policyEngine(
    input: PolicyInput
): PolicyResult {
    const BLOCK_THRESHOLD=70;
    if(input.finalRisk>BLOCK_THRESHOLD){
        return{
            decision:"BLOCK"
        }
    }
    else{
        return{
            decision:"ALLOW"
        }
    }
}