
'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthBrand from '../components/AuthBrand';

export default function SignUp() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (password !== confirm_password) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        try {
           
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://localhost:5000';

const response = await fetch(
    `${API_BASE_URL}/api/auth/signup`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: first_name,
            lastName: last_name,
            email,
            password,
            confirmPassword: confirm_password,
        }),
    }
);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    data.message ||
                    'Unable to create your account.'
                );
            }

            alert('Account created successfully!');

            router.push('/login');
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <AuthBrand />

            {/* Signup */}
            <div className="flex min-h-screen flex-col items-center justify-center px-4">
                <div className="mb-6 text-center">
                    <h2 className="mb-2 text-3xl font-bold tracking-tight text-blue-950 md:text-5xl">
                        Want to test your prompts?
                    </h2>

                    <p className="text-lg font-semibold text-slate-500 md:text-xl">
                        Create your account now to access PromptShield!
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
                >
                    {/* First Name */}
                    <div className="mb-4">
                        <label
                            htmlFor="firstname"
                            className="mb-2 block text-xl font-bold"
                        >
                            First Name
                        </label>

                        <input
                            type="text"
                            id="firstname"
                            name="first_name"
                            autoComplete="given-name"
                            required
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Last Name */}
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
                            name="last_name"
                            autoComplete="family-name"
                            required
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Email */}
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
                            name="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Password */}
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
                            name="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter a password"
                            className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Confirm Password */}
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
                            name="confirm_password"
                            autoComplete="new-password"
                            required
                            value={confirm_password}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm your password"
                            className="h-11 w-full rounded-lg border-2 border-slate-300 px-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p
                            role="alert"
                            className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600"
                        >
                            {error}
                        </p>
                    )}

                    {/* Signup Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                    {/* Login Link */}
                    <p className="mt-5">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-bold underline hover:text-blue-600"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
