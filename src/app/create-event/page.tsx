"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CalendarDays, MapPin, Image as ImageIcon, Tag, Type, Sparkles, PlusCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const photoPresets = [
    {
        name: "Winter Clothes",
        url: "http://localhost:5000/uploads/winter-clothes.jpg",
    },
    {
        name: "Blanket Relief",
        url: "http://localhost:5000/uploads/blanket-relief.jpg",
    },
    {
        name: "Cleanup",
        url: "http://localhost:5000/uploads/cleanup.jpg",
    },
    {
        name: "Tree Plantation",
        url: "http://localhost:5000/uploads/tree-plantation.jpg",
    },
];

const initialForm = {
    title: "",
    date: "",
    location: "",
    description: "",
};

const eventTypes = [
    "Food Drive",
    "Donation",
    "Cleanup",
    "Plantation",
    "Health Camp",
    "Education",
    "Blood Donation",
    "Animal Welfare",
    "Other",
];


export default function CreateEventPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const userEmail = session?.user?.email;
    const [imageUrl, setImageUrl] = useState("");
    const [eventType, setEventType] = useState("Donation");

    const [form, setForm] = useState(initialForm);
    const update = (field: keyof typeof form, value: string) =>
        setForm((current) => ({ ...current, [field]: value }))

    const [minDate, setMinDate] = useState("");
    useEffect(() => {
        startTransition(() => {
            const today = new Date();
            setMinDate([
                today.getFullYear(),
                String(today.getMonth() + 1).padStart(2, "0"),
                String(today.getDate()).padStart(2, "0"),
            ].join("-"));
        });
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { data, error } = await authClient.token();

            console.log("JWT Token:", data?.token);
            console.log("JWT Error:", error);

            if (error || !data?.token) {
                throw new Error("JWT token not found. Please login again.");
            }

            const eventData = {
                ...form,
                category: eventType,
                image: imageUrl,
            };

            const res = await fetch("http://localhost:5000/create-event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                },
                body: JSON.stringify(eventData),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to create event");
            }

            alert("Event created successfully!");
            setForm(initialForm);
            setImageUrl("");
            setEventType("Donation");
            router.push("/upcoming-events");

        } catch (error) {
            console.error("Error creating event:", error);
            alert(error instanceof Error ? error.message : "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f7f9fb] dark:bg-[#15171D] px-4 py-5 md:px-8 md:py-8">
            <div className="mx-auto max-w-[720px]">
                <Link
                    href="/upcoming-events"
                    className="mb-7 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#0ead69] dark:text-gray-300">
                    <ArrowLeft size={15} />
                    Back to Upcoming Events
                </Link>

                <Card className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.05)] dark:bg-[#1B1E26]">
                    <CardContent className="p-5 sm:p-7 md:p-10 dark:bg-[#1B1E26]">
                        <div className="mb-9">
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eaf8f5] px-3 py-1 text-xs font-semibold text-[#0ead69]">
                                <Sparkles size={13} />
                                Social Service Drive
                            </div>

                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                                Create a Community Event
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-gray-400">
                                Organize a local relief effort, environmental cleanup or community support drive.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <FieldGroup className="gap-6">
                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="title"
                                        className="text-xs font-semibold text-slate-500 ">
                                        Event Title <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <div className="relative">
                                        <Type
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={form.title}
                                            onChange={(e) => update("title", e.target.value)}
                                            placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                                            required
                                            className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm shadow-sm focus-visible:border-[#0ead69] focus-visible:ring-[#0ead69]" />
                                    </div>
                                </Field>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Field className="gap-1.5">
                                        <FieldLabel
                                            htmlFor="eventType"
                                            className="text-xs font-semibold text-slate-500">
                                            Event Type <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <div className="relative">
                                            <Tag
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                            <select
                                                id="eventType"
                                                value={eventType}
                                                onChange={(e) => setEventType(e.target.value)}
                                                required
                                                className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm 5 shadow-sm outline-none transition focus:border-[#0ead69] focus:ring-2 focus:ring-[#0ead69]/20 dark:bg-[#1B1E26] text-slate-400">
                                                {eventTypes.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </Field>

                                    <Field className="gap-1.5">
                                        <FieldLabel
                                            htmlFor="date"
                                            className="text-xs font-semibold 5 text-slate-500">
                                            Event Date <span className="text-red-500">*</span>
                                        </FieldLabel>
                                        <div className="relative">
                                            <CalendarDays
                                                size={16}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                            <Input
                                                id="date"
                                                name="date"
                                                type="date"
                                                value={form.date}
                                                onChange={(e) => update("date", e.target.value)}
                                                min={minDate}
                                                required
                                                className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm shadow-sm text-slate-400 focus-visible:border-[#0ead69] focus-visible:ring-[#0ead69]" />
                                        </div>
                                        <FieldDescription className="text-[10px] text-slate-400">
                                            Dates must be in the future (today or later)
                                        </FieldDescription>
                                    </Field>
                                </div>

                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="location"
                                        className="text-xs font-semibold 5 text-slate-500">
                                        Location / Venue <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <div className="relative">
                                        <MapPin
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            id="location"
                                            name="location"
                                            type="text"
                                            value={form.location}
                                            onChange={(e) => update("location", e.target.value)}
                                            placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                                            required
                                            className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm shadow-sm focus-visible:border-[#0ead69] focus-visible:ring-[#0ead69]" />
                                    </div>
                                </Field>

                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="image"
                                        className="text-xs font-semibold 5 text-slate-500">
                                        Thumbnail Image URL <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <div className="relative">
                                        <ImageIcon
                                            size={16}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            id="image"
                                            name="image"
                                            type="url"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            placeholder="https://images.unsplash.com/photo-..."
                                            required
                                            className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm shadow-sm focus-visible:border-[#0ead69] focus-visible:ring-[#0ead69]" />
                                    </div>
                                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-2">
                                        <span className="text-[10px] text-slate-500">
                                            Quick photo presets:
                                        </span>
                                        {photoPresets.map((photo, index) => (
                                            <span key={photo.name} className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setImageUrl(photo.url)}
                                                    className="cursor-pointer text-[10px] font-medium text-[#0ead69] transition hover:text-[#07c573] hover:underline">
                                                    {photo.name}
                                                </button>
                                                {index !== photoPresets.length - 1 && (
                                                    <span className="text-slate-300">•</span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                </Field>

                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="description"
                                        className="text-xs font-semibold 5 text-slate-500">
                                        Event Description <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={form.description}
                                        onChange={(e) => update("description", e.target.value)}
                                        required
                                        placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                                        className="min-h-[125px] resize-y rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 shadow-sm focus-visible:border-[#0ead69] focus-visible:ring-[#0ead69]"
                                    />
                                </Field>

                                <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between dark:bg-[#1B1E26]">
                                    <span className="text-xs text-slate-400">
                                        Organizer Email attached:
                                    </span>
                                    <span className="break-all text-xs font-semibold 5 text-slate-400">
                                        {userEmail || "Login to attach your email"}
                                    </span>
                                </div>
                                <Button
                                    type="submit"
                                    className="h-12 w-full cursor-pointer rounded-xl bg-[#0ead69] text-sm font-bold text-white shadow-sm transition hover:bg-[#07c573]">
                                    <PlusCircle size={17} />
                                    Publish Event
                                </Button>
                            </FieldGroup>

                        </form>

                    </CardContent>
                </Card>

            </div>
        </div>
    );
}

