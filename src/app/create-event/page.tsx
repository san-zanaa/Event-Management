"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CalendarDays, MapPin, Image as ImageIcon, Tag, Type, Sparkles, PlusCircle } from "lucide-react";

const photoPresets = [
    {
        name: "Winter Clothes",
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=85",
    },
    {
        name: "Blanket Relief",
        url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=85",
    },
    {
        name: "Cleanup",
        url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=85",
    },
    {
        name: "Tree Plantation",
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85",
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

interface CreateEventPageProps {
    organizerEmail?: string;
}

export default function CreateEventPage({
    organizerEmail = "",
}: CreateEventPageProps) {
    const [imageUrl, setImageUrl] = useState("");
    const [eventType, setEventType] = useState("Donation");

    const [form, setForm] = useState(initialForm);
    const update = (field: keyof typeof form, value: string) =>
        setForm((current) => ({ ...current, [field]: value }))

    const today = new Date();
    const minDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        const eventData = {
            title: formData.get("title"),
            category: eventType,
            date: formData.get("date"),
            location: formData.get("location"),
            image: formData.get("image"),
            description: formData.get("description"),
            organizerEmail: organizerEmail,
        };
        try {
            const res = await fetch("http://localhost:5000/create-event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventData),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Failed to create event");
            }
            console.log("New Event:", data);
            alert("Event created successfully!");
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f7f9fb] px-4 py-5 md:px-8 md:py-8">
            <div className="mx-auto max-w-[720px]">
                <Link
                    href="/upcoming-events"
                    className="mb-7 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-[#0ead69]">
                    <ArrowLeft size={15} />
                    Back to Upcoming Events
                </Link>

                <Card className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
                    <CardContent className="p-5 sm:p-7 md:p-10">
                        <div className="mb-9">
                            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#eaf8f5] px-3 py-1 text-xs font-semibold text-[#0ead69]">
                                <Sparkles size={13} />
                                Social Service Drive
                            </div>

                            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                                Create a Community Event
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Organize a local relief effort, environmental cleanup or community support drive.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <FieldGroup className="gap-6">
                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="title"
                                        className="text-xs font-semibold text-slate-800">
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
                                            placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                                            required
                                            className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm shadow-sm focus-visible:border-[#0ead69] focus-visible:ring-[#0ead69]" />
                                    </div>
                                </Field>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Field className="gap-1.5">
                                        <FieldLabel
                                            htmlFor="eventType"
                                            className="text-xs font-semibold text-slate-800">
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
                                                className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-[#0ead69] focus:ring-2 focus:ring-[#0ead69]/20">
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
                                            className="text-xs font-semibold text-slate-800">
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
                                                min={minDate}
                                                required
                                                className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm shadow-sm focus-visible:border-[#0ead69] focus-visible:ring-[#0ead69]" />
                                        </div>
                                        <FieldDescription className="text-[10px] text-slate-400">
                                            Dates must be in the future (today or later)
                                        </FieldDescription>
                                    </Field>
                                </div>

                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="location"
                                        className="text-xs font-semibold text-slate-800">
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
                                            placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                                            required
                                            className="h-11 rounded-xl border-slate-200 bg-slate-50 pl-10 text-sm shadow-sm focus-visible:border-[#0ead69] focus-visible:ring-[#0ead69]" />
                                    </div>
                                </Field>

                                <Field className="gap-1.5">
                                    <FieldLabel
                                        htmlFor="image"
                                        className="text-xs font-semibold text-slate-800">
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
                                        className="text-xs font-semibold text-slate-800">
                                        Event Description <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        required
                                        placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                                        className="min-h-[125px] resize-y rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 shadow-sm focus-visible:border-[#0ead69] focus-visible:ring-[#0ead69]" />
                                </Field>

                                <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="text-xs text-slate-500">
                                        Organizer Email attached:
                                    </span>
                                    <span className="break-all text-xs font-semibold text-slate-800">
                                        {organizerEmail || "Login to attach your email"}
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

