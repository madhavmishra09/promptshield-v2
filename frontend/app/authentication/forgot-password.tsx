'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import AuthBrand from '../components/AuthBrand';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Something went wrong'
                );
            }

            alert('OTP has been sent to your email.');

            // Move to OTP verification page
            router.push(`/verify-otp?email=${encodeURIComponent(email)}`);

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            <AuthBrand />

            {/* Main Content */}
            <div className="flex min-h-screen flex-col items-center justify-center px-4">

                {/* Heading */}
                <div className="mb-6 text-center">
                    <h2 className="mb-2 text-3xl font-bold tracking-tight text-blue-950 md:text-5xl">
                        Forgot your password?
                    </h2>

                    <p className="text-lg font-semibold text-slate-500 md:text-xl">
                        Enter your email to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
                >

                    {/* Email */}
                    <div className="mb-5">

                        <label
                            htmlFor="email"
                            className="mb-2 block text-xl font-bold"
                        >
                            Enter your Email Address
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

                    {/* Error */}
                    {error && (
                        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Send OTP */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                    
                </form>

            </div>
        </div>
    );
}