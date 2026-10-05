import type {
    Request,
    Response,
    NextFunction
} from "express";

import { getUserLogs } from "../services/logging.service.js";

export async function logsController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {

    try {

        // Get authenticated user
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({
                error: "Authentication required."
            });

            return;
        }

        // Fetch logs belonging to this user
        const logs = await getUserLogs(userId);

        res.status(200).json({
            logs
        });

    } catch (error) {

        next(error);

    }
}