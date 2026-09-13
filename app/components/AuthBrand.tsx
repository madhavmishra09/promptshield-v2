import Link from "next/link";

export default function AuthBrand() {
    return (
        <Link
            href="/"
            className="absolute left-5 top-5 rounded-2xl border border-blue-200 bg-white px-4 py-2 text-xl font-extrabold tracking-tight text-blue-950 shadow-sm transition hover:border-blue-400 hover:text-blue-700 sm:left-8 sm:top-8 sm:text-2xl"
        >
            PromptShield
            <span className="ml-1 text-blue-600">v2</span>
        </Link>
    );
}
