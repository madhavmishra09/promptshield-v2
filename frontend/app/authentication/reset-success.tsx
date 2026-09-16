'use client';

import Link from 'next/link';
import AuthBrand from '../components/AuthBrand';

export default function ResetSuccess() {
    return (
        <div className="min-h-screen bg-slate-50">

            <AuthBrand />

            {/* Main Content */}
            <div className="flex min-h-screen flex-col items-center justify-center px-4">

                <div className="w-full max-w-lg rounded-2xl border-2 border-slate-200 bg-white p-10 text-center shadow-lg">

                    {/* Success */}
                    <div className="mb-6">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <span className="text-3xl text-green-600">
                                ✓
                            </span>
                        </div>

                        <h2 className="mb-3 text-4xl font-bold">
                            Password Reset Successful
                        </h2>

                        <p className="text-lg text-slate-600">
                            Your password has been successfully changed.
                        </p>

                    </div>

                    {/* Login */}
                    <Link
                        href="/login"
                        className="block w-full rounded-lg bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700"
                    >
                        Go to Login
                    </Link>

                </div>

            </div>
        </div>
    );
}