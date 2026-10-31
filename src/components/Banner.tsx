
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/images/banner.png"
                    alt="Social event gathering"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"/>
            </div>

            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/50" />
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 py-24">
                <div className="flex items-center gap-3 rounded-full border border-white/30 bg-white/15 backdrop-blur-md px-5 py-2.5 mb-8">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0ead69]" />
                    <p className="text-sm text-white">
                        Your community, your moments, your events.
                    </p>
                </div>

                <h1 className="max-w-5xl text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                    Gather Together.
                    <br />
                    <span className="text-lime-400">
                        Make Moments Matter.
                    </span>
                </h1>

                <p className="max-w-2xl mt-6 text-base md:text-lg text-white/90 leading-relaxed">
                    Discover exciting events, connect with amazing people,
                    and create unforgettable experiences. Whether you're
                    joining a gathering or hosting your own, every great
                    moment starts here.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-9">

                    <Link
                        href="#events"
                        className="bg-[#0ead69] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#81e4b9] transition duration-300"
                    >
                        Explore Upcoming Events →
                    </Link>

                    <Link
                        href="/create-event"
                        className="bg-white/15 border border-white/50 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-black transition duration-300"
                    >
                        + Create an Event
                    </Link>

                </div>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-5 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 rounded-3xl border border-white/20 bg-white/15 backdrop-blur-xl px-5 py-6 text-center text-white">
                    <div>
                        <h3 className="text-3xl md:text-4xl font-semibold">1450+</h3>
                        <p className="text-sm mt-2 text-white/80">Active Volunteers</p>
                    </div>

                    <div>
                        <h3 className="text-3xl md:text-4xl font-semibold">180+</h3>
                        <p className="text-sm mt-2 text-white/80">Events Completed</p>
                    </div>

                    <div>
                        <h3 className="text-3xl md:text-4xl font-semibold">24000+</h3>
                        <p className="text-sm mt-2 text-white/80">Life Impacted</p>
                    </div>

                    <div>
                        <h3 className="text-3xl md:text-4xl font-semibold">100%</h3>
                        <p className="text-sm mt-2 text-white/80">Community Driven</p>
                    </div>
                </div>
            </div>

        </section>
    );
}
