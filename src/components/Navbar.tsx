"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Menu, X } from "lucide-react";
import UserInfo from "./UserInfo";
import ToggleButton from "./ToggleButton";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/upcoming-events", label: "Upcoming Events" },
];

function NavLinks({
    mobile = false,
    onNavigate,
}: {
    mobile?: boolean;
    onNavigate?: () => void;
}) {
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <>
            {navLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={onNavigate}
                    className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                        isActive(link.href)
                            ? "bg-emerald-50 text-[#0ead69] dark:bg-[#0ead69]/10"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-[#222630] dark:hover:text-white"
                    }`}>
                    {link.href === "/upcoming-events" && (
                        <CalendarDays size={mobile ? 16 : 15} />
                    )}
                    {link.label}

                    {isActive(link.href) && (
                        <span className="absolute -bottom-[13px] left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-[#0ead69] max-lg:hidden" />
                    )}
                </Link>
            ))}
        </>
    );
}

const navbarFallback = (
    <div className="flex gap-1 px-1">
        {navLinks.map((link) => (
            <span
                key={link.href}
                className="h-9 rounded-xl px-4 py-2 text-sm font-medium text-gray-400">
                {link.label}
            </span>
        ))}
    </div>
);

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            setScrolled(scrollTop > 8);

            const total =
                document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? Math.min(scrollTop / total, 1) : 0);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-all duration-300 dark:bg-[#15171D]/90 ${
                scrolled
                    ? "border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-gray-700 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
                    : "border-transparent"
            }`}>
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[72px] md:px-8">
                <div className="flex items-center gap-2.5">
                    <Image
                        src={"/images/Sociallogo.png"}
                        alt="Social Circle logo"
                        height={48}
                        width={48}
                        className="h-9 w-9 object-contain md:h-11 md:w-11"/>
                    <div className="flex flex-col">
                        <Link
                            href="/"
                            className="font-bold text-xl leading-6 text-gray-900 md:text-2xl dark:text-white">
                            Social<span className="text-[#0ead69]">Circle</span>
                        </Link>
                        <p className="hidden text-[10px] tracking-widest text-gray-500 sm:block">
                            COMMUNITY ACTION
                        </p>
                    </div>
                </div>

                <nav className="hidden items-center gap-1 lg:flex">
                    <Suspense fallback={navbarFallback}>
                        <NavLinks />
                    </Suspense>
                </nav>

                <div className="flex items-center gap-2 sm:gap-3">
                    <ToggleButton />
                    <div className="hidden sm:block">
                        <UserInfo />
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileOpen}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 lg:hidden dark:border-gray-600 dark:text-gray-300 dark:hover:bg-[#222630]">
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-transparent">
                <div
                    className="h-full rounded-r-full bg-gradient-to-r from-[#0ead69] via-[#4be69a] to-[#b5f77c] transition-[width] duration-150 ease-out"
                    style={{ width: `${progress * 100}%` }}/>
            </div>

            <div
                className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 lg:hidden dark:border-gray-700 dark:bg-[#15171D] ${
                    mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
                }`}>
                <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
                    <Suspense fallback={null}>
                        <NavLinks mobile onNavigate={() => setMobileOpen(false)} />
                    </Suspense>

                    <div className="mt-2 border-t border-gray-100 pt-3 dark:border-gray-700">
                        <UserInfo />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
