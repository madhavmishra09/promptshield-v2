import type { MlResult } from "../security/types.js";
import env from "../config/env.js";

interface MlApiResponse {
    probability: number;
    threshold: number;
    is_injection: boolean;
}

export default async function mlService(
    prompt: string
): Promise<MlResult> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(
            `${env.mlServiceUrl.replace(/\/+$/, "")}/predict`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
                signal: controller.signal,
            }
        );

        if (!response.ok) {
            throw new Error(
                `ML API returned HTTP ${response.status}`
            );
        }

        const result = await response.json() as MlApiResponse;

        if (
            !Number.isFinite(result.probability) ||
            result.probability < 0 ||
            result.probability > 1
        ) {
            throw new Error("ML API returned an invalid probability");
        }

        return {
            probability: result.probability,
        };
    } finally {
        clearTimeout(timeout);
    }
}