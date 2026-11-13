import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Home } from "lucide-react";

export const metadata: Metadata = {
    title: "404 | Page Not Found",
    description: "The page you are looking for could not be found.",
};

export default function NotFound() {
    return (
        <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#f6f9f8] px-5 py-16 dark:bg-[#15171D]">
            <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#0ead69]/10 blur-[110px]" />
            <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-[110px]" />

            <div className="relative z-10 w-full max-w-lg text-center">
                <div className="mb-8 flex items-center justify-center gap-3">
                    <Image
                        src="/images/Sociallogo.png"
                        alt="Social Circle"
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"/>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        Social<span className="text-[#0ead69]">Circle</span>
                    </span>
                </div>

                <h1 className="bg-gradient-to-r from-[#0ead69] via-[#4be69a] to-[#0ead69] bg-clip-text text-7xl font-extrabold tracking-tight text-transparent sm:text-8xl">
                    404
                </h1>

                <h2 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                    Page Not Found
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500 md:text-base dark:text-gray-400">
                    The page you are looking for doesn&apos;t exist or may have
                    been moved. Let&apos;s get you back on track.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#0ead69] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(14,173,105,0.3)] transition hover:-translate-y-0.5 hover:bg-[#0c995c] sm:w-auto">
                        <Home size={17} />
                        Back to Home
                    </Link>

                    <Link
                        href="/events"
                        className="group flex w-full items-center justify-center gap-2.5 rounded-xl border border-emerald-600/40 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-50 dark:bg-[#1B1E26] dark:text-emerald-400 dark:hover:bg-[#222630] sm:w-auto">
                        <Compass size={17} />
                        Explore Events
                        <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>
        </main>
    );
}
