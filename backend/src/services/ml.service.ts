import type { MlResult } from "../security/types.js";
import env from "../config/env.js";

export default async function mlService(
    prompt: string
): Promise<MlResult> {

    // TODO:
    // Send prompt to Python ML service
    // Python service will return:
    // {
    //     probability: number
    // }

    console.log("ML service placeholder:", {
        url: env.mlServiceUrl,
        prompt
    });

    return {
        probability: 0
    };
}