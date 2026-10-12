import type { ChatLog } from '../types/chatLog';

type RequestChartProps = {
    logs: ChatLog[];
    loading: boolean;
    error: string;
};

function dateKey(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function RequestChart({ logs, loading, error }: RequestChartProps) {
    const today = new Date();
    const days = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - index));
        return {
            key: dateKey(date),
            label: date.toLocaleDateString(undefined, { weekday: 'short' }),
            count: 0,
        };
    });
    const countsByDate = new Map(days.map((day) => [day.key, day]));

    for (const log of logs) {
        const day = countsByDate.get(dateKey(new Date(log.createdAt)));
        if (day) day.count += 1;
    }

    const maxCount = Math.max(...days.map((day) => day.count), 1);

    return (
        <div className="my-8 min-h-72 rounded-xl border border-slate-200 bg-slate-50 p-5">
            {loading ? (
                <p className="flex h-60 items-center justify-center text-sm text-slate-500">
                    Loading request activity...
                </p>
            ) : error ? (
                <p role="alert" className="flex h-60 items-center justify-center text-center text-sm text-red-700">
                    {error}
                </p>
            ) : logs.length === 0 ? (
                <p className="flex h-60 items-center justify-center text-center text-sm text-slate-500">
                    No requests in your chat history yet.
                </p>
            ) : (
                <div
                    className="flex h-60 items-end gap-3 border-b border-l border-slate-300 px-2 pb-0 pt-4 sm:gap-5"
                    role="img"
                    aria-label="Requests over the last seven days"
                >
                    {days.map((day) => (
                        <div
                            key={day.key}
                            className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                        >
                            <span className="text-xs font-medium text-slate-600">
                                {day.count}
                            </span>
                            <div className="flex h-[78%] w-full items-end justify-center">
                                <div
                                    className="w-full max-w-12 rounded-t-md bg-blue-600 transition-all"
                                    style={{
                                        height: `${day.count === 0 ? 2 : Math.max((day.count / maxCount) * 100, 4)}%`,
                                    }}
                                    title={`${day.count} requests`}
                                />
                            </div>
                            <span className="text-xs text-slate-500">{day.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}