'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useSyncExternalStore } from 'react';

const AUTH_TOKEN_KEY = 'promptshield_token';
const AUTH_CHANGE_EVENT = 'promptshield-auth-change';

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

const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/chat', label: 'Chat' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/logs', label: 'Logs' },
    { href: '/models', label: 'Models' },
    { href: '/policies', label: 'Policies' },
    { href: '/settings', label: 'Settings' },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = useSyncExternalStore(
        subscribeToAuthChanges,
        getAuthSnapshot,
        getServerAuthSnapshot
    );

    const handleLogout = () => {
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
        setIsMenuOpen(false);
        router.push('/login');
    };

    return (
        <div className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col gap-3 rounded-2xl border border-blue-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur sm:px-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-h-10 items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="shrink-0 text-lg font-extrabold tracking-tight text-blue-950 sm:text-xl"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        PromptShield <span className="text-blue-600">v2</span>
                    </Link>

                    <button
                        type="button"
                        aria-expanded={isMenuOpen}
                        aria-controls="primary-navigation"
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-blue-200 text-blue-950 transition hover:bg-blue-50 lg:hidden"
                        onClick={() => setIsMenuOpen((open) => !open)}
                    >
                        <span className="sr-only">Menu</span>
                        <span className="flex flex-col gap-1.5" aria-hidden="true">
                            <span className={`block h-0.5 w-5 bg-current transition ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                            <span className={`block h-0.5 w-5 bg-current transition ${isMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block h-0.5 w-5 bg-current transition ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                        </span>
                    </button>
                </div>

                <div
                    id="primary-navigation"
                    className={`${isMenuOpen ? 'block' : 'hidden'} border-t border-blue-100 pt-3 lg:block lg:border-0 lg:pt-0`}
                >
                    <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:justify-end lg:gap-1 xl:gap-2">
                        {navigationLinks.map((link) => {
                            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        {isAuthenticated ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="mt-2 whitespace-nowrap rounded-xl bg-blue-950 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-blue-800 lg:mt-0 lg:ml-1"
                            >
                                Log out
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-2 whitespace-nowrap rounded-xl bg-blue-950 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-blue-800 lg:mt-0 lg:ml-1"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}