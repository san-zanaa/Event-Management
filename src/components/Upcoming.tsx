"use client";

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import EventCard, { type Event } from "@/components/EventCards";

export default function Upcoming() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`);
                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data: Event[] = await res.json();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <section className="w-full bg-slate-50 dark:bg-[#15171D] py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div className="w-2/3">
                        <div className="mb-3 flex items-center gap-2">
                            <Flame className="h-4 w-4 fill-orange-400 text-orange-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[#0ead69]">
                                Upcoming Initiatives
                            </span>
                        </div>

                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-gray-300">
                            Recent Upcoming Events
                        </h2>

                        <p className="mt-3 text-sm text-slate-500 md:text-base">
                            Empowering communities through action. Catch up on our volunteers&apos; recent activities and find out where we need your support next!

                        </p>
                    </div>

                    <Link
                        href="/events"
                        className="group flex items-center gap-2 text-sm font-semibold text-[#0ead69] transition hover:text-[#07c573]">
                        View All Events
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {events.length === 0 ? (
                    <p className="py-10 text-center text-slate-500">
                        No events available right now.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.slice(0, 6).map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}