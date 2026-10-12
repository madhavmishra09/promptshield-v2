'use client';

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HoverText from "../components/HoverText";
import MetricCard from "../components/MetricCard";
import RequestChart from "../components/RequestChart";
import AttackChart from "../components/AttackChart";
import type { ChatLog } from "../types/chatLog";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function Dashboard() {
    const [logs, setLogs] = useState<ChatLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadDashboardLogs = async () => {
            try {
                const token = sessionStorage.getItem("promptshield_token");
                if (!token) {
                    throw new Error("Log in to view your dashboard analytics.");
                }

                const response = await axios.get<{ logs: ChatLog[] }>(
                    `${API_BASE_URL}/api/logs`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        signal: controller.signal,
                    }
                );
                setLogs(response.data.logs);
            } catch (err) {
                if (controller.signal.aborted) return;
                setError(
                    axios.isAxiosError<{ error?: string; message?: string }>(err)
                        ? err.response?.data?.error ||
                              err.response?.data?.message ||
                              "Could not load dashboard analytics."
                        : err instanceof Error
                          ? err.message
                          : "Could not load dashboard analytics."
                );
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        void loadDashboardLogs();
        return () => controller.abort();
    }, []);

    const scoredLogs = logs.filter((log) => log.finalRisk !== null);
    const detectedLogs = logs.filter((log) => log.detected).length;
    const blockedLogs = logs.filter((log) => log.decision === "BLOCK").length;
    const averageRisk = scoredLogs.length
        ? scoredLogs.reduce((total, log) => total + (log.finalRisk ?? 0), 0) /
          scoredLogs.length
        : null;
    const metricValue = (value: string | number) =>
        loading || error ? "—" : value;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">

            <Navbar />

            {/* Header */}
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-10">
                <h1 className="text-4xl font-bold">
                    <HoverText>Security Dashboard</HoverText>
                </h1>

                <p className="text-lg text-slate-500">
                    <HoverText>
                        Monitor your LLM security activity
                    </HoverText>
                </p>

                {error && (
                    <p role="alert" className="mt-2 text-sm text-red-700">
                        {error}
                    </p>
                )}
            </div>


            {/* Metrics */}
            <section className="mx-auto max-w-7xl px-6">

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <MetricCard
                        title="Total Requests"
                        value={metricValue(logs.length)}
                        description="Requests analyzed"
                    />

                    <MetricCard
                        title="Blocked"
                        value={metricValue(blockedLogs)}
                        description="Threats prevented"
                    />

                    <MetricCard
                        title="Detection Rate"
                        value={metricValue(
                            logs.length
                                ? `${((detectedLogs / logs.length) * 100).toFixed(1)}%`
                                : "0%"
                        )}
                        description="Security detection accuracy"
                    />

                    <MetricCard
                        title="Average Risk"
                        value={metricValue(
                            averageRisk === null ? "—" : averageRisk.toFixed(1)
                        )}
                        description="Average risk score"
                    />

                </div>

            </section>


            {/* Charts */}
            <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-bold">
                        Attack Distribution
                    </h2>

                    <AttackChart logs={logs} loading={loading} error={error} />
                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-bold">
                        Requests Over Time
                    </h2>

                    <RequestChart logs={logs} loading={loading} error={error} />
                </div>

            </section>


            {/* Protection Status */}
            <section className="mx-auto max-w-7xl px-6">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold">
                        Protection Status
                    </h2>

                    <div className="mt-4 flex items-center gap-3">

                        <div className="h-3 w-3 rounded-full bg-green-500"></div>

                        <p className="font-semibold text-green-600">
                            PromptShield is actively protecting your requests
                        </p>

                    </div>

                </div>

            </section>


            {/* Chat History */}
            <section className="mx-auto max-w-7xl px-6 py-8">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-6">
                        <h2 className="text-xl font-bold">
                            Chat History
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Review your analyzed prompts and PromptShield responses.
                        </p>
                    </div>

                    <Link
                        href="/logs"
                        className="inline-flex rounded-xl bg-blue-950 px-5 py-2 font-semibold text-white transition hover:bg-blue-800"
                    >
                        View chat history
                    </Link>

                </div>

            </section>

        </div>
    );
}