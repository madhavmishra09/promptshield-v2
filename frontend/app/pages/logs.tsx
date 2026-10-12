'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HoverText from '../components/HoverText';

type ChatLog = {
    id: number;
    prompt: string;
    response: string;
    decision: string;
    finalRisk: number | null;
    createdAt: string;
};

const PAGE_SIZE = 10;
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

function getLogStatus(log: ChatLog) {
    if (log.decision === 'BLOCK') return 'blocked';
    return log.finalRisk !== null && log.finalRisk >= 40 ? 'warning' : 'safe';
}

function getStatusClasses(status: string) {
    if (status === 'blocked') return 'bg-red-50 text-red-700';
    if (status === 'warning') return 'bg-amber-50 text-amber-700';
    return 'bg-green-50 text-green-700';
}

function getLocalDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function SecurityLogs() {
    const [logs, setLogs] = useState<ChatLog[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const loadLogs = async () => {
            try {
                const token = sessionStorage.getItem('promptshield_token');
                if (!token) {
                    throw new Error('Log in to view your chat history.');
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
                              'Could not load chat history. Please try again.'
                        : err instanceof Error
                          ? err.message
                          : 'Could not load chat history. Please try again.'
                );
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        void loadLogs();
        return () => controller.abort();
    }, []);

    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            !search ||
            log.prompt.toLowerCase().includes(search.toLowerCase()) ||
            log.response.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || getLogStatus(log) === statusFilter;
        const matchesDate =
            !dateFilter || getLocalDate(new Date(log.createdAt)) === dateFilter;

        return matchesSearch && matchesStatus && matchesDate;
    });

    const totalPages = Math.max(1, Math.ceil(filteredLogs.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const visibleLogs = filteredLogs.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const updateFilter = (update: () => void) => {
        update();
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">
            <Navbar />

            <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-4xl font-bold">
                    <HoverText>Security Logs</HoverText>
                </h1>
                <p className="mt-2 text-lg text-slate-500">
                    <HoverText>
                        Review your prompts and PromptShield responses
                    </HoverText>
                </p>
            </div>

            <section className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">
                    <input
                        type="search"
                        value={search}
                        onChange={(event) =>
                            updateFilter(() => setSearch(event.target.value))
                        }
                        placeholder="Search chat history..."
                        aria-label="Search chat history"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:flex-1"
                    />
                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            updateFilter(() => setStatusFilter(event.target.value))
                        }
                        aria-label="Filter chat history by decision"
                        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    >
                        <option value="all">All Chats</option>
                        <option value="safe">Safe</option>
                        <option value="warning">Warning</option>
                        <option value="blocked">Blocked</option>
                    </select>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(event) =>
                            updateFilter(() => setDateFilter(event.target.value))
                        }
                        aria-label="Filter chat history by date"
                        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    />
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-8">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 p-6">
                        <h2 className="text-xl font-bold">Chat History</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {filteredLogs.length} {filteredLogs.length === 1 ? 'conversation' : 'conversations'}
                        </p>
                    </div>

                    <div className="divide-y divide-slate-200">
                        {loading ? (
                            <p className="p-6 text-slate-500">Loading chat history...</p>
                        ) : error ? (
                            <p role="alert" className="p-6 text-red-700">{error}</p>
                        ) : visibleLogs.length === 0 ? (
                            <p className="p-6 text-slate-500">
                                {logs.length === 0
                                    ? 'Your analyzed prompts and responses will appear here.'
                                    : 'No chat history matches these filters.'}
                            </p>
                        ) : (
                            visibleLogs.map((log) => {
                                const status = getLogStatus(log);

                                return (
                                    <article key={log.id} className="space-y-4 p-6">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <time
                                                dateTime={log.createdAt}
                                                className="text-sm text-slate-500"
                                            >
                                                {new Date(log.createdAt).toLocaleString()}
                                            </time>
                                            <div className="flex items-center gap-2">
                                                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${getStatusClasses(status)}`}>
                                                    {status}
                                                </span>
                                                {log.finalRisk !== null && (
                                                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                                        Risk: {log.finalRisk.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="rounded-xl bg-slate-50 p-4">
                                                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                                                    You
                                                </p>
                                                <p className="whitespace-pre-wrap break-words text-sm leading-6">
                                                    {log.prompt}
                                                </p>
                                            </div>
                                            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                                                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                                                    PromptShield
                                                </p>
                                                <p className="whitespace-pre-wrap break-words text-sm leading-6">
                                                    {log.response}
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            {!loading && !error && filteredLogs.length > 0 && (
                <section className="mx-auto flex max-w-7xl items-center justify-between px-6 pb-10">
                    <button
                        type="button"
                        onClick={() => setPage((current) => Math.max(1, current - 1))}
                        disabled={currentPage === 1}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-slate-500">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        type="button"
                        onClick={() =>
                            setPage((current) => Math.min(totalPages, current + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-medium text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Next
                    </button>
                </section>
            )}
        </div>
    );
}
