import type { OllamaInput, OllamaResult } from "../security/types.js";
import env from "../config/env.js";

export default async function ollamaService(
    input: OllamaInput
): Promise<OllamaResult> {

    try {
        const response = await fetch(env.ollamaUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "phi3:mini",
                prompt: input.prompt,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(
                `Ollama request failed: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        return {
            response: data.response
        };

    } catch (error) {
        console.error("Ollama service error:", error);
        throw error;
    }
}