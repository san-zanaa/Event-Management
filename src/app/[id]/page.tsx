
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import {
    ArrowLeft,
    ArrowUpRight,
    CalendarDays,
    Check,
    CheckCircle2,
    Clock,
    HeartHandshake,
    Mail,
    MapPin,
    Share2,
    ShieldCheck,
    Users,
} from "lucide-react";

interface EventDetails {
    _id?: string;
    id?: number | string;
    category: string;
    title: string;
    date: string;
    dateISO: string;
    time: string;
    location: string;
    address: string;
    description: string;
    image: string;
    color: string;
    about: string;
    objectives: string[];
    guidelines: string[];

    organizer: {
        name: string;
        email: string;
        image: string;
        verified: boolean;
    };

    volunteerCount: number;

    volunteers: {
        name: string;
        image: string;
    }[];

    href: string;
}

type PageProps = {
    params: Promise<{ id: string }>;
};

export default function EventDetailsPage({ params }: PageProps) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const [id, setId] = useState("");
    const [events, setEvents] = useState<EventDetails[]>([]);
    const [loading, setLoading] = useState(true);

    const [joined, setJoined] = useState(false);
    const [volunteerCount, setVolunteerCount] = useState(0);
    const [isJoining, setIsJoining] = useState(false);


    useEffect(() => {
        async function getId() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }

        getId();
    }, [params]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch("http://localhost:5000/events", {
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                let eventList: EventDetails[] = [];

                if (Array.isArray(data)) {
                    eventList = data;
                } else if (Array.isArray(data.events)) {
                    eventList = data.events;
                } else if (Array.isArray(data.data)) {
                    eventList = data.data;
                } else if (Array.isArray(data.data?.events)) {
                    eventList = data.data.events;
                }

                setEvents(eventList);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    const event = events.find(
        (item) => String(item._id ?? item.id) === String(id)
    );

    useEffect(() => {
        if (event) {
            setVolunteerCount(event.volunteerCount ?? 0);
        }
    }, [event]);

    const handleJoin = async () => {
        if (isPending || isJoining) return;

        if (!session?.user?.email) {
            router.push(`/login?redirect=/${id}`);
            return;
        }

        if (!event?._id) {
            alert("Event information not found!");
            return;
        }
        try {
            setIsJoining(true);

            const response = await fetch("http://localhost:5000/join-events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    eventId: event._id,
                    userEmail: session.user.email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to join event");
            }

            setJoined(true);
            setVolunteerCount((prev) => prev + 1);

            alert("You have successfully joined this event!");

            router.push("/joined-events");

        } catch (error) {
            console.error("Join event error:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            )
        } finally {
            setIsJoining(false);
        }
    }

    const handleLeave = async () => {
        if (!session?.user?.email || !event?._id || isJoining) return;

        const confirmed = window.confirm(
            "Are you sure you want to leave this event?"
        );

        if (!confirmed) return;

        try {
            setIsJoining(true);

            const response = await fetch(
                `http://localhost:5000/leave-event/${encodeURIComponent(session.user.email)}/${event._id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to leave event");
            }

            setJoined(false);
            setVolunteerCount((prev) => Math.max(0, prev - 1));

            alert("You have successfully left this event!");

        } catch (error) {
            console.error("Leave event error:", error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setIsJoining(false);
        }
    };

    if (loading || !id) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#f7faf9]">
                <p className="text-lg font-semibold text-emerald-700">
                    Loading event...
                </p>
            </main>
        );
    }

    if (!event) {
        return (
            <main className="min-h-screen bg-[#f7faf9] flex items-center justify-center px-5">
                <div className="text-center">
                    <div className='flex gap-1 justify-center items-center'>
                        <Image src={"/images/Sociallogo.png"} alt='logo' height={50} width={50} className='w-10 h-12 object-contain' />
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        Event Not Found
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Sorry, this event does not exist.
                    </p>

                    <Link
                        href="/upcoming-events"
                        className="inline-flex mt-6 rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition">
                        Explore Events
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f6f9f8] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link
                    href="/upcoming-events"
                    className="inline-flex items-center gap-2 mb-6 text-sm font-semibold text-gray-500 hover:text-emerald-600 transition">
                    <ArrowLeft size={17} />
                    Back to Events
                </Link>

                <div className="overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-[0_12px_45px_rgba(0,0,0,0.06)]">
                    <section className="relative h-[330px] sm:h-[400px] lg:h-[440px]">
                        <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            priority
                            unoptimized
                            className="object-cover"
                            sizes="100vw" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
                        <div className="absolute top-6 left-6">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow">
                                <HeartHandshake size={16} />
                                {event.category}
                            </span>
                        </div>

                        <button
                            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white transition"
                            aria-label="Share event">
                            <Share2 size={19} />
                        </button>

                        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-300">
                                Community Initiative
                            </p>

                            <h1 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
                                {event.title}
                            </h1>

                            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm sm:text-base text-white/90">
                                <span className="flex items-center gap-2">
                                    <MapPin size={19} className="text-emerald-400" />
                                    {event.location}
                                </span>

                                <span className="flex items-center gap-2">
                                    <CalendarDays size={19} className="text-emerald-400" />
                                    {event.date}
                                </span>

                                <span className="flex items-center gap-2">
                                    <Clock size={19} className="text-emerald-400" />
                                    {event.time}
                                </span>
                            </div>
                        </div>
                    </section>

                    <div className="p-5 sm:p-8 lg:p-10">

                        <section className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-5 sm:p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                                    <Users size={27} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {volunteerCount} Volunteers Joined
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {joined
                                            ? "You are confirmed for this initiative!"
                                            : "Be part of something meaningful."}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-emerald-600 transition"
                                    aria-label="Share event">
                                    <Share2 size={19} />
                                </button>

                                <button
                                    onClick={joined ? handleLeave : handleJoin}
                                    disabled={isPending || isJoining}
                                    className={`flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition ${joined
                                            ? "bg-gray-700 hover:bg-gray-800"
                                            : "bg-emerald-600 hover:bg-emerald-700"
                                        }`}
                                >
                                    {isPending
                                        ? "Please wait..."
                                        : isJoining
                                            ? joined
                                                ? "Leaving..."
                                                : "Joining..."
                                            : joined
                                                ? (
                                                    <>
                                                        Joined (Click to Leave)
                                                        <CheckCircle2 size={17} />
                                                    </>
                                                )
                                                : (
                                                    <>
                                                        Join as Volunteer
                                                        <ArrowUpRight size={17} />
                                                    </>
                                                )}
                                </button>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 space-y-9">
                                <section>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-9 w-1 rounded-full bg-emerald-500" />
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                            About This Social Initiative
                                        </h2>
                                    </div>

                                    <p className="text-[15px] leading-8 text-gray-600">
                                        {event.about || event.description}
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-lg font-bold text-gray-900 mb-5">
                                        Our Objectives
                                    </h2>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {(event.objectives ?? []).map((objective, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 p-4">
                                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                                    <Check size={15} />
                                                </span>

                                                <p className="text-sm leading-6 text-gray-600">
                                                    {objective}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-lg font-bold text-gray-900 mb-5">
                                        Volunteer Guidelines
                                    </h2>

                                    <div className="space-y-4">
                                        {(event.guidelines ?? []).map((guideline, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3">
                                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                                                <p className="text-sm leading-7 text-gray-600">
                                                    {guideline}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="border-t border-gray-100 pt-7">
                                    <h2 className="text-lg font-bold text-gray-900 mb-5">
                                        Event Location
                                    </h2>

                                    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 p-5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                            <MapPin size={23} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                {event.location}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {event.address}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <aside className="space-y-6">
                                <section className="rounded-2xl border border-gray-200 p-6">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">
                                            Initiative Organizer
                                        </h3>

                                        <ShieldCheck size={20} className="text-emerald-500" />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-emerald-100">
                                            {event.organizer?.image && (
                                                <Image
                                                    src={event.organizer.image}
                                                    alt={event.organizer.name}
                                                    fill
                                                    unoptimized
                                                    className="object-cover" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h4 className="truncate font-bold text-gray-900">
                                                {event.organizer?.name || "Event Organizer"}
                                            </h4>

                                            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                                <Mail size={12} />
                                                <span className="truncate">
                                                    {event.organizer?.email || "Not provided"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    {event.organizer?.verified && (
                                        <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-medium text-emerald-700">
                                            <ShieldCheck size={16} />
                                            Verified Platform Member
                                        </div>
                                    )}
                                </section>

                                <section className="rounded-2xl border border-gray-200 p-6">
                                    <div className="mb-5 flex items-center justify-between">
                                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">
                                            Confirmed Volunteers
                                        </h3>
                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                            {volunteerCount}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {(event.volunteers ?? []).length > 0 ? (
                                            event.volunteers.slice(0, 5).map((volunteer, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-3">
                                                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                                                        {volunteer.image && (
                                                            <Image
                                                                src={volunteer.image}
                                                                alt={volunteer.name}
                                                                fill
                                                                unoptimized
                                                                className="object-cover" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-gray-800">
                                                            {volunteer.name}
                                                        </p>

                                                        <p className="text-xs text-gray-400">
                                                            Volunteer
                                                        </p>
                                                    </div>

                                                    <CheckCircle2
                                                        size={16}
                                                        className="ml-auto shrink-0 text-emerald-500" />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm leading-6 text-gray-500">
                                                No volunteers yet. Be the first to join this initiative!
                                            </p>
                                        )}
                                    </div>
                                </section>

                                <section className="relative overflow-hidden rounded-2xl bg-[#123d32] p-6 text-white">
                                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-400/10" />
                                    <h3 className="text-xl font-bold leading-snug">
                                        Small Acts, Big Impact.
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-emerald-100/80">
                                        Your time and kindness can make a real difference in someone's life.
                                    </p>
                                </section>
                            </aside>
                        </div>
                    </div>
                </div>

                <div className="mt-7 flex items-center justify-between">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-emerald-600 transition">
                        <ArrowLeft size={16} />
                        Explore More Events
                    </Link>

                    <Link
                        href="/"
                        className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
                        Social Circle
                    </Link>
                </div>
            </div>
        </main>
    );
}
