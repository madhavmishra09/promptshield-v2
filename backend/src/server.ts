import express from "express"; 
import type { Application, Request, Response } from "express";
import dotenv from "dotenv";
const app: Application = express();
dotenv.config();
const port = Number(process.env.PORT) || 5000;
console.log(`Port running at ${port}`);
app.post('/api/health', (req: Request, res: Response): void => {
    res.status(200).json({
        message: "Backend is running",
        status: "ok",
    });
    return;
});
app.listen(port,()=>{
    console.log(`Backend is running at ${port}`);
});