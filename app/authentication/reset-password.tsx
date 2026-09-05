'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
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
                    data.message || 'Unable to reset password'
                );
            }

            alert('Password reset successfully.');

            window.location.href = '/reset-success';

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
                        Create a new password
                    </h2>

                    <p className="text-xl font-bold md:text-2xl">
                        Choose a strong password for your account.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
                >

                    {/* New Password */}
                    <div className="mb-5">

                        <label
                            htmlFor="password"
                            className="mb-2 block text-left text-xl font-bold"
                        >
                            New Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            minLength={8}
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter new password"
                            className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    {/* Confirm Password */}
                    <div className="mb-5">

                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-left text-xl font-bold"
                        >
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            minLength={8}
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
                            className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />

                    </div>

                    {/* Error */}
                    {error && (
                        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600">
                            {error}
                        </p>
                    )}

                    {/* Reset */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? 'Resetting Password...'
                            : 'Reset Password'}
                    </button>

                </form>

            </div>
        </div>
    );
}