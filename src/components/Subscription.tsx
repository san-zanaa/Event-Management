
"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function Newsletter() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;
        console.log("Subscribed email:", email);

        setEmail("");
    };

    return (
        <section className="bg-[#F8FAFC] px-5 py-16 md:py-16">
            <div className="mx-auto max-w-4xl">
                <div className="relative overflow-hidden rounded-3xl border border-white bg-gradient-to-br from-[#0dce7a] via-white to-[#E6F3ED] px-6 py-12 text-center shadow-[0_8px_30px_rgba(23,74,53,0.05)] backdrop-blur-xl md:px-12 md:py-16">
                    <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#80C9AE]/20 blur-[80px]" />
                    <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[#28704B]/10 blur-[80px]" />
                    <div className="relative z-10">
                        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#0ead69]">
                            Stay Connected
                        </p>
                        <h2 className="mx-auto max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-[#17251C] md:text-4xl">
                            Subscribe to Local Cause
                            <br className="hidden sm:block" /> Alerts
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#68756C]">
                            Get notified when new winter drives, blanket distributions,
                            or emergency cleanups are organized in your neighborhood.
                        </p>
                        <form
                            onSubmit={handleSubscribe}
                            className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="min-w-0 flex-1 rounded-xl border border-[#DCE8E1] bg-white/70 px-4 py-3 text-sm text-[#17251C] outline-none placeholder:text-[#9CA9A0] transition focus:border-[#28704B] focus:ring-2 focus:ring-[#28704B]/10"/>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0ead69] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#07c573] active:scale-95 cursor-pointer">
                                <Send size={15} />
                                Subscribe
                            </button>
                        </form>
                        <p className="mt-5 text-[11px] text-[#89958D]">
                            No spam guaranteed. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
