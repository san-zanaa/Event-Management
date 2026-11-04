
import Link from "next/link";
import { CalendarDays, Sparkles, MapPin, Globe, Heart } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer>

            <div className="mx-auto max-w-7xl px-5 pt-14 pb-8 md:px-8 border-t dark:bg-[#101116]">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                    <div>
                        <div className='flex gap-1'>
                            <Image src={'/images/Sociallogo.png'} alt='logo' height={40} width={40} className='w-7 h-9 object-contain' />
                            <div className='flex flex-col items-center sm:items-start'>
                                <h1 className='font-bold text-2xl'>Social<span className='text-[#0ead69]'>Circle</span></h1>
                            </div>
                        </div>
                        <p className="max-w-xs text-sm leading-6 text-slate-500">
                            A community-driven event management platform
                            empowering everyday citizens to create, join
                            and track impactful social development drives.
                        </p>
                        <div className="mt-5 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={18} className="text-[#0ead69]" />
                            <span>Dhaka, Bangladesh - Nationwide Impact</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-slate-800">
                            Explore Platform
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/upcoming-events" className="inline-flex items-center gap-2 text-sm hover:text-[#0ead69] transition-colors">
                                    <CalendarDays size={15} className="text-[#0ead69]" />
                                    Upcoming Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/create-event" className="inline-flex items-center gap-2 text-sm hover:text-[#0ead69] transition-colors">
                                    <Sparkles size={15} className="text-[#0ead69]" />
                                    Create an Event
                                </Link>
                            </li>
                            <li>
                                <Link href="/my-events" className="text-sm hover:text-[#0ead69] transition-colors">
                                    Manage My Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/joined-events" className="text-sm hover:text-[#0ead69] transition-colors">
                                    My Joined Events
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-slate-800">
                            Active Causes
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0ead69] shrink-0" />
                                Winter Clothes & Blanket Relief
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0ead69] shrink-0" />
                                City Clean-up & Waste Segregation
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0ead69] shrink-0" />
                                Urban Tree Plantation Drives
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0ead69] shrink-0" />
                                Underprivileged Meal Sharing
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0ead69] shrink-0" />
                                Free Medical & Health Camps
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 text-sm font-bold uppercase tracking-wide text-slate-800">
                            Community Spirit
                        </h3>
                        <p className="text-sm leading-6 text-slate-500">
                            Every small action counts. Connect with local
                            volunteers, turn compassion into direct community
                            aid, and be the change your city needs.
                        </p>
                        <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#E8F5F1] px-3 py-2 text-xs font-semibold text-[#0ead69]">
                            <Globe size={14} />
                            100% Volunteer Driven
                        </div>
                    </div>
                </div>

                <div className="my-9 border-t border-slate-200" />
                <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-slate-500 md:flex-row md:text-left">
                    <p>
                        © SocialCircle.
                        Built with care for community service and social development.
                    </p>
                    <p className="inline-flex items-center gap-1.5">
                        Made with
                        <Heart size={14} className="fill-[#0ead69] text-[#0ead69] " />
                        for a better tomorrow
                    </p>
                </div>
            </div>

        </footer>
    );
}
