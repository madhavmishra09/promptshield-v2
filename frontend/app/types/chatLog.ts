export type ChatLog = {
    id: number;
    prompt: string;
    response: string;
    detected: boolean;
    categories: string[];
    finalRisk: number | null;
    decision: string;
    createdAt: string;
};
