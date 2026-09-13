import Navbar from "../components/Navbar";
import HoverText from "../components/HoverText";

export default function Settings() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-950">

            <Navbar />

            {/* Header */}
            <div className="mx-auto max-w-6xl px-6 py-10">

                <h1 className="text-4xl font-bold">
                    <HoverText>Settings</HoverText>
                </h1>

                <p className="mt-2 text-lg text-slate-500">
                    Manage your account, security and application preferences.
                </p>

            </div>


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


                    <div className="mt-6 space-y-5">

                        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center">

                            <div>
                                <h3 className="font-semibold">
                                    Change Password
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Update your account password.
                                </p>
                            </div>

                            <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100">
                                Change Password
                            </button>

                        </div>


                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                            <div>
                                <h3 className="font-semibold">
                                    Two-Factor Authentication
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Add an additional layer of account protection.
                                </p>
                            </div>

                            <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100">
                                Enable 2FA
                            </button>

                        </div>

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

                        <div className="flex items-center justify-between border-b border-slate-100 pb-5">

                            <div>
                                <h3 className="font-semibold">
                                    Theme
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Choose your preferred appearance.
                                </p>
                            </div>

                            <select
                                defaultValue="light"
                                className="rounded-xl border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="system">System</option>
                            </select>

                        </div>


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
                        className="rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 transition hover:bg-red-100"
                    >
                        Log Out
                    </button>

                    <button
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                    >
                        Save Changes
                    </button>

                </div>

            </main>

        </div>
    );
}