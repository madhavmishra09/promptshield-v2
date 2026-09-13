import Navbar from "../components/Navbar";
import HoverText from "../components/HoverText";
import SecurityEventTable from "../components/SecurityEventTable";

export default function SecurityLogs() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">

            <Navbar />

            {/* Header */}
            <div className="mx-auto max-w-7xl px-6 py-10">

                <h1 className="text-4xl font-bold">
                    <HoverText>Security Logs</HoverText>
                </h1>

                <p className="mt-2 text-lg text-slate-500">
                    <HoverText>
                        Monitor and investigate detected security events
                    </HoverText>
                </p>

            </div>


            {/* Filters */}
            <section className="mx-auto max-w-7xl px-6">

                <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search prompts..."
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:flex-1"
                    />

                    {/* Filter */}
                    <select
                        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        defaultValue="all"
                    >
                        <option value="all">All Events</option>
                        <option value="safe">Safe</option>
                        <option value="warning">Warning</option>
                        <option value="blocked">Blocked</option>
                    </select>

                    {/* Date */}
                    <input
                        type="date"
                        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    />

                </div>

            </section>


            {/* Logs Table */}
            <section className="mx-auto max-w-7xl px-6 py-8">

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-200 p-6">

                        <h2 className="text-xl font-bold">
                            Recent Security Events
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Review prompts analyzed by PromptShield
                        </p>

                    </div>

                    <div className="overflow-x-auto">
                        <SecurityEventTable />
                    </div>

                </div>

            </section>


            {/* Pagination */}
            <section className="mx-auto flex max-w-7xl justify-between px-6 pb-10">

                <button
                    className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-medium text-slate-600 transition hover:bg-slate-100"
                >
                    Previous
                </button>

                <div className="flex items-center gap-2">

                    <button
                        className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white"
                    >
                        1
                    </button>

                    <button
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 hover:bg-slate-100"
                    >
                        2
                    </button>

                    <button
                        className="rounded-xl border border-slate-300 bg-white px-4 py-2 hover:bg-slate-100"
                    >
                        3
                    </button>

                </div>

                <button
                    className="rounded-xl border border-slate-300 bg-white px-5 py-2 font-medium text-slate-600 transition hover:bg-slate-100"
                >
                    Next
                </button>

            </section>

        </div>
    );
}