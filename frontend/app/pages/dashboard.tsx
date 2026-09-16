import Navbar from "../components/Navbar";
import HoverText from "../components/HoverText";
import MetricCard from "../components/MetricCard";
import RequestChart from "../components/RequestChart";
import SecurityEventTable from "../components/SecurityEventTable";
import AttackChart from "../components/AttackChart";

export default function Dashboard() {
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

                <p className="mt-2 text-sm text-slate-400">
                    Last updated: Just now
                </p>
            </div>


            {/* Metrics */}
            <section className="mx-auto max-w-7xl px-6">

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <MetricCard
                        title="Total Requests"
                        value="1,248"
                        description="Requests analyzed"
                    />

                    <MetricCard
                        title="Blocked"
                        value="87"
                        description="Threats prevented"
                    />

                    <MetricCard
                        title="Detection Rate"
                        value="95.2%"
                        description="Security detection accuracy"
                    />

                    <MetricCard
                        title="Average Risk"
                        value="32.4"
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

                    <AttackChart />
                </div>


                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-6 text-xl font-bold">
                        Requests Over Time
                    </h2>

                    <RequestChart />
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


            {/* Security Events */}
            <section className="mx-auto max-w-7xl px-6 py-8">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-6">
                        <h2 className="text-xl font-bold">
                            Recent Security Events
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Latest detected security activity
                        </p>
                    </div>

                    <SecurityEventTable />

                </div>

            </section>

        </div>
    );
}