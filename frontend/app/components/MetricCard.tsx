'use client';

type MetricCardProps = {
    title: string;
    value: string | number;
    description?: string;
};

export default function MetricCard({
    title,
    value,
    description,
}: MetricCardProps) {
    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">

            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                {title}
            </h2>

            <p className="mt-4 text-4xl font-bold text-slate-900">
                {value}
            </p>

            {description && (
                <p className="mt-2 text-sm text-slate-500">
                    {description}
                </p>
            )}

        </div>
    );
}