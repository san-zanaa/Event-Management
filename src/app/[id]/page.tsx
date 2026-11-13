
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { API_URL, formatEventDate, resolveImageSrc, countdownLabel } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
    ArrowLeft,
    ArrowUpRight,
    CalendarDays,
    Check,
    CheckCircle2,
    Clock,
    HeartHandshake,
    Loader2,
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

    organizerEmail?: string;

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
    const [event, setEvent] = useState<EventDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const [joined, setJoined] = useState(false);
    const [volunteerCountDelta, setVolunteerCountDelta] = useState(0);
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        async function getId() {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        }
        getId();
    }, [params]);

    useEffect(() => {
        if (!id) return;
        let cancelled = false;

        async function fetchEvent() {
            try {
                setLoading(true);
                setEvent(null);

                const response = await fetch(`${API_URL}/events/${id}`, {
                    cache: "no-store",
                });

                if (response.ok) {
                    const data = await response.json();
                    if (!cancelled) setEvent(data);
                    return;
                }
                const listResponse = await fetch(`${API_URL}/events`, {
                    cache: "no-store",
                });

                if (!listResponse.ok) {
                    throw new Error("Failed to fetch events");
                }

                const list = await listResponse.json();
                const found = Array.isArray(list)
                    ? list.find(
                          (item: EventDetails) => String(item._id) === String(id)
                      )
                    : null;

                if (!cancelled) setEvent(found ?? null);
            } catch (error) {
                console.error("Error fetching event:", error);
                if (!cancelled) setEvent(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchEvent();

        return () => {
            cancelled = true;
        };
    }, [id]);

    const volunteerCount = Math.max(
        0,
        (event?.volunteerCount ?? 0) + volunteerCountDelta
    );

    useEffect(() => {
        if (isPending || !session?.user?.email || !event?._id) return;

        const checkJoinedStatus = async () => {
            try {
                const { data, error } = await authClient.token();

                if (error || !data?.token) return;
                const response = await fetch(`${API_URL}/joined-events`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                    cache: "no-store",
                });

                if (!response.ok) {
                    throw new Error("Failed to check joined status");
                }

                const result = await response.json();
                const alreadyJoined =
                    Array.isArray(result) &&
                    result.some(
                        (item) => String(item._id) === String(event._id)
                    );

                setJoined(alreadyJoined);
            } catch (error) {
                console.error("Joined status error:", error);
            }
        };

        checkJoinedStatus();
    }, [event?._id, session?.user?.email, isPending]);

    const handleJoin = async () => {
        if (isPending || isJoining) return;
        if (!session?.user?.email) {
            router.push(`/login?redirect=/${id}`);
            return;
        }
        if (!event?._id) {
            toast.error("Event information not found!");
            return;
        }

        try {
            setIsJoining(true);

            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error("Please login first.");
            }

            const response = await fetch(`${API_URL}/join-events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify({
                    eventId: event._id,
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to join event");
            }

            setJoined(true);
            setVolunteerCountDelta((prev) => prev + 1);

            toast.success("You have successfully joined this event!");
            router.push("/joined-events");
        } catch (error) {
            console.error("Join event error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setIsJoining(false);
        }
    };

    const handleLeave = async () => {
        if (!session?.user?.email || !event?._id || isJoining) return;

        const confirmed = window.confirm(
            "Are you sure you want to leave this event?"
        );
        if (!confirmed) return;

        try {
            setIsJoining(true);

            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error("Please login first.");
            }

            const response = await fetch(
                `${API_URL}/leave-event/${event._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                }
            );

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to leave event");
            }

            setJoined(false);
            setVolunteerCountDelta((prev) => prev - 1);

            toast.success("You have successfully left this event!");
        } catch (error) {
            console.error("Leave event error:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong!"
            );
        } finally {
            setIsJoining(false);
        }
    };

    const handleShare = async () => {
        const shareUrl =
            typeof window !== "undefined" ? window.location.href : "";
        try {
            if (navigator.share) {
                await navigator.share({
                    title: event?.title || "Community Event",
                    text: event?.description,
                    url: shareUrl,
                });
            } else {
                await navigator.clipboard.writeText(shareUrl);
                toast.info("Event link copied to clipboard!");
            }
        } catch {
        }
    };

    const eventImage = resolveImageSrc(event?.image);
    const countdown = countdownLabel(event?.dateISO, event?.date);
    const organizer = event?.organizer?.email
        ? event.organizer
        : {
              name: event?.organizer?.name || "Event Organizer",
              email: event?.organizerEmail || "",
              image: event?.organizer?.image || "",
              verified: Boolean(event?.organizer?.verified),
          };

    if (loading || !id) {
        return (
            <main className="min-h-screen bg-[#f6f9f8] px-4 py-10 sm:px-6 lg:px-8 dark:bg-[#15171D]">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 h-5 w-36 animate-pulse rounded-full bg-slate-200 dark:bg-gray-700" />
                    <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-[#1B1E26] dark:ring-1 dark:ring-gray-600">
                        <div className="h-[330px] w-full animate-pulse bg-slate-200 sm:h-[400px] dark:bg-gray-700" />
                        <div className="space-y-6 p-6 sm:p-10">
                            <div className="h-20 w-full animate-pulse rounded-2xl bg-slate-100 dark:bg-gray-800" />
                            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                                <div className="space-y-4 lg:col-span-2">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="h-4 w-full animate-pulse rounded-full bg-slate-100 dark:bg-gray-800"/>
                                    ))}
                                </div>
                                <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-100 dark:bg-gray-800" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!event) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#f7faf9] px-5 dark:bg-[#15171D]">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                        <Image
                            src={"/images/Sociallogo.png"}
                            alt="logo"
                            height={50}
                            width={50}
                            className="h-12 w-10 object-contain"/>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Event Not Found
                    </h1>

                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        Sorry, this event does not exist.
                    </p>

                    <Link
                        href="/events"
                        className="mt-6 inline-flex rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
                        Explore Events
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f6f9f8] px-4 py-8 sm:px-6 lg:px-8 dark:bg-[#15171D]">
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/events"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-emerald-600 dark:text-gray-400">
                    <ArrowLeft size={17} />
                    Back to Events
                </Link>

                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_12px_45px_rgba(0,0,0,0.06)] dark:border-gray-600 dark:bg-[#1B1E26]">
                    <section className="relative h-[330px] sm:h-[400px] lg:h-[440px]">
                        {eventImage ? (
                            <Image
                                src={eventImage}
                                alt={event.title}
                                fill
                                priority
                                unoptimized
                                className="object-cover"
                                sizes="100vw"/>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-[#1B1E26] dark:to-[#222630]">
                                <HeartHandshake size={70} className="text-emerald-300" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                        <div className="absolute left-6 top-6 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow">
                                <HeartHandshake size={16} />
                                {event.category}
                            </span>

                            {countdown && countdown !== "Already happened" && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0ead69] px-4 py-2 text-sm font-semibold text-white shadow">
                                    <Clock size={15} />
                                    {countdown}
                                </span>
                            )}
                        </div>

                        <button
                            onClick={handleShare}
                            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 transition hover:bg-white"
                            aria-label="Share event">
                            <Share2 size={19} />
                        </button>

                        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-300">
                                Community Initiative
                            </p>

                            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                                {event.title}
                            </h1>

                            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/90 sm:text-base">
                                <span className="flex items-center gap-2">
                                    <MapPin size={19} className="text-emerald-400" />
                                    {event.location}
                                </span>

                                <span className="flex items-center gap-2">
                                    <CalendarDays size={19} className="text-emerald-400" />
                                    {formatEventDate(event.date, event.dateISO)}
                                </span>

                                {event.time && (
                                    <span className="flex items-center gap-2">
                                        <Clock size={19} className="text-emerald-400" />
                                        {event.time}
                                    </span>
                                )}
                            </div>
                        </div>
                    </section>

                    <div className="p-5 sm:p-8 lg:p-10">
                        <section className="mb-10 flex flex-col justify-between gap-5 rounded-2xl border border-emerald-100 bg-green-100 p-5 sm:flex-row sm:items-center sm:p-6 dark:border-gray-600 dark:bg-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                                    <Users size={27} />
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-300">
                                        {volunteerCount}{" "}
                                        {volunteerCount === 1 ? "Volunteer" : "Volunteers"}{" "}
                                        Joined
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        {joined
                                            ? "You are confirmed for this initiative!"
                                            : "Be part of something meaningful."}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleShare}
                                    className="hidden h-12 w-12 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:text-emerald-600 sm:flex"
                                    aria-label="Share event">
                                    <Share2 size={19} />
                                </button>

                                <button
                                    onClick={joined ? handleLeave : handleJoin}
                                    disabled={isPending || isJoining}
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white transition sm:flex-none ${
                                        joined
                                            ? "bg-gray-700 hover:bg-gray-800"
                                            : "bg-emerald-600 hover:bg-emerald-700"
                                    } disabled:cursor-not-allowed disabled:opacity-70`}>
                                    {isPending ? (
                                        "Please wait..."
                                    ) : isJoining ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            {joined ? "Leaving..." : "Joining..."}
                                        </>
                                    ) : joined ? (
                                        <>
                                            Joined (Click to Leave)
                                            <CheckCircle2 size={17} />
                                        </>
                                    ) : (
                                        <>
                                            Join as Volunteer
                                            <ArrowUpRight size={17} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </section>

                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                            <div className="space-y-9 lg:col-span-2">
                                <section>
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="h-9 w-1 rounded-full bg-emerald-500" />
                                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                            About This Social Initiative
                                        </h2>
                                    </div>

                                    <p className="text-[15px] leading-8 text-gray-500 dark:text-gray-400">
                                        {event.about || event.description}
                                    </p>
                                </section>

                                {(event.objectives ?? []).length > 0 && (
                                    <section>
                                        <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                                            Our Objectives
                                        </h2>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {event.objectives.map((objective, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50/70 p-4 dark:border-gray-600 dark:bg-gray-800">
                                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                        <Check size={15} />
                                                    </span>

                                                    <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                                        {objective}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {(event.guidelines ?? []).length > 0 && (
                                    <section>
                                        <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                                            Volunteer Guidelines
                                        </h2>

                                        <div className="space-y-4">
                                            {event.guidelines.map((guideline, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3">
                                                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                                                    <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
                                                        {guideline}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                <section className="border-t border-gray-100 pt-7 dark:border-gray-600">
                                    <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
                                        Event Location
                                    </h2>

                                    <div className="flex items-center gap-4 rounded-2xl border border-gray-100 p-5 dark:border-gray-600">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                            <MapPin size={23} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-800 dark:text-gray-300">
                                                {event.location}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {event.address || "Address will be shared with volunteers"}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <aside className="space-y-6">
                                <section className="rounded-2xl border border-gray-200 p-6 dark:border-gray-600">
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">
                                            Initiative Organizer
                                        </h3>

                                        <ShieldCheck size={20} className="text-emerald-500" />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100">
                                            {organizer.image ? (
                                                <Image
                                                    src={organizer.image}
                                                    alt={organizer.name}
                                                    fill
                                                    unoptimized
                                                    className="object-cover"/>
                                            ) : (
                                                <span className="text-lg font-bold text-emerald-600">
                                                    {(organizer.name || "E")
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h4 className="truncate font-bold text-gray-900 dark:text-gray-300">
                                                {organizer.name || "Event Organizer"}
                                            </h4>

                                            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <Mail size={12} />
                                                <span className="truncate">
                                                    {organizer.email || "Not provided"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {organizer.verified && (
                                        <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs font-medium text-emerald-600 dark:border-gray-600">
                                            <ShieldCheck size={16} />
                                            Verified Platform Member
                                        </div>
                                    )}
                                </section>

                                <section className="rounded-2xl border border-gray-200 p-6 dark:border-gray-600">
                                    <div className="mb-5 flex items-center justify-between">
                                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500">
                                            Confirmed Volunteers
                                        </h3>
                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                                            {volunteerCount}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        {(event.volunteers ?? []).length > 0 ? (
                                            event.volunteers
                                                .slice(0, 5)
                                                .map((volunteer, index) => (
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
                                                                    className="object-cover"/>
                                                            )}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-300">
                                                                {volunteer.name}
                                                            </p>

                                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                                Volunteer
                                                            </p>
                                                        </div>

                                                        <CheckCircle2
                                                            size={16}
                                                            className="ml-auto shrink-0 text-emerald-500"/>
                                                    </div>
                                                ))
                                        ) : (
                                            <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                                                No volunteers yet. Be the first to join this
                                                initiative!
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
                                        Your time and kindness can make a real difference in
                                        someone&apos;s life.
                                    </p>
                                </section>
                            </aside>
                        </div>
                    </div>
                </div>

                <div className="mt-7 flex items-center justify-between">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-emerald-600 dark:text-gray-400">
                        <ArrowLeft size={16} />
                        Explore More Events
                    </Link>

                    <Link
                        href="/"
                        className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400">
                        Social Circle
                    </Link>
                </div>
            </div>
        </main>
    );
}
