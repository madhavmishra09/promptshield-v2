import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import env from "../config/env.js";

const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({
            error: "Authorization token is required.",
        });
        return;
    }

    if (!authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            error: "Invalid authorization format.",
        });
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({
            error: "Invalid authorization token.",
        });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            env.jwtSecret
        );

        if (typeof decoded === "string") {
            res.status(401).json({
                error: "Invalid token payload.",
            });
            return;
        }

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            error: "Invalid or expired token.",
        });
        return;
    }
};

export default authMiddleware;