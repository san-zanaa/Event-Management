"use client";

import Link from "next/link";
import { ArrowRight, Flame, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import EventCard, { type Event } from "@/components/EventCards";
import Reveal from "@/components/Reveal";
import { API_URL } from "@/lib/api";

function EventCardSkeleton() {
    return (
        <div className="animate-pulse overflow-hidden rounded-2xl border border-[#e5eee2] bg-white shadow-sm dark:border-gray-600 dark:bg-[#222630]">
            <div className="h-[190px] w-full bg-slate-200 dark:bg-gray-700" />
            <div className="space-y-3 p-5">
                <div className="h-3 w-40 rounded-full bg-slate-200 dark:bg-gray-700" />
                <div className="h-5 w-3/4 rounded-full bg-slate-200 dark:bg-gray-700" />
                <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-gray-800" />
                <div className="h-3 w-5/6 rounded-full bg-slate-100 dark:bg-gray-800" />
            </div>
        </div>
    );
}

export default function UpcomingEvents() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const fetchEvents = async () => {
            try {
                const res = await fetch(`${API_URL}/events`, { cache: "no-store" });
                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data: Event[] = await res.json();
                if (!cancelled) setEvents(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching events:", error);
                if (!cancelled) setError(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchEvents();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <main className="w-full bg-slate-50 py-16 md:py-20 dark:bg-[#15171D]">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <Flame className="h-4 w-4 fill-orange-400 text-orange-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[#0ead69]">
                                Upcoming Initiatives
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-gray-300">
                            Find Your Next Opportunity to Make a Difference
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm text-slate-500 md:text-base dark:text-gray-400">
                            Browse verified volunteer initiatives, cleanup drives and community welfare programs happening across your neighborhood.
                        </p>
                    </div>

                    <Link
                        href="/events"
                        className="group flex w-fit items-center gap-2 text-sm font-semibold text-[#0ead69] transition hover:text-[#07c573]">
                        View All Events
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 9 }).map((_, index) => (
                            <EventCardSkeleton key={index} />
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center gap-3 rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900/40 dark:bg-red-950/20">
                        <Loader2 className="h-8 w-8 text-red-500" />
                        <p className="text-sm font-medium text-red-700 dark:text-red-300">
                            Couldn&apos;t load events — please make sure the backend server is running.
                        </p>
                    </div>
                ) : events.length === 0 ? (
                    <p className="py-10 text-center text-slate-500 dark:text-gray-400">
                        No events available right now.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event, index) => (
                            <Reveal
                                key={event._id}
                                variant="up"
                                delay={(index % 3) * 110}
                                duration={650}>
                                <EventCard event={event} />
                            </Reveal>
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link
                        href="/create-event"
                        className="inline-flex items-center gap-2 rounded-2xl bg-[#0ead69] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-[#07c573]">
                        Organize Your Own Event
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </div>
        </main>
    );
}
