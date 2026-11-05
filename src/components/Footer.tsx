
import Link from "next/link";
import Image from "next/image";
import { MapPin, Globe, Mail, MessageSquare, Users, Radio } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#101116]">
            <div className="mx-auto max-w-7xl px-5 pt-10 pb-6 md:px-8">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.4fr_1.5fr] lg:gap-12">
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2">
                            <Image
                                src="/images/Sociallogo.png"
                                alt="Social Circle"
                                width={40}
                                height={40}
                                className="h-9 w-9 object-contain"/>
                            <span className="text-2xl font-bold text-slate-800 dark:text-white">
                                Social<span className="text-[#0ead69]">Circle</span>
                            </span>
                        </Link>
                        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Small Actions. Together, We Create Big Change.
                        </p>
                        <div className="mt-4 flex items-center gap-2">
                            {[
                                { icon: Globe, href: "#" },
                                { icon: MessageSquare, href: "#" },
                                { icon: Users, href: "#" },
                                { icon: Radio, href: "#" },
                            ].map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={social.href}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5EE] text-[#0ead69] transition-all duration-300 hover:bg-[#0ead69] hover:text-white dark:bg-[#0ead69]/10"
                                    >
                                        <Icon size={15} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold text-slate-800 dark:text-white">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5">
                            <li><Link href="/" className="text-sm text-slate-500 transition-colors hover:text-[#0ead69] dark:text-slate-400">Home</Link></li>
                            <li><Link href="/upcoming-events" className="text-sm text-slate-500 transition-colors hover:text-[#0ead69] dark:text-slate-400">Upcoming Events</Link></li>
                            <li><Link href="/#how-it-works" className="text-sm text-slate-500 transition-colors hover:text-[#0ead69] dark:text-slate-400">How It Works</Link></li>
                            <li><Link href="/#impact-stories" className="text-sm text-slate-500 transition-colors hover:text-[#0ead69] dark:text-slate-400">Impact Stories</Link></li>
                            <li><Link href="/#about" className="text-sm text-slate-500 transition-colors hover:text-[#0ead69] dark:text-slate-400">About Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-bold text-slate-800 dark:text-white">
                            Categories
                        </h3>
                        <ul className="space-y-2.5">
                            {[
                                "Tree Plantation",
                                "Winter Drive",
                                "Food Distribution",
                                "Blood Donation",
                                "Cleanups",
                                "Community Awareness",
                            ].map((category) => (
                                <li key={category}>
                                    <Link
                                        href="/upcoming-events"
                                        className="text-sm text-slate-500 transition-colors hover:text-[#0ead69] dark:text-slate-400">
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-bold text-slate-800 dark:text-white">
                            Get Involved
                        </h3>
                        <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
                            Be Part of Something Good
                        </p>
                        <a
                            href="mailto:support@socialcircle.org"
                            className="mb-3 flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-[#0ead69] dark:text-slate-400">
                            <Mail size={15} className="text-[#0ead69]" />
                            support@socialcircle.org
                        </a>
                        <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <MapPin size={15} className="text-[#0ead69]" />
                            Dhaka, Bangladesh
                        </p>
                    </div>
                </div>

                <div className="my-8 border-t border-slate-200 dark:border-white/10" />
                <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-slate-500 md:flex-row md:text-left dark:text-slate-400">
                    <p>
                        © 2026 Social Circle Platform. All rights reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <a href="#" className="transition-colors hover:text-[#0ead69]">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition-colors hover:text-[#0ead69]">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
