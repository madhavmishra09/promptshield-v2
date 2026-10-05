import type {
    Request,
    Response,
    NextFunction
} from "express";

import chatService from "../services/chat.service.js";

export async function chatController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {

    try {

        const { prompt } = req.body;

        // Validate prompt
        if (
            !prompt ||
            typeof prompt !== "string" ||
            prompt.trim().length === 0
        ) {
            res.status(400).json({
                error: "Prompt is required and must be a non-empty string."
            });

            return;
        }

        // Get authenticated user
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({
                error: "Authentication required."
            });

            return;
        }

        // Send request to chat service
        const result = await chatService({
            userId,
            prompt: prompt.trim()
        });

        // Return result
        res.status(200).json(result);

    } catch (error) {

        next(error);

    }
}