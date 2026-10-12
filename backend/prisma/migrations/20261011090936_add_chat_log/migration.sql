-- CreateTable
CREATE TABLE "ChatLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "detected" BOOLEAN NOT NULL,
    "matchedRules" JSONB NOT NULL,
    "categories" JSONB NOT NULL,
    "ruleRisk" INTEGER,
    "mlProbability" DOUBLE PRECISION,
    "finalRisk" INTEGER,
    "decision" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatLog_userId_idx" ON "ChatLog"("userId");

-- CreateIndex
CREATE INDEX "ChatLog_createdAt_idx" ON "ChatLog"("createdAt");

-- AddForeignKey
ALTER TABLE "ChatLog" ADD CONSTRAINT "ChatLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
