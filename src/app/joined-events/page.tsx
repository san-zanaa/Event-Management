
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    CalendarDays,
    Clock,
    MapPin,
    Users,
    ArrowRight,
    Leaf,
    Loader2,
    CalendarCheck,
    HandHeart,
    LogIn,
    LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";


interface JoinedEvent {
    _id: string;
    title: string;
    category?: string;
    date?: string;
    dateISO?: string;
    time?: string;
    location?: string;
    image?: string;
    description?: string;
    volunteerCount?: number;
    joinedAt?: string;
}

export default function JoinedEventsPage() {
    const { data: session, isPending: sessionLoading } =
        authClient.useSession();

    const [events, setEvents] = useState<JoinedEvent[]>([]);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [error, setError] = useState("");
    const [leavingId, setLeavingId] = useState<string | null>(null);

    const userEmail = session?.user?.email;
    const loading = sessionLoading || (Boolean(userEmail) && eventsLoading);

    useEffect(() => {
        if (sessionLoading || !userEmail) return;

        const fetchJoinedEvents = async () => {
            try {
                setEventsLoading(true);
                setError("");

                const { data, error } = await authClient.token();

                if (error || !data?.token) {
                    throw new Error("Please login first.");
                }
                const response = await fetch("http://localhost:5000/joined-events",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${data.token}`,
                        },
                        cache: "no-store",
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to load joined events.");
                }

                const result = await response.json();
                setEvents(Array.isArray(result) ? result : []);

            } catch (err) {
                console.error(err);

                setError(
                    err instanceof Error
                        ? err.message
                        : "Unable to load your joined events."
                );

            } finally {
                setEventsLoading(false);
            }
        };
        fetchJoinedEvents();

    }, [userEmail, sessionLoading]);

    const handleLeaveEvent = async (eventId: string) => {
        if (!userEmail) return;

        const confirmed = window.confirm(
            "Are you sure you want to leave this event?"
        );

        if (!confirmed) return;

        try {
            setLeavingId(eventId);
            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                throw new Error("Please login first.");
            }
            const response = await fetch(`http://localhost:5000/leave-event/${eventId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                }
            );

            const result = await response.json();
            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to leave event."
                );
            }
            setEvents((previousEvents) =>
                previousEvents.filter((event) => event._id !== eventId)
            );

        } catch (err) {
            console.error(err);

            alert(
                err instanceof Error
                    ? err.message
                    : "Something went wrong."
            );

        } finally {
            setLeavingId(null);
        }
    };
    if (sessionLoading || loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#f7faf8] dark:bg-[#15171D]">
                <div className="text-center">
                    <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-emerald-600" />

                    <p className="font-medium text-gray-600">
                        Loading your joined events...
                    </p>
                </div>
            </div>
        );
    }

    if (!userEmail) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-[#f7faf8] px-4 dark:bg-[#15171D]">
                <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm dark:bg-[#222630] dark:border-gray-600">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                        <LogIn className="h-8 w-8 text-emerald-600" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-300">
                        Login Required
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Please log in to see the community events you
                        have joined.
                    </p>

                    <Link
                        href="/login"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">
                        Login Now
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7faf8] pb-20 dark:bg-[#15171D]">

            <section className="relative overflow-hidden bg-[#103c2d]">
                <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
                <div className="absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
                <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
                    <div className="max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
                            <HandHeart size={17} />
                            Your Community Journey
                        </div>

                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                            Events You&apos;ve{" "}
                            <span className="text-lime-300">
                                Joined
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-base leading-7 text-emerald-50/80 md:text-lg">
                            Every small action creates a big difference.
                            Keep track of the community events you are
                            part of and continue making an impact.
                        </p>

                        <Link
                            href="/events"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-lime-300 px-6 py-3.5 font-bold text-[#173d2e] transition hover:bg-lime-200">
                            Explore More Events
                            <ArrowRight size={19} />
                        </Link>
                    </div>

                    <div className="absolute bottom-8 right-10 hidden opacity-10 md:block">
                        <HandHeart
                            size={210}
                            strokeWidth={1}
                            color="white" />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 pt-10 md:px-8 md:pt-14">

                <div className="mb-12">
                    <div className="flex max-w-sm items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:bg-[#1B1E26]">
                        <div>
                            <p className="text-sm font-medium text-gray-400">
                                Total Joined Events
                            </p>

                            <h3 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                {events.length}
                            </h3>
                        </div>

                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">
                            <CalendarCheck
                                className="text-emerald-600"
                                size={27}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
                        <Leaf size={16} />
                        Your Participation
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                        My Joined Events
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Manage and keep track of the community events
                        you have joined.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {events.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 dark:bg-[#1B1E26]">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="flex flex-col sm:flex-row gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition dark:bg-[#222630]">
                                <div className="relative h-52 w-full sm:h-44 sm:w-48 shrink-0 overflow-hidden rounded-xl">
                                    {event.image && (
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, 192px" />
                                    )}

                                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
                                        {event.category || "Community Event"}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col justify-between gap-4">
                                    <div>
                                        <div className="mb-2">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                                                Successfully Joined
                                            </span>
                                        </div>

                                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                            {event.title}
                                        </h2>

                                        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
                                            <span className="flex items-center gap-1.5">
                                                <CalendarDays size={16} className="text-emerald-600" />
                                                {event.date}
                                            </span>

                                            <span className="flex items-center gap-1.5">
                                                <Clock size={16} className="text-emerald-600" />
                                                {event.time}
                                            </span>
                                        </div>

                                        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-400">
                                            <MapPin size={16} className="shrink-0 text-emerald-600" />
                                            {event.location}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3 dark:border-gray-600">
                                        <p className="flex items-center gap-2 text-sm font-medium text-gray-400">
                                            <Users size={17} className="text-emerald-600" />
                                            {event.volunteerCount ?? 0} Volunteers Joined
                                        </p>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleLeaveEvent(event._id)}
                                                disabled={leavingId === event._id}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60">
                                                {leavingId === event._id ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <LogOut size={16} />
                                                )}
                                                Leave
                                            </button>

                                            <Link
                                                href={`/${event._id}`}
                                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 transition">
                                                View Event
                                                <ArrowRight size={16} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:bg-[#222630] dark:border-gray-500">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                            <CalendarCheck size={30} className="text-emerald-600" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-300">
                            No Joined Events Yet
                        </h3>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                            You haven&apos;t joined any community events yet.
                            Explore upcoming events and become a part of something meaningful.
                        </p>

                        <Link
                            href="/events"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800">
                            Explore Events
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}