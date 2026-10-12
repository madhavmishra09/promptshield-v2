'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import Navbar from "../components/Navbar";
import HoverText from "../components/HoverText";
import {
    getServerThemePreference,
    getThemePreference,
    setThemePreference,
    subscribeToThemeChanges,
} from "../lib/theme";

const AUTH_TOKEN_KEY = "promptshield_token";
const AUTH_CHANGE_EVENT = "promptshield-auth-change";

function subscribeToAuthChanges(onChange: () => void) {
    window.addEventListener(AUTH_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, onChange);
}

function getAuthSnapshot() {
    return Boolean(sessionStorage.getItem(AUTH_TOKEN_KEY));
}

function getServerAuthSnapshot() {
    return false;
}

export default function Settings() {
    const router = useRouter();
    const isAuthenticated = useSyncExternalStore(
        subscribeToAuthChanges,
        getAuthSnapshot,
        getServerAuthSnapshot
    );
    const themePreference = useSyncExternalStore(
        subscribeToThemeChanges,
        getThemePreference,
        getServerThemePreference
    );

    const handleLogout = () => {
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">

            <Navbar />

            <div className="mx-auto max-w-6xl px-6 py-10">
                <h1 className="text-4xl font-bold">
                    <HoverText>Settings</HoverText>
                </h1>
                <p className="mt-2 text-lg text-slate-500">
                    Manage your account and application preferences.
                </p>
            </div>

            <section className="mx-auto max-w-6xl px-6 pb-6">
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-xl font-bold">Appearance</h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Choose light or dark colors, or follow your device setting.
                        </p>
                    </div>
                    <label className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-700">Theme</span>
                        <select
                            value={themePreference}
                            onChange={(event) =>
                                setThemePreference(
                                    event.target.value as "light" | "dark" | "system"
                                )
                            }
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System</option>
                        </select>
                    </label>
                </div>
            </section>

            {!isAuthenticated ? (
                <main className="mx-auto max-w-6xl px-6 pb-12">
                    <section className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
                        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-xl font-bold text-blue-700" aria-hidden="true">
                            PS
                        </div>
                        <h2 className="mt-5 text-2xl font-bold text-slate-900">
                            Sign in to manage your settings
                        </h2>
                        <p className="mx-auto mt-2 max-w-lg text-slate-600">
                            Your profile and preferences are available after you log in to your PromptShield account.
                        </p>
                        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                            <Link
                                href="/login"
                                className="rounded-xl bg-blue-950 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Create an account
                            </Link>
                        </div>
                    </section>
                </main>
            ) : (
            <main className="mx-auto max-w-6xl space-y-6 px-6 pb-12">

                {/* Profile */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold">
                        Profile
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your personal information.
                    </p>


                    <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div>
                            <label
                                htmlFor="firstName"
                                className="mb-2 block text-sm font-medium"
                            >
                                First Name
                            </label>

                            <input
                                id="firstName"
                                type="text"
                                placeholder="First name"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>


                        <div>
                            <label
                                htmlFor="lastName"
                                className="mb-2 block text-sm font-medium"
                            >
                                Last Name
                            </label>

                            <input
                                id="lastName"
                                type="text"
                                placeholder="Last name"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>


                        <div className="md:col-span-2">

                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />

                        </div>

                    </div>

                </section>


                {/* Security */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold">
                        Security
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your account security.
                    </p>


                    <div className="mt-6">
                        <p className="text-sm text-slate-600">
                            Your account is protected by your password. Additional security options are not available yet.
                        </p>
                    </div>
                </section>


                {/* Preferences */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <h2 className="text-xl font-bold">
                        Preferences
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Customize your PromptShield experience.
                    </p>


                    <div className="mt-6 space-y-5">

                        <div className="flex items-center justify-between">

                            <div>
                                <h3 className="font-semibold">
                                    Notifications
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Receive notifications about security events.
                                </p>
                            </div>

                            <input
                                type="checkbox"
                                defaultChecked
                                className="h-5 w-5 accent-blue-600"
                            />

                        </div>

                    </div>

                </section>


                {/* Actions */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row">

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        Log Out
                    </button>

                </div>

            </main>
            )}

        </div>
    );
}