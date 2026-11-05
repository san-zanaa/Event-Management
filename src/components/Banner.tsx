
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    Heart,
    Users,
    CalendarDays,
    HandHeart,
    Sparkles,
    MoveDown,
} from "lucide-react";

export default function Hero() {
    return (
        <section className="relative isolate flex min-h-[850px] flex-col overflow-hidden bg-[#10251b] md:min-h-[900px]">

            <div className="absolute inset-0 -z-20">
                <Image
                    src="/images/banner.png"
                    alt="Social Circle community volunteers"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </div>

            <div className="absolute inset-0 -z-10 bg-[#071b12]/55" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#071b12]/40 via-[#071b12]/20 to-[#071b12]/90" />
            <div className="absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-[#0ead69]/20 blur-[120px]" />
            <div className="absolute -right-40 bottom-20 -z-10 h-96 w-96 rounded-full bg-emerald-400/10 blur-[120px]" />
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-20 pt-32 text-center md:pt-36">
                <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 shadow-lg backdrop-blur-xl">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0ead69] opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0ead69]" />
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-white md:text-sm">
                        YOUR COMMUNITY, YOUR CIRCLE
                    </span>

                    <Sparkles className="h-4 w-4 text-lime-300" />
                </div>

                <h1 className="max-w-5xl text-5xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[82px]">
                    Together We Can
                    <br />
                    <span className="bg-gradient-to-r from-[#8df5b9] via-[#4be69a] to-[#b5f77c] bg-clip-text text-transparent">
                        Make a Difference.
                    </span>
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg md:text-xl">
                    Small acts of kindness create extraordinary change.
                    Discover meaningful community events, meet passionate
                    people, and be part of something bigger.
                </p>

                <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">

                    <Link
                        href="upcoming-events"
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#0ead69] px-8 py-4 text-sm font-bold text-white shadow-[0_10px_35px_rgba(14,173,105,0.3)] transition duration-300 hover:-translate-y-1 hover:bg-[#0c995c] hover:shadow-[0_15px_40px_rgba(14,173,105,0.4)] sm:w-auto md:text-base">
                        Explore Events
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href="/create-event"
                        className="group flex w-full items-center justify-center gap-3 rounded-full border border-white/40 bg-white/10 px-8 py-4 text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#123d29] sm:w-auto md:text-base">
                        <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
                        Create an Event
                    </Link>

                </div>

                <div className="mt-12 flex items-center gap-3 text-sm text-white/70">
                    <div className="flex -space-x-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/60 bg-[#d7f5df] text-[#14784a]">
                            <Users size={16} />
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/60 bg-[#c9e9d4] text-[#14784a]">
                            <Heart size={16} />
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/60 bg-[#b4e3c5] text-[#14784a]">
                            <HandHeart size={16} />
                        </div>
                    </div>

                    <p>
                        Bringing communities together, one event at a time.
                    </p>
                </div>
            </div>

            <div className="relative z-10 mx-auto mb-10 w-full max-w-5xl px-5 md:mb-12">

                <div className="grid grid-cols-2 gap-3 rounded-[28px] border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl sm:grid-cols-4 sm:gap-0 sm:p-6">

                    <div className="flex flex-col items-center justify-center border-white/15 py-4 sm:border-r">
                        <Users className="mb-3 h-6 w-6 text-[#70e9a6]" />
                        <h3 className="text-3xl font-extrabold text-white md:text-4xl">
                            1,450+
                        </h3>
                        <p className="mt-2 text-xs font-medium text-white/65 md:text-sm">
                            Active Volunteers
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center border-white/15 py-4 sm:border-r">
                        <CalendarDays className="mb-3 h-6 w-6 text-[#70e9a6]" />
                        <h3 className="text-3xl font-extrabold text-white md:text-4xl">
                            180+
                        </h3>
                        <p className="mt-2 text-xs font-medium text-white/65 md:text-sm">
                            Events Completed
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center border-white/15 py-4 sm:border-r">
                        <HandHeart className="mb-3 h-6 w-6 text-[#70e9a6]" />
                        <h3 className="text-3xl font-extrabold text-white md:text-4xl">
                            24,000+
                        </h3>
                        <p className="mt-2 text-xs font-medium text-white/65 md:text-sm">
                            Lives Impacted
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4">
                        <Heart className="mb-3 h-6 w-6 text-[#70e9a6]" />
                        <h3 className="text-3xl font-extrabold text-white md:text-4xl">
                            100%
                        </h3>
                        <p className="mt-2 text-xs font-medium text-white/65 md:text-sm">
                            Community Driven
                        </p>
                    </div>

                </div>
            </div>

            <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/60 md:flex">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                    Discover More
                </span>
                <MoveDown className="h-4 w-4 animate-bounce" />
            </div>

        </section>
    );
}
