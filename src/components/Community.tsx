
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

type Event = {
    _id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    category: string;
    image: string;
    organizerEmail: string;
};

export default function CommunityGallery() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("http://localhost:5000/events");
                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data: Event[] = await res.json();
                setEvents(data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const getImageUrl = (image: string) => {
        return image.startsWith("http")
            ? image
            : `http://localhost:5000${image.startsWith("/") ? "" : "/"}${image}`;
    };

    return (
        <section className="bg-[#F2FAEE] py-16 md:py-2 dark:bg-[#1B1E26]">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0ead69]">
                            Visual Stories
                        </p>

                        <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl dark:text-gray-300">
                            Community in Action
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
                            Visual dispatches from our community drives across Dhaka and surrounding neighborhoods.
                        </p>
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                        Updated weekly by field volunteers
                    </span>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                        <div className="h-[375px] animate-pulse rounded-2xl bg-slate-200 lg:col-span-7" />
                        <div className="flex flex-col gap-5 lg:col-span-5">
                            <div className="h-[175px] animate-pulse rounded-2xl bg-slate-200" />
                            <div className="h-[175px] animate-pulse rounded-2xl bg-slate-200" />
                        </div>
                    </div>
                ) : events.length === 0 ? (
                    <p className="py-16 text-center text-slate-500">
                        No community stories available right now.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                        {events[0] && (
                            <Link
                                href={`/events/${events[0]._id}`}
                                className="group relative h-[260px] overflow-hidden rounded-2xl shadow-md sm:h-[350px] lg:col-span-7 lg:row-span-2 lg:h-[375px]">
                                <Image
                                    src={getImageUrl(events[0].image)}
                                    alt={events[0].title}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 1024px) 100vw, 58vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"/>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                                <div className="absolute bottom-0 left-0 w-full p-5 md:p-6">
                                    <span className="mb-2 inline-block rounded-full bg-[#0ead69] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                        {events[0].category}
                                    </span>
                                    <h3 className="line-clamp-2 text-xl font-extrabold text-white md:text-2xl">
                                        {events[0].title}
                                    </h3>
                                    <p className="mt-2 line-clamp-2 text-sm text-white/80">
                                        {events[0].description}
                                    </p>
                                    <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-white/90">
                                        <MapPin className="h-4 w-4 text-[#39d98a]" />
                                        {events[0].location}
                                    </div>
                                </div>
                            </Link>
                        )}

                        {events.slice(1, 3).map((event) => (
                            <Link
                                key={event._id}
                                href={`/events/${event._id}`}
                                className="group relative h-[220px] overflow-hidden rounded-2xl shadow-md sm:h-[250px] lg:col-span-5 lg:h-[175px]">
                                <Image
                                    src={getImageUrl(event.image)}
                                    alt={event.title}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"/>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                                <div className="absolute bottom-0 left-0 w-full p-4">
                                    <span className="mb-1 inline-block rounded-full bg-[#0ead69] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
                                        {event.category}
                                    </span>
                                    <h3 className="line-clamp-1 text-base font-bold text-white">
                                        {event.title}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-1 text-xs text-white/85">
                                        <MapPin className="h-3.5 w-3.5 text-[#39d98a]" />
                                        <span className="line-clamp-1">
                                            {event.location}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
