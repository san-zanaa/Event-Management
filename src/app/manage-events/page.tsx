
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Users, Pencil, Trash2, Plus, Loader2, AlertCircle, Clock, PartyPopper } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Event = {
    _id: string;
    title: string;
    category: string;
    date: string;
    dateISO?: string;
    time: string;
    location: string;
    image: string;
    description: string;
    volunteerCount?: number;
    organizerEmail: string;
};

type EventForm = {
    title: string;
    category: string;
    date: string;
    time: string;
    location: string;
    image: string;
    description: string;
};

const initialForm: EventForm = {
    title: "",
    category: "Food Drive",
    date: "",
    time: "",
    location: "",
    image: "",
    description: "",
};

export default function ManageEventsPage() {
    const { data: session, isPending } = authClient.useSession();

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [form, setForm] = useState<EventForm>(initialForm);

    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const userEmail = session?.user?.email;
    const currentDate = new Date();
    const minDate = [
        currentDate.getFullYear(),
        String(currentDate.getMonth() + 1).padStart(2, "0"),
        String(currentDate.getDate()).padStart(2, "0"),
    ].join("-");

    useEffect(() => {
        if (isPending) return;

        if (!userEmail) {
            setLoading(false);
            return;
        }

        const fetchMyEvents = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `http://localhost:5000/my-events/${encodeURIComponent(userEmail)}`,
                    { cache: "no-store" }
                );

                if (!response.ok) {
                    throw new Error("Failed to load your events.");
                }
                const data = await response.json();
                setEvents(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Something went wrong."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, [userEmail, isPending]);

    const handleEdit = (event: Event) => {
        setEditingEvent(event);

        setForm({
            title: event.title || "",
            category: event.category || "Food Drive",
            date: event.dateISO || event.date || "",
            time: event.time || "",
            location: event.location || "",
            image: event.image || "",
            description: event.description || "",
        });
    };

    const closeEditForm = () => {
        if (saving) return;
        setEditingEvent(null);
        setForm(initialForm);
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!editingEvent || !userEmail) return;
        if (!form.date || form.date < minDate) {
            alert("Please select today or a future date.");
            return;
        }

        try {
            setSaving(true);
            const response = await fetch(
                `http://localhost:5000/update-event/${editingEvent._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...form,
                        dateISO: form.date,
                        organizerEmail: userEmail,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update event.");
            }

            setEvents((previousEvents) =>
                previousEvents.map((event) =>
                    event._id === editingEvent._id
                        ? {
                            ...event,
                            ...form,
                            date: form.date,
                            dateISO: form.date,
                        }
                        : event
                )
            );

            setEditingEvent(null);
            setForm(initialForm);

            alert("Event updated successfully!");
        } catch (err) {
            alert(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (eventId: string) => {
        if (!userEmail) return;

        const confirmed = window.confirm(
            "Are you sure you want to delete this event? This action cannot be undone."
        );

        if (!confirmed) return;
        try {
            setDeletingId(eventId);

            const response = await fetch(
                `http://localhost:5000/delete-event/${eventId}?email=${encodeURIComponent(userEmail)}`,
                {
                    method: "DELETE",
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete event.");
            }
            setEvents((previousEvents) =>
                previousEvents.filter((event) => event._id !== eventId)
            );

            alert("Event deleted successfully!");
        } catch (err) {
            alert(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            setDeletingId(null);
        }
    };

    if (isPending || loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <Loader2 className="h-9 w-9 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (!userEmail) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
                <AlertCircle className="mb-4 h-12 w-12 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                    Please log in first
                </h2>
                <p className="mt-2 text-gray-500">
                    You need to log in to manage your events.
                </p>
                <Link
                    href="/login"
                    className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7faf8] px-4 py-10 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <section className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                            <PartyPopper size={15} />
                            Your Dashboard
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Manage Events
                        </h1>
                        <p className="mt-3 max-w-xl leading-7 text-gray-500">
                            Keep track of your community events. Update event details,
                            manage volunteers, and make a difference in your community.
                        </p>
                    </div>

                    <Link
                        href="/create-event"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700">
                        <Plus size={19} />
                        Create New Event
                    </Link>
                </section>

                <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Total Events Created
                            </p>
                            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                                <CalendarDays size={22} />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                            {events.length}
                        </h2>
                        <p className="mt-1 text-xs text-gray-400">
                            Events organized by you
                        </p>
                    </div>
                    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Total Volunteers
                            </p>
                            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                <Users size={22} />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                            {events.reduce(
                                (total, event) => total + (event.volunteerCount || 0),
                                0
                            )}
                        </h2>
                        <p className="mt-1 text-xs text-gray-400">
                            People joined your events
                        </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">
                                Your Account
                            </p>
                            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                                <Users size={22} />
                            </div>
                        </div>
                        <p className="mt-4 truncate text-base font-bold text-gray-800">
                            {userEmail}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            Logged in account
                        </p>
                    </div>

                </section>

                <Dialog
                    open={!!editingEvent}
                    onOpenChange={(open) => {
                        if (!open) closeEditForm();
                    }}>
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-gray-900">
                                Edit Event Details
                            </DialogTitle>

                            <DialogDescription>
                                Update your event information below. Make sure all details
                                are correct before saving.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleUpdate} className="space-y-5">

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="event-title">Event Title</Label>
                                    <Input
                                        id="event-title"
                                        required
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({ ...form, title: e.target.value })
                                        }
                                        placeholder="Enter event title"/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="event-category">Category</Label>
                                    <select
                                        id="event-category"
                                        value={form.category}
                                        onChange={(e) =>
                                            setForm({ ...form, category: e.target.value })
                                        }
                                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20">
                                        <option>Food Drive</option>
                                        <option>Clothes Drive</option>
                                        <option>Education</option>
                                        <option>Environment</option>
                                        <option>Community Service</option>
                                        <option>Health</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="event-date">Event Date</Label>
                                    <Input
                                        id="event-date"
                                        type="date"
                                        required
                                        min={minDate}
                                        value={form.date}
                                        onChange={(e) =>
                                            setForm({ ...form, date: e.target.value })
                                        }/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="event-time">Event Time</Label>
                                    <Input
                                        id="event-time"
                                        type="time"
                                        required
                                        value={form.time}
                                        onChange={(e) =>
                                            setForm({ ...form, time: e.target.value })
                                        }/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="event-location">Location</Label>
                                    <Input
                                        id="event-location"
                                        required
                                        value={form.location}
                                        onChange={(e) =>
                                            setForm({ ...form, location: e.target.value })
                                        }
                                        placeholder="Enter event location"/>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="event-image">Image URL</Label>
                                    <Input
                                        id="event-image"
                                        type="url"
                                        required
                                        value={form.image}
                                        onChange={(e) =>
                                            setForm({ ...form, image: e.target.value })
                                        }
                                        placeholder="https://example.com/image.jpg"/>
                                </div>

                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="event-description">Description</Label>
                                <textarea
                                    id="event-description"
                                    required
                                    rows={4}
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                    placeholder="Describe your event..."
                                    className="w-full resize-y rounded-md border border-input bg-background px-3 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus-visible:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500/20"/>
                            </div>

                            <DialogFooter className="gap-2 pt-2">
                                <DialogClose
                                    render={
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled={saving}>
                                            Cancel
                                        </Button>
                                    }/>

                                <Button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-emerald-600 text-white hover:bg-emerald-700">
                                    {saving ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </DialogFooter>

                        </form>
                    </DialogContent>
                </Dialog>

                <section>
                    <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Events Created by You
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                View and manage all your published events.
                            </p>
                        </div>
                        <span className="w-fit rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                            {events.length} Events
                        </span>
                    </div>

                    {error ? (
                        <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-red-600">
                            {error}
                        </div>
                    ) : events.length === 0 ? (

                        <div className="rounded-3xl border border-dashed border-emerald-200 bg-white px-5 py-20 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <CalendarDays size={32} />
                            </div>
                            <h3 className="mt-5 text-xl font-bold text-gray-900">
                                No Events Created Yet
                            </h3>
                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                You haven't created any events yet. Start making a difference
                                in your community by creating your first event.
                            </p>
                            <Link
                                href="/create-event"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
                                <Plus size={18} />
                                Create Your First Event
                            </Link>
                        </div>

                    ) : (


                        <div className="space-y-5">
                            {events.map((event) => (
                                <article
                                    key={event._id}
                                    className="group overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-emerald-100 hover:shadow-lg sm:p-5">
                                    <div className="flex flex-col gap-5 sm:flex-row">
                                        <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-2xl bg-emerald-50 sm:h-48 sm:w-64">
                                            {event.image ? (
                                                <Image
                                                    src={event.image}
                                                    alt={event.title}
                                                    fill
                                                    unoptimized
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"/>
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-emerald-400">
                                                    <CalendarDays size={45} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex min-w-0 flex-1 flex-col justify-between">

                                            <div>
                                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                                                        {event.category}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                                                        Created by You
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-extrabold leading-snug text-gray-900 transition-colors group-hover:text-emerald-700 sm:text-2xl">
                                                    {event.title}
                                                </h3>
                                                <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-gray-600 sm:text-base">
                                                    <p className="flex items-center gap-2">
                                                        <CalendarDays size={19} className="shrink-0 text-emerald-600" />
                                                        {event.dateISO || event.date}
                                                    </p>
                                                    <p className="flex items-center gap-2">
                                                        <Clock size={19} className="shrink-0 text-emerald-600" />
                                                        {event.time || "Time not specified"}
                                                    </p>
                                                </div>
                                                <p className="mt-4 flex items-center gap-2 text-sm text-gray-600 sm:text-base">
                                                    <MapPin size={19} className="shrink-0 text-emerald-600" />
                                                    <span className="line-clamp-1">{event.location}</span>
                                                </p>
                                            </div>
                                            <div className="mt-5 flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Users size={21} className="text-emerald-600" />
                                                    <span className="text-base">
                                                        <strong className="font-bold text-gray-900">
                                                            {event.volunteerCount || 0}
                                                        </strong>{" "}
                                                        Volunteers Joined
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-3">
                                                    <Button
                                                        type="button"
                                                        onClick={() => handleEdit(event)}
                                                        className="flex-1 gap-2 rounded-xl bg-emerald-600 px-5 text-white hover:bg-emerald-700 sm:flex-none">
                                                        <Pencil size={16} />
                                                        Edit Event
                                                    </Button>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => handleDelete(event._id)}
                                                        disabled={deletingId === event._id}
                                                        className="flex-1 gap-2 rounded-xl border-red-200 px-5 text-red-600 hover:bg-red-50 hover:text-red-700 sm:flex-none">
                                                        {deletingId === event._id ? (
                                                            <Loader2 size={16} className="animate-spin" />
                                                        ) : (
                                                            <Trash2 size={16} />
                                                        )}

                                                        {deletingId === event._id ? "Deleting..." : "Delete"}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
