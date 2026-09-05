'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
export default function SignUp() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            alert('Account Created Successfully!');
            window.location.href = '/dashboard';
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="min-h-screen bg-slate-50">

                {/* Logo */}
                <div className="absolute left-6 top-6">
                    <h1 className="rounded-[30px] border-2 border-neutral-950 p-3 text-5xl font-bold">
                        PromptShield v2
                    </h1>
                </div>

                {/* Signup */}
                <div className="flex min-h-screen flex-col items-center justify-center px-4">

                    <div className="mb-6 text-center">
                        <h2 className="mb-2 text-4xl font-bold md:text-5xl">
                            Want to test your prompts?
                        </h2>

                        <p className="text-xl font-bold md:text-2xl">
                            Create your account now to access PromptShield!
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-lg rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
                    >

                        <div className="mb-4">
                            <label
                                htmlFor="firstname"
                                className="mb-2 block text-xl font-bold border-slate-300"
                            >
                                First Name
                            </label>

                            <input
                                type="text"
                                id="firstname"
                                required
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="John"
                               className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="lastname"
                                className="mb-2 block text-xl font-bold"
                            >
                                Last Name
                            </label>

                            <input
                                type="text"
                                id="lastname"
                                required
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Doe"
                                className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="mb-2 block text-xl font-bold"
                            >
                                Email Address
                            </label>

                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="setpassword"
                                className="mb-2 block text-xl font-bold"
                            >
                                Set a Password
                            </label>

                            <input
                                type="password"
                                id="setpassword"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="confirmpassword"
                                className="mb-2 block text-xl font-bold"
                            >
                                Confirm your Password
                            </label>

                            <input
                                type="password"
                                id="confirmpassword"
                                required
                                value={confirm_password}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="********"
                               className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>

                        <p className="mt-5">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-bold underline"
                            >
                                Login
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </>
    )
};