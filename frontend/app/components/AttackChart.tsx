import type { ChatLog } from '../types/chatLog';

type AttackChartProps = {
    logs: ChatLog[];
    loading: boolean;
    error: string;
};

const COLORS = [
    'bg-blue-600',
    'bg-violet-600',
    'bg-amber-500',
    'bg-rose-500',
    'bg-emerald-600',
    'bg-cyan-600',
];

export default function AttackChart({ logs, loading, error }: AttackChartProps) {
    const distribution = new Map<string, number>();

    for (const log of logs) {
        if (!log.detected) continue;
        const categories = Array.isArray(log.categories) ? log.categories : [];
        for (const category of categories) {
            if (typeof category === 'string' && category.trim()) {
                distribution.set(category, (distribution.get(category) ?? 0) + 1);
            }
        }
    }

    const entries = [...distribution.entries()].sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((sum, [, count]) => sum + count, 0);

    return (
        <div className="my-8 min-h-72 rounded-xl border border-slate-200 bg-slate-50 p-5">
            {loading ? (
                <p className="flex h-60 items-center justify-center text-sm text-slate-500">
                    Loading attack distribution...
                </p>
            ) : error ? (
                <p role="alert" className="flex h-60 items-center justify-center text-center text-sm text-red-700">
                    {error}
                </p>
            ) : total === 0 ? (
                <p className="flex h-60 items-center justify-center text-center text-sm text-slate-500">
                    No detected attacks in your chat history yet.
                </p>
            ) : (
                <div className="space-y-5">
                    {entries.map(([category, count], index) => (
                        <div key={category}>
                            <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                                <span className="font-medium text-slate-700">{category}</span>
                                <span className="shrink-0 text-slate-500">
                                    {count} ({Math.round((count / total) * 100)}%)
                                </span>
                            </div>
                            <div
                                className="h-3 overflow-hidden rounded-full bg-slate-200"
                                role="meter"
                                aria-label={`${category} attacks`}
                                aria-valuemin={0}
                                aria-valuemax={total}
                                aria-valuenow={count}
                            >
                                <div
                                    className={`h-full rounded-full ${COLORS[index % COLORS.length]}`}
                                    style={{ width: `${(count / total) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}