'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Invalid email or password'
                );
            }

            alert('Login successful!');

            window.location.href = '/dashboard';
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Logo */}
            <div className="absolute left-6 top-6">
                <h1 className="rounded-[30px] border-2 border-neutral-950 px-3 py-2 text-4xl font-bold md:text-5xl">
                    PromptShield v2
                </h1>
            </div>

            {/* Main Content */}
            <div className="flex min-h-screen flex-col items-center justify-center px-4">

                {/* Heading */}
                <div className="mb-6 text-center">
                    <h2 className="mb-2 text-4xl font-bold md:text-5xl">
                        Want to test your prompts?
                    </h2>

                    <p className="text-xl font-bold md:text-2xl">
                        Sign in to access PromptShield v2!
                    </p>
                </div>

                {/* Login Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
                >

                    {/* Error Message */}
                    {error && (
                        <div className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="mb-2 block text-xl font-bold"
                        >
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label
                            htmlFor="password"
                            className="mb-2 block text-xl font-bold"
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                    {/* Signup Link */}
                    <p className="mt-5">
                        Don't have an account?{' '}
                        <Link
                            href="/signup"
                            className="font-semibold underline hover:text-blue-600"
                        >
                            Sign Up
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}