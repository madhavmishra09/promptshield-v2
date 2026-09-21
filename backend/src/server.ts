import express from "express";
import type { Application, Request, Response } from "express";

import env from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
const app: Application = express();

const port = env.port;

// Middleware
app.use(express.json());

// Health check
app.get("/api/health", (req: Request, res: Response): void => {
    res.status(200).json({
        message: "Backend is running",
        status: "ok",
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`Backend is running at ${port}`);
});