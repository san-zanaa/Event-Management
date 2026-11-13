"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
    ArrowRight,
    Flame,
    LayoutGrid,
    ListFilter,
    Loader2,
    MapPin,
    Search,
    SlidersHorizontal,
    Sparkles,
    X,
} from "lucide-react";
import EventCard, { type Event } from "@/components/EventCards";
import Reveal from "@/components/Reveal";
import { API_URL } from "@/lib/api";

const sorts = [
    { key: "latest", label: "Newest first" },
    { key: "soonest", label: "Happening soon" },
    { key: "popular", label: "Most joined" },
] as const;

type SortKey = (typeof sorts)[number]["key"];

function EventCardSkeleton() {
    return (
        <div className="animate-pulse overflow-hidden rounded-2xl border border-[#e5eee2] bg-white shadow-sm dark:border-gray-600 dark:bg-[#222630]">
            <div className="h-[190px] w-full bg-slate-200 dark:bg-gray-700" />
            <div className="space-y-3 p-5">
                <div className="h-3 w-40 rounded-full bg-slate-200 dark:bg-gray-700" />
                <div className="h-5 w-3/4 rounded-full bg-slate-200 dark:bg-gray-700" />
                <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-gray-800" />
                <div className="h-3 w-5/6 rounded-full bg-slate-100 dark:bg-gray-800" />
                <div className="flex justify-between pt-2">
                    <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-gray-700" />
                    <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-gray-700" />
                </div>
            </div>
        </div>
    );
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState<SortKey>("latest");

    useEffect(() => {
        let cancelled = false;

        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${API_URL}/events`, { cache: "no-store" });

                if (!res.ok) {
                    throw new Error("Failed to fetch events");
                }

                const data = await res.json();
                if (!cancelled) {
                    setEvents(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("Error fetching events:", err);
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Unable to load events right now."
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchEvents();

        return () => {
            cancelled = true;
        };
    }, []);

    const categories = useMemo(() => {
        const unique = new Set<string>();
        events.forEach((event) => {
            if (event.category) unique.add(event.category);
        });
        return ["All", ...Array.from(unique).sort()];
    }, [events]);

    const visibleEvents = useMemo(() => {
        const query = search.trim().toLowerCase();

        let result = events.filter((event) => {
            const matchesCategory =
                category === "All" || event.category === category;

            const matchesSearch =
                !query ||
                [event.title, event.location, event.description, event.category]
                    .some((field) => field?.toLowerCase().includes(query));

            return matchesCategory && matchesSearch;
        });

        if (sort === "soonest") {
            result = [...result].sort((a, b) => {
                const aDate = new Date(a.dateISO || a.date || "").getTime() || Infinity;
                const bDate = new Date(b.dateISO || b.date || "").getTime() || Infinity;
                return aDate - bDate;
            });
        } else if (sort === "popular") {
            result = [...result].sort(
                (a, b) => (b.volunteerCount ?? 0) - (a.volunteerCount ?? 0)
            );
        }

        return result;
    }, [events, search, category, sort]);

    const activeFilters = search.trim() !== "" || category !== "All" || sort !== "latest";

    return (
        <main className="min-h-screen bg-slate-50 pb-20 dark:bg-[#15171D]">
            <section className="relative overflow-hidden bg-[#103c2d]">
                <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
                    <div className="max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
                            <Sparkles size={16} />
                            All Community Initiatives
                        </div>

                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                            Every Event,{" "}
                            <span className="text-lime-300">One Place</span>
                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-emerald-50/80 md:text-lg">
                            Browse all verified volunteer opportunities near you —
                            search, filter by category and find where you can make
                            the biggest difference.
                        </p>
                    </div>

                    <div className="absolute bottom-8 right-10 hidden opacity-10 md:block">
                        <Flame size={210} strokeWidth={1} color="white" />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 pt-10 md:px-8">
                <div className="mb-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-600 dark:bg-[#1B1E26]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title, location or category..."
                                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-10 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0ead69] focus:ring-2 focus:ring-[#0ead69]/20 dark:border-gray-600 dark:bg-[#15171D] dark:text-gray-200"/>
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    aria-label="Clear search"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:text-slate-600">
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        <div className="relative w-full sm:w-56 lg:w-52">
                            <SlidersHorizontal
                                size={16}
                                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value as SortKey)}
                                aria-label="Sort events"
                                className="h-12 w-full cursor-pointer appearance-none rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-8 text-sm text-slate-600 shadow-sm outline-none transition focus:border-[#0ead69] focus:ring-2 focus:ring-[#0ead69]/20 dark:border-gray-600 dark:bg-[#15171D] dark:text-gray-300"
                            >
                                {sorts.map((option) => (
                                    <option key={option.key} value={option.key}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {categories.length > 1 && (
                        <div className="mt-5 flex flex-wrap items-center gap-2">
                            {categories.map((name) => {
                                const active = category === name;
                                return (
                                    <button
                                        key={name}
                                        type="button"
                                        onClick={() => setCategory(name)}
                                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                                            active
                                                ? "bg-[#0ead69] text-white shadow-md shadow-[#0ead69]/25"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-[#222630] dark:text-gray-300 dark:hover:bg-[#2b2f3a]"
                                        }`}>
                                        <LayoutGrid size={13} />
                                        {name}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        <ListFilter size={16} />
                        {loading
                            ? "Loading events..."
                            : `${visibleEvents.length} ${
                                  visibleEvents.length === 1 ? "Event" : "Events"
                              } found`}
                    </p>

                    {activeFilters && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch("");
                                setCategory("All");
                                setSort("latest");
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-red-950/30">
                            <X size={13} />
                            Clear filters
                        </button>
                    )}
                </div>

                {error && !loading && (
                    <div className="mb-8 flex flex-col items-center gap-3 rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center dark:border-red-900/40 dark:bg-red-950/20">
                        <Loader2 className="h-8 w-8 text-red-500" />
                        <p className="text-sm font-medium text-red-700 dark:text-red-300">
                            {error} — Please make sure the backend server is running.
                        </p>
                        <Link
                            href="/"
                            className="mt-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800">
                            Back to Home
                        </Link>
                    </div>
                )}

                {!error && (loading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <EventCardSkeleton key={index} />
                        ))}
                    </div>
                ) : visibleEvents.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:bg-[#222630] dark:border-gray-500">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <MapPin size={30} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200">
                            {activeFilters ? "No events match your filters" : "No events yet"}
                        </h3>
                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                            {activeFilters
                                ? "Try a different search term or category — new community events are added regularly."
                                : "There are no community events on the platform right now. Check back soon!"}
                        </p>
                        <Link
                            href="/create-event"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">
                            Create an Event
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {visibleEvents.map((event, index) => (
                            <Reveal
                                key={event._id}
                                variant="up"
                                delay={(index % 3) * 110}
                                duration={650}>
                                <EventCard event={event} />
                            </Reveal>
                        ))}
                    </div>
                ))}
            </section>
        </main>
    );
}
