import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

const events = [
    {
        id: 1,
        galleryLabel: "Warmth for Rickshaw Pullers",
        title: "Winter Clothes Drive",
        location: "Mirpur 10, Dhaka",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=85",
        href: "/events/1",
    },
    {
        id: 2,
        galleryLabel: "Shelterless Night Support",
        title: "Night Blanket Relief",
        location: "Mohammadpur, Dhaka",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=85",
        href: "/events/2",
    },
    {
        id: 3,
        galleryLabel: "Eco Plastic-Free Waters",
        title: "Dhanmondi Lake Clean-up",
        location: "Dhanmondi, Dhaka",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=85",
        href: "/events/3",
    },
    {
        id: 4,
        galleryLabel: "1000 Green Saplings",
        title: "Urban Tree Plantation",
        location: "Uttara, Dhaka",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=85",
        href: "/events/4",
    },
    {
        id: 5,
        galleryLabel: "Fresh Meals Sharing",
        title: "Community Food Relief",
        location: "Old Dhaka",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=85",
        href: "/events/5",
    },
    {
        id: 6,
        galleryLabel: "Education for Underprivileged",
        title: "Children Book & Bag Drive",
        location: "Rayerbazar, Dhaka",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=85",
        href: "/events/6",
    },
];

export default function CommunityGallery() {
    return (
        <section className="bg-[#F8FAFC] py-16 md:py-16">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="mb-10 text-center">
                    <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#0ead69]">
                        Visual Stories
                    </p>
                    <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                        Community in Action
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                        Moments from volunteer drives, relief distributions,
                        and green initiatives across Dhaka and beyond.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Link
                            key={event.id}
                            href={event.href}
                            className="group relative block h-[240px] overflow-hidden rounded-2xl bg-slate-200 md:h-[290px]">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                            
                            <div className="absolute bottom-0 left-0 w-full p-4">
                                <span className="mb-1 inline-block rounded-md bg-[#0ead69] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
                                    {event.galleryLabel}
                                </span>
                                <h3 className="text-base font-bold leading-tight text-white">
                                    {event.title}
                                </h3>
                                <div className="mt-1 flex items-center gap-1 text-xs text-white/85">
                                    <MapPin className="h-3.5 w-3.5 text-[#0ead69]" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
