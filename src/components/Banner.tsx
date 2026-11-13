
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    Heart,
    Users,
    CalendarDays,
    HandHeart,
    Sparkles,
    MoveDown,
} from "lucide-react";
import Reveal from "./Reveal";
import StatCounter from "./StatCounter";

const stats = [
    { icon: Users, value: 1450, suffix: "+", label: "Active Volunteers" },
    { icon: CalendarDays, value: 180, suffix: "+", label: "Events Completed" },
    { icon: HandHeart, value: 24000, suffix: "+", label: "Lives Impacted" },
    { icon: Heart, value: 100, suffix: "%", label: "Community Driven" },
];

export default function Hero() {
    return (
        <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#071b12] lg:min-h-[900px]">

            <div className="absolute inset-0 -z-30">
                <Image
                    src="/images/banner.png"
                    alt="Social Circle community volunteers"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[65%_center] sm:object-[60%_center] md:object-center"/>
            </div>

            <div className="absolute inset-0 bg-[#06170f]/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06170f]/45 via-[#06170f]/45 to-[#06170f]/75 md:bg-gradient-to-r md:from-[#06170f]/75 md:via-[#06170f]/45 md:to-[#06170f]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06170f]/50 via-transparent to-transparent" />
            <div className="absolute -left-40 top-20 -z-10 h-[450px] w-[450px] rounded-full bg-[#0ead69]/20 blur-[140px]" />
            <div className="absolute -right-40 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-[140px]" />
            <div className="absolute inset-0 -z-10 opacity-[0.05] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:35px_35px]" />
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32 md:py-24 lg:px-12">

                <div className="w-full max-w-3xl text-left">

                    <Reveal variant="down" duration={800}>
                        <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-2 shadow-lg backdrop-blur-xl sm:mb-9 sm:gap-3 sm:px-5 sm:py-2.5">
                            <span className="relative flex h-2.5 w-2.5 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0ead69] opacity-75" />
                                <span className="relative h-2.5 w-2.5 rounded-full bg-[#48e99b]" />
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-white/90 sm:text-[11px] sm:tracking-[0.18em] md:text-xs">
                                Your Community, Your Circle
                            </span>
                            <Sparkles className="h-3.5 w-3.5 shrink-0 text-lime-300 sm:h-4 sm:w-4" />
                        </div>
                    </Reveal>

                    <Reveal variant="up" delay={100} duration={850}>
                        <h1 className="text-[clamp(2.5rem,8vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.045em] text-white lg:text-[60px]">
                            Together We Can
                            <span className="mt-1 block bg-gradient-to-r from-[#b2ffd0] via-[#4be69a] to-[#c8ff92] bg-clip-text text-transparent">
                                Make a Difference.
                            </span>
                        </h1>
                    </Reveal>

                    <Reveal variant="up" delay={220} duration={850}>
                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:mt-8 sm:text-base sm:leading-8 md:text-lg">
                            Small acts of kindness create extraordinary change.
                            Discover meaningful community events, connect with
                            passionate people, and become part of something bigger.
                        </p>
                    </Reveal>

                    <Reveal
                        variant="up"
                        delay={350}
                        duration={850}
                        className="mt-7 flex w-full flex-col gap-3 sm:mt-10 sm:w-fit sm:flex-row sm:gap-4">
                        <Link
                            href="/upcoming-events"
                            className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#0ead69] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_40px_rgba(14,173,105,0.3)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#10c477] hover:shadow-[0_16px_45px_rgba(14,173,105,0.4)] sm:w-fit sm:px-8 sm:py-[17px] sm:text-base">
                            Explore Events
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="/create-event"
                            className="group flex w-full items-center justify-center gap-3 rounded-full border border-white/30 bg-white/[0.08] px-7 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#123d29] sm:w-fit sm:px-8 sm:py-[17px] sm:text-base">
                            <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:fill-current" />
                            Create an Event
                            <ArrowUpRight className="h-4 w-4 opacity-60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </Reveal>

                    <Reveal variant="up" delay={480} duration={850}>
                        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-12 sm:gap-4">
                            <div className="flex -space-x-3 shrink-0">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#234332] bg-[#d7f5df] text-[#14784a] sm:h-10 sm:w-10">
                                    <Users size={17} />
                                </div>
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#234332] bg-[#c9e9d4] text-[#14784a] sm:h-10 sm:w-10">
                                    <Heart size={17} />
                                </div>
                                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#234332] bg-[#b4e3c5] text-[#14784a] sm:h-10 sm:w-10">
                                    <HandHeart size={17} />
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-white sm:text-sm">
                                    Together, We Make an Impact
                                </p>
                                <p className="mt-1 text-[10px] text-white/60 sm:text-xs">
                                    Bringing communities together, one event at a time.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            <div className="relative z-10 mx-auto mb-6 w-full max-w-7xl px-4 sm:mb-10 sm:px-8 lg:px-12 md:mb-14">
                <Reveal variant="up" delay={200} duration={900}>
                    <div className="overflow-hidden rounded-2xl border border-white/[0.18] bg-white/[0.09] p-3 shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:rounded-[28px] sm:p-7">

                        <div className="grid grid-cols-2 gap-y-3 sm:grid-cols-4 sm:gap-0">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={stat.label}
                                        className={`group flex flex-col items-center justify-center px-2 py-3 text-center sm:px-3 sm:py-3 ${
                                            index % 2 === 0 ? "max-sm:border-r max-sm:border-white/15" : ""
                                        } ${
                                            index < 2 ? "max-sm:border-b max-sm:border-white/15" : ""
                                        } ${
                                            index < 3 ? "sm:border-r sm:border-white/15" : ""
                                        }`}>
                                        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl border border-[#70e9a6]/20 bg-[#0ead69]/15 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0ead69]/25 sm:mb-3 sm:h-11 sm:w-11">
                                            <Icon className="h-4 w-4 text-[#70e9a6] sm:h-5 sm:w-5" />
                                        </div>

                                        <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
                                            <StatCounter
                                                value={stat.value}
                                                suffix={stat.suffix}
                                                duration={1600 + index * 200}
                                            />
                                        </h3>

                                        <p className="mt-1 text-[10px] font-semibold text-white/60 sm:mt-2 sm:text-xs md:text-sm">
                                            {stat.label}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Reveal>
            </div>

            <div className="absolute bottom-4 right-8 hidden items-center gap-2 text-white/50 md:flex">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em]">
                    Scroll to Explore
                </span>
                <MoveDown className="h-4 w-4 animate-bounce" />
            </div>
        </section>
    );
}
