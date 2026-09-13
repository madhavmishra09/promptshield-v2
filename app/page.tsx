import Login from "./authentication/login";
import SignUp from "./authentication/signup";
import ForgotPassword from "./authentication/forgot-password";
import VerifyOTP from "./authentication/verify-otp";
import ResetPassword from "./authentication/reset-password";
import ResetSuccess from "./authentication/reset-success";
import NavBar from "./components/Navbar";
import HoverText from "./components/HoverText";
/*import PromptInput from "./components/PromptInput";
import ChatMessage from "./components/ChatMessage";
import SecurityBadge from "./components/SecurityBadge";
import MetricCard from "./components/MetricCard"
import AttackChart from "./components/AttackChart";
import SecurityEventTable from "./components/SecurityEventTable";*/
import './globals.css'
export default function Home() {
  return (
    <>
      <NavBar />
    <div className="min-h-screen bg-slate-50 text-slate-950">

    {/* Hero Section */}
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">

        <div className="max-w-4xl">
            <h1 className="mb-8 text-6xl font-extrabold tracking-tight md:text-7xl">
                <HoverText>Welcome to PromptShield</HoverText>
            </h1>

            <div className="space-y-4 text-xl font-semibold text-slate-700 md:text-2xl">

                <p>
                    <HoverText>
                        Do you want to test your prompts?
                    </HoverText>
                </p>

                <p>
                    <HoverText>
                        Do you want to check whether they are malicious or not?
                    </HoverText>
                </p>

                <p>
                    <HoverText>
                        Are you worried about the security of your Large Language Models?
                    </HoverText>
                </p>

            </div>

            <p className="mt-8 text-2xl font-bold">
                <HoverText>
                    The solution is PromptShield v2.
                </HoverText>
            </p>

            <div className="mt-10">
                {/*<Link
                    href="/chat"
                    className="inline-block rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-md transition duration-300 hover:scale-105 hover:bg-blue-700"
                >
                    Start Chat →
                </Link>*/}
            </div>
        </div>

    </section>


    {/* What is PromptShield */}
    <section className="px-6 py-24">

        <div className="mx-auto max-w-5xl text-center">

            <h2 className="mb-8 text-4xl font-extrabold md:text-5xl">
                <HoverText>What is PromptShield?</HoverText>
            </h2>

            <p className="text-lg leading-8 text-slate-600 md:text-xl">
                <HoverText>
                    PromptShield is an adaptive security layer for Large Language
                    Models that detects and blocks prompt injection attacks before
                    they reach the underlying model. The system combines rule-based
                    detection with machine learning-based classification and risk
                    scoring, while also validating model outputs for potentially
                    unsafe responses. It provides security monitoring, event logging,
                    policy management, and analytics through a centralized dashboard.
                </HoverText>
            </p>

        </div>

    </section>


    {/* How It Works */}
    <section className="bg-white px-6 py-24">

        <div className="mx-auto max-w-6xl text-center">

            <h2 className="mb-4 text-4xl font-extrabold md:text-5xl">
                <HoverText>How PromptShield Works</HoverText>
            </h2>

            <p className="mb-16 text-lg text-slate-500">
                <HoverText>
                    Every prompt passes through multiple security layers before reaching the model.
                </HoverText>
            </p>


            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">

                <div className="rounded-xl border-2 border-slate-200 bg-slate-50 px-8 py-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-md">
                    <h3 className="text-xl font-bold">User Prompt</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Incoming request
                    </p>
                </div>

                <span className="text-2xl font-bold text-blue-600">→</span>

                <div className="rounded-xl border-2 border-slate-200 bg-slate-50 px-8 py-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-md">
                    <h3 className="text-xl font-bold">Input Firewall</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Detect threats
                    </p>
                </div>

                <span className="text-2xl font-bold text-blue-600">→</span>

                <div className="rounded-xl border-2 border-slate-200 bg-slate-50 px-8 py-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-md">
                    <h3 className="text-xl font-bold">ML Detection</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Analyze intent
                    </p>
                </div>

                <span className="text-2xl font-bold text-blue-600">→</span>

                <div className="rounded-xl border-2 border-slate-200 bg-slate-50 px-8 py-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-md">
                    <h3 className="text-xl font-bold">LLM</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Process request
                    </p>
                </div>

                <span className="text-2xl font-bold text-blue-600">→</span>

                <div className="rounded-xl border-2 border-slate-200 bg-slate-50 px-8 py-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-md">
                    <h3 className="text-xl font-bold">Output Validator</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Validate response
                    </p>
                </div>

            </div>

        </div>

    </section>


    {/* Get Started */}
    <section className="px-6 py-28">

        <div className="mx-auto max-w-3xl text-center">

            <h2 className="mb-6 text-4xl font-extrabold md:text-5xl">
                <HoverText>Want to get started?</HoverText>
            </h2>

            <p className="mb-8 text-xl text-slate-600">
                <HoverText>
                    Test your prompts and see how PromptShield protects your LLM interactions.
                </HoverText>
            </p>

            {/*<Link
                href="/chat"
                className="inline-block rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-md transition duration-300 hover:scale-105 hover:bg-blue-700"
            >
                Start Testing →
            </Link>*/}

        </div>

    </section>

</div>
    </>
  );
}
