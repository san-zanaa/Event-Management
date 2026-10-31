
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, UserRound, ArrowRight, Tag, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const events = [
    {
        id: 1,
        category: "Food Drive",
        title: "Community Food Distribution",
        date: "Sat, Nov 7, 2026",
        location: "Dhanmondi, Dhaka",
        description:
            "Join us in distributing essential food supplies to underprivileged families in our community.",
        organizer: "Helping Hands Foundation",
        image:
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=85",
        color: "bg-teal-100 text-teal-700",
        href: "/events/1",
    },
    {
        id: 2,
        category: "Donation",
        title: "Winter Clothes Distribution",
        date: "Sun, Nov 15, 2026",
        location: "Mirpur 10, Dhaka",
        description:
            "Collecting and distributing warm clothes, jackets, sweaters, and shawls to underprivileged families.",
        organizer: "Mirpur Youth Volunteers",
        image:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=85",
        color: "bg-rose-100 text-rose-600",
        href: "/events/2",
    },
    {
        id: 3,
        category: "Donation",
        title: "Blanket Distribution for the Needy",
        date: "Fri, Nov 20, 2026",
        location: "Mohammadpur, Dhaka",
        description:
            "Night-time blanket distribution drive across pavement dwellers, orphanages, and senior citizens.",
        organizer: "Mohammadpur Care Circle",
        image:
            "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=85",
        color: "bg-rose-100 text-rose-600",
        href: "/events/3",
    },
    {
        id: 4,
        category: "Cleanup",
        title: "Clean Our City Campaign",
        date: "Sat, Nov 22, 2026",
        location: "Hatirjheel, Dhaka",
        description:
            "Be part of our community cleanup campaign to create a cleaner and greener environment.",
        organizer: "Green Bangladesh",
        image:
            "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=85",
        color: "bg-cyan-100 text-cyan-700",
        href: "/events/4",
    },
    {
        id: 5,
        category: "Plantation",
        title: "Plant a Tree, Save the Earth",
        date: "Mon, Nov 24, 2026",
        location: "Uttara, Dhaka",
        description:
            "Join our tree plantation initiative and help make our city greener and healthier.",
        organizer: "Nature Lovers BD",
        image:
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85",
        color: "bg-green-100 text-green-700",
        href: "/events/5",
    },
    {
        id: 6,
        category: "Health Camp",
        title: "Free Community Health Camp",
        date: "Thu, Nov 27, 2026",
        location: "Banani, Dhaka",
        description:
            "Free health checkups, basic medical consultations, and health awareness for everyone.",
        organizer: "Care For All Foundation",
        image:
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85",
        color: "bg-blue-100 text-blue-700",
        href: "/events/6",
    },
];

export default function UpcomingEvents() {
    return (
        <section className="w-full bg-slate-50 py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <div className="mb-3 flex items-center gap-2">
                            <Flame className="h-4 w-4 fill-orange-400 text-orange-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[#0ead69]">
                                Upcoming Initiatives
                            </span>
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                            Recent Upcoming Events
                        </h2>

                        <p className="mt-3 text-sm text-slate-500 md:text-base">
                            Latest 6 community drives scheduled in your city.
                            Get involved today.
                        </p>
                    </div>

                    <Link
                        href="/events"
                        className="group flex items-center gap-2 text-sm font-semibold text-[#0ead69] transition hover:text-[#07c573]"
                    >
                        View All Events
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Card
                            key={event.id}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="relative h-60 w-full overflow-hidden">
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <Badge
                                    className={`absolute left-4 top-4 gap-1 rounded-full border-0 px-3 py-1.5 text-xs font-semibold shadow-sm ${event.color}`}
                                >
                                    <Tag className="h-3 w-3" />
                                    {event.category}
                                </Badge>
                                <div className="absolute bottom-2 left-3 flex items-center gap-2 rounded-lg bg-slate-950/85 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">
                                    <CalendarDays className="h-4 w-4 text-[#0ead69]" />
                                    {event.date}
                                </div>
                            </div>

                            <CardContent className="flex min-h-[240px] flex-col p-5">
                                <div className="flex-1">
                                    <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-[#07c573]">
                                        {event.title}
                                    </h3>
                                    <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                                        <MapPin className="h-4 w-4 shrink-0 text-[#0ead69]" />
                                        <span>{event.location}</span>
                                    </div>
                                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                                        {event.description}
                                    </p>
                                </div>

                                <div className="my-2 border-t border-slate-100 pt-4">
                                    <div className="flex items-center gap-1 text-sm text-slate-500">
                                        <UserRound className="h-4 w-4 text-[#0ead69]" />
                                        <span className="line-clamp-1">
                                            {event.organizer}
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href={event.href}
                                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0ead69] font-semibold text-white transition-colors hover:bg-[#07c573]"
                                >
                                    View Event
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))}

                </div>
            </div>
        </section>
    );
}
