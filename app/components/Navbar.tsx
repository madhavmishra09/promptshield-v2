import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="mx-auto my-8 w-full max-w-6xl rounded-4xl border-2 border-blue-600 bg-sky-100 p-4 shadow-lg">
            <nav className="w-full">
                <ul className="flex items-center justify-between gap-4 text-2xl font-bold text-blue-600">

                    <li>
                        <h2 className="px-6 text-3xl font-extrabold">
                            PromptShield
                        </h2>
                    </li>

                    <li>
                        <Link
                            href="/"
                            className="transition duration-200 hover:text-blue-800"
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/chat"
                            className="transition duration-200 hover:text-blue-800"
                        >
                            Chat
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard"
                            className="transition duration-200 hover:text-blue-800"
                        >
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/login"
                            className="transition duration-200 hover:text-blue-800"
                        >
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/signup"
                            className="transition duration-200 hover:text-blue-800"
                        >
                            Sign Up
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    );
}