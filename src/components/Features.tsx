import { Users, CalendarCheck, ShieldCheck, Compass } from "lucide-react";
import Reveal from "./Reveal";

const features = [
    {
        icon: Users,
        title: "Discover All Community",
        description:
            "Find like-minded people, explore shared interests, and build meaningful connections through exciting community events.",
    },
    {
        icon: CalendarCheck,
        title: "Easy Event Participation",
        description:
            "Explore upcoming events and join your favorite gatherings with just a few clicks. Your next experience is waiting.",
    },
    {
        icon: ShieldCheck,
        title: "Seamless Management",
        description:
            "Create, organize, update, and manage your events effortlessly with simple and powerful event management tools.",
    },
    {
        icon: Compass,
        title: "Explore New Experiences",
        description:
            "Discover exciting activities, local gatherings, and unique experiences that make every moment memorable.",
    },
];

export default function Features() {
    return (
        <section id="how-it-works" className="scroll-mt-24 bg-[#F5F7F2] px-5 py-20 md:py-24 dark:bg-[#1B1E26]">
            <div className="mx-auto max-w-7xl">
                <Reveal variant="up" className="mx-auto mb-14 max-w-xl text-center">
                    <span className="text-sm font-semibold tracking-[0.2em] text-[#0ead69] uppercase">
                        Why Choose Us
                    </span>
                    <h2 className="mt-2 text-2xl font-bold leading-tight text-[#17251C] sm:text-3xl dark:text-gray-300">
                        Bring People Together
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#68756C] md:text-base dark:text-gray-400">
                        Discover a simpler way to explore events,
                        connect with people, and create unforgettable
                        experiences in your community.
                    </p>
                </Reveal>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <Reveal
                                key={feature.title}
                                variant="up"
                                delay={index * 120}
                                duration={700}>
                                <div className="group relative h-full overflow-hidden rounded-2xl border border-[#E5EAE3] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0ead69]/30 hover:shadow-xl dark:border-gray-500 dark:bg-[#353841] dark:hover:border-[#0ead69]/50">
                                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#0ead69]/0 blur-2xl transition-all duration-500 group-hover:bg-[#0ead69]/15" />

                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF2EA] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0ead69] dark:bg-[#0ead69]/15">
                                        <Icon
                                            size={24}
                                            className="text-[#0ead69] transition-colors duration-300 group-hover:text-white"
                                            strokeWidth={1.8}/>
                                    </div>
                                    <h3 className="mb-3 text-lg font-semibold text-[#17251C] dark:text-gray-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-[#68756C] dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
