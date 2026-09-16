import Navbar from "../components/Navbar";
import HoverText from "../components/HoverText";

export default function Policies() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">

            <Navbar />

            {/* Header */}
            <div className="mx-auto max-w-6xl px-6 py-10">

                <h1 className="text-4xl font-bold">
                    <HoverText>Security Policies</HoverText>
                </h1>

                <p className="mt-2 text-lg text-slate-500">
                    Configure how PromptShield detects and handles security threats.
                </p>

            </div>


            {/* Policies */}
            <main className="mx-auto max-w-6xl space-y-6 px-6 pb-12">

                {/* Input Protection */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold">
                        Input Protection
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Configure how incoming prompts are analyzed.
                    </p>

                    <div className="mt-6 space-y-5">

                        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                            <div>
                                <h3 className="font-semibold">
                                    Prompt Injection Detection
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Detect potential prompt injection attacks.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5 accent-blue-600"
                            />
                        </div>


                        <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                            <div>
                                <h3 className="font-semibold">
                                    Rule Detection
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Use predefined security rules to identify threats.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5 accent-blue-600"
                            />
                        </div>


                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold">
                                    ML Detection
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Use the machine learning detector for classification.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5 accent-blue-600"
                            />
                        </div>

                    </div>

                </section>


                {/* Risk Management */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold">
                        Risk Management
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Configure how PromptShield responds to risky requests.
                    </p>

                    <div className="mt-6 space-y-5">

                        <div className="flex flex-col gap-3 border-b border-slate-100 pb-5">

                            <div>
                                <h3 className="font-semibold">
                                    Risk Threshold
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Requests above this score will be blocked.
                                </p>
                            </div>

                            <input
                                type="number"
                                defaultValue="70"
                                min="0"
                                max="100"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 md:w-32"
                            />

                        </div>


                        <div className="flex items-center justify-between">

                            <div>
                                <h3 className="font-semibold">
                                    Block High Risk Requests
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Automatically block requests above the threshold.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5 accent-blue-600"
                            />

                        </div>

                    </div>

                </section>


                {/* Output Protection */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold">
                        Output Protection
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Validate responses generated by the language model.
                    </p>

                    <div className="mt-6 space-y-5">

                        <div className="flex items-center justify-between border-b border-slate-100 pb-5">

                            <div>
                                <h3 className="font-semibold">
                                    Output Validation
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Analyze model responses before returning them.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5 accent-blue-600"
                            />

                        </div>


                        <div className="flex items-center justify-between">

                            <div>
                                <h3 className="font-semibold">
                                    Unsafe Response Blocking
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Prevent unsafe model responses from reaching users.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5 accent-blue-600"
                            />

                        </div>

                    </div>

                </section>


                {/* Logging */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold">
                        Logging
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Configure security event logging.
                    </p>

                    <div className="mt-6 flex items-center justify-between">

                        <div>
                            <h3 className="font-semibold">
                                Security Event Logging
                            </h3>

                            <p className="text-sm text-slate-500">
                                Store security events for monitoring and analysis.
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            defaultChecked
                            className="h-5 w-5 accent-blue-600"
                        />

                    </div>

                </section>


                {/* Save */}
                <div className="flex justify-end">

                    <button
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                    >
                        Save Policies
                    </button>

                </div>

            </main>

        </div>
    );
}