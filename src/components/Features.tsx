import { Users, CalendarCheck, ShieldCheck, Compass} from "lucide-react";

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
        <section className="bg-[#F5F7F2] py-20 md:py-24 px-5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-xl mx-auto mb-14">
                    <span className="text-sm font-semibold tracking-[0.2em] text-[#0ead69] uppercase">
                        Why Choose Us
                    </span>
                    <h2 className="text-3xl md:text-2xl lg:text-3xl font-bold text-[#17251C] mt-2 leading-tight">
                        Bring People Together
                    </h2>
                    <p className="text-[#68756C] mt-1 text-base md:text-sm leading-relaxed">
                        Discover a simpler way to explore events,
                        connect with people, and create unforgettable
                        experiences in your community.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="group bg-white border border-[#E5EAE3] rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 items-center">
                                <div className="w-12 h-12 rounded-xl bg-[#EAF2EA] flex items-center justify-center mb-6">
                                    <Icon
                                        size={24}
                                        className="text-[#0ead69]"
                                        strokeWidth={1.8}/>
                                </div>
                                <h3 className="text-lg font-semibold text-[#17251C] mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-[#68756C] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
