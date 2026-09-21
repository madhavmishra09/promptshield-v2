import type { Request, Response, NextFunction } from "express";

const errorMiddleware = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.error("Server Error:", error);

    if (error instanceof Error) {
        res.status(500).json({
            error: error.message,
        });
        return;
    }

    res.status(500).json({
        error: "Internal server error.",
    });
};

export default errorMiddleware;