import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || "5000";
const portNumber = Number(port);
const databaseUrl = requireEnv("DATABASE_URL");
const jwtSecret = requireEnv("JWT_SECRET");
const ollamaUrl = requireEnv("OLLAMA_URL");
const mlServiceUrl = requireEnv("ML_SERVICE_URL");
function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}
const env = {
    port: portNumber,
    databaseUrl,
    jwtSecret,
    ollamaUrl,
    mlServiceUrl,
};

export default env;