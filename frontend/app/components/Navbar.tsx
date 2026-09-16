'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
            <nav className="rounded-2xl border border-blue-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
                <div className="flex items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="text-xl font-extrabold tracking-tight text-blue-950 sm:text-2xl"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        PromptShield <span className="text-blue-600">v2</span>
                    </Link>

                    <button
                        type="button"
                        aria-expanded={isMenuOpen}
                        aria-controls="primary-navigation"
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-blue-200 text-blue-950 transition hover:bg-blue-50 sm:hidden"
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
                    className={`${isMenuOpen ? 'block' : 'hidden'} border-t border-blue-100 pt-3 sm:block sm:border-0 sm:pt-0`}
                >
                    <div className="mt-3 flex flex-col gap-1 sm:mt-3 sm:flex-row sm:items-center sm:justify-end sm:gap-1 lg:gap-2">
                        {navigationLinks.map((link) => {
                            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        <Link
                            href="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="mt-2 rounded-xl bg-blue-950 px-4 py-2 text-center text-sm font-bold text-white transition hover:bg-blue-800 sm:mt-0 sm:ml-1"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}