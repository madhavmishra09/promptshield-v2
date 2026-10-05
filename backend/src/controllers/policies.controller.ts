import type {
    Request,
    Response,
    NextFunction
} from "express";

import policyService from "../services/policy.service.js";

export async function policyController(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {

    try {

        const { finalRisk } = req.body;

        if (
            typeof finalRisk !== "number" ||
            finalRisk < 0 ||
            finalRisk > 100
        ) {
            res.status(400).json({
                error: "finalRisk must be a number between 0 and 100."
            });

            return;
        }

        const result = policyService({
            finalRisk
        });

        res.status(200).json(result);

    } catch (error) {

        next(error);

    }
}