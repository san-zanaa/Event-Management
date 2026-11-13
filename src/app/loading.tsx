import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <main className="flex min-h-[80vh] flex-col items-center justify-center bg-[#f6f9f8] px-5 dark:bg-[#15171D]">
            <div className="relative flex items-center justify-center">
                <span className="absolute h-28 w-28 animate-ping rounded-full bg-[#0ead69]/10" />
                <span className="absolute h-20 w-20 animate-pulse-slow rounded-full bg-[#0ead69]/15 blur-md" />

                <Image
                    src="/images/Sociallogo.png"
                    alt="Social Circle"
                    width={72}
                    height={72}
                    priority
                    className="relative h-16 w-16 animate-pulse object-contain"/>
            </div>

            <div className="mt-8 flex items-center gap-2.5 text-[#0ead69]">
                <Loader2 size={18} className="animate-spin" />
                <p className="text-sm font-semibold tracking-wide">
                    Loading Social Circle…
                </p>
            </div>

            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                Bringing your community events to you
            </p>

            <div className="mt-10 w-full max-w-2xl space-y-3" aria-hidden="true">
                <div className="h-6 w-1/3 animate-pulse rounded-full bg-slate-200 dark:bg-gray-700" />
                <div className="h-4 w-full animate-pulse rounded-full bg-slate-200/70 dark:bg-gray-700/70" />
                <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200/70 dark:bg-gray-700/70" />
            </div>
        </main>
    );
}
