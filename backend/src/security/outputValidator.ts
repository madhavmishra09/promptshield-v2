import type {
    OutputValidationInput,
    OutputValidationResult
} from "./types.js";

export default function outputValidator(
    input: OutputValidationInput
): OutputValidationResult {
    const output=input.output.trim();
    if(!output){
        return{
            safe:false
        }
    }
    else{
        return{
            safe:true
        }
    }
}