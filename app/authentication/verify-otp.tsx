'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyOTP() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    otp,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Invalid or expired OTP'
                );
            }

            alert('OTP verified successfully.');

            window.location.href =
                `/reset-password?email=${encodeURIComponent(email)}`;

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Something went wrong.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Logo */}
            <div className="absolute left-6 top-6">
                <h1 className="rounded-[30px] border-2 border-neutral-950 p-3 text-5xl font-bold">
                    PromptShield v2
                </h1>
            </div>

            {/* Main Content */}
            <div className="flex min-h-screen flex-col items-center justify-center px-4">

                {/* Heading */}
                <div className="mb-6 text-center">
                    <h2 className="mb-2 text-4xl font-bold md:text-5xl">
                        Verify your OTP
                    </h2>

                    <p className="text-xl font-bold md:text-2xl">
                        Enter the OTP sent to your email.
                    </p>

                    {email && (
                        <p className="mt-2 text-sm text-slate-500">
                            {email}
                        </p>
                    )}
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
                >

                    {/* OTP */}
                    <div className="mb-5">

                        <label
                            htmlFor="otp"
                            className="mb-2 block text-xl font-bold"
                        >
                            Enter 6-Digit OTP
                        </label>

                        <input
                            type="text"
                            id="otp"
                            name="otp"
                            required
                            maxLength={6}
                            inputMode="numeric"
                            pattern="[0-9]{6}"
                            value={otp}
                            onChange={(e) =>
                                setOtp(
                                    e.target.value.replace(/\D/g, '')
                                )
                            }
                            placeholder="123456"
                            className="h-12 w-full rounded-lg border-2 border-slate-300 px-3 text-center text-xl tracking-[0.5em] outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    {/* Error */}
                    {error && (
                        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Verify */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>

                    {/* Resend */}
                    <button
                        type="button"
                        className="mt-4 font-semibold underline hover:text-blue-600"
                    >
                        Resend OTP
                    </button>

                    {/* Back */}
                    <p className="mt-5">
                        <Link
                            href="/forgot-password"
                            className="font-semibold underline hover:text-blue-600"
                        >
                            Back
                        </Link>
                    </p>

                </form>

            </div>
        </div>
    );
}