import Navbar from "../components/Navbar";
import HoverText from "../components/HoverText";

export default function Models() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">

            <Navbar />

            {/* Header */}
            <div className="mx-auto max-w-6xl px-6 py-10">

                <h1 className="text-4xl font-bold">
                    <HoverText>Models</HoverText>
                </h1>

                <p className="mt-2 text-lg text-slate-500">
                    Manage the language models used by PromptShield.
                </p>

            </div>


            {/* Models */}
            <main className="mx-auto max-w-6xl px-6 pb-12">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                        <div>
                            <h2 className="text-xl font-bold">
                                Available Models
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Configure the models available to the security system.
                            </p>
                        </div>

                        <button
                            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            + Add Model
                        </button>

                    </div>


                    {/* Model Card */}
                    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 p-6 md:flex-row md:items-center md:justify-between">

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                                🤖
                            </div>

                            <div>
                                <h3 className="text-lg font-bold">
                                    Phi-3 Mini
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Ollama · Local LLM
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    Used for PromptShield response generation
                                </p>
                            </div>

                        </div>


                        <div className="flex flex-col gap-3 md:items-end">

                            <div className="flex items-center gap-2">

                                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>

                                <span className="text-sm font-semibold text-green-600">
                                    Active
                                </span>

                            </div>

                            <button
                                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
                            >
                                Configure
                            </button>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}