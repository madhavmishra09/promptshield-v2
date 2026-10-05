import prisma from "../db/prisma.js";
import type { ChatLogInput } from "../security/types.js";

export default async function loggingService(
    input: ChatLogInput
) {
    const chatLog = await prisma.chatLog.create({
        data: {
            userId: input.userId,
            prompt: input.prompt,
            response: input.response,
            detected: input.detected,
            matchedRules: input.matchedRules,
            categories: input.categories,
            ruleRisk: input.ruleRisk,
            mlProbability: input.mlProbability,
            finalRisk: input.finalRisk,
            decision: input.decision
        }
    });

    return chatLog;
}

export async function getUserLogs(userId: number) {
    const logs = await prisma.chatLog.findMany({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return logs;
}