import dotenv from "dotenv";
dotenv.config();
const port=process.env.PORT;
const db=process.env.DATABASE_URL;
const jwt=process.env.JWT_SECRET;
const ollama=process.env.OLLAMA_URL;
const ml=process.env.ML_SERVICE_URL;
function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}