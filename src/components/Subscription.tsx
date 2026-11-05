
"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    console.log("Subscribed email:", email);
    setEmail("");
  };

  return (
    <section className="bg-[#F5F9F4] px-5 py-14 md:py-20 dark:bg-[#1B1E26]">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[24px] border border-[#176B4C]/20 bg-gradient-to-br from-[#004530] via-[#17986b] to-[#003D2B] px-6 py-14 shadow-[0_20px_50px_rgba(0,55,35,0.16)] md:rounded-[30px] md:px-12 md:py-[76px]">

        <div className="pointer-events-none absolute -left-32 -top-36 h-[380px] w-[380px] rounded-full bg-[#48A77A]/20 blur-[100px]" />

        <div className="pointer-events-none absolute -left-32 -top-36 h-[380px] w-[380px] rounded-full bg-[#48A77A]/20 blur-[100px]" />

<div className="pointer-events-none absolute -bottom-40 -right-20 h-[400px] w-[400px] rounded-full bg-[#8DD6A8]/15 blur-[110px]" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-[#C5EAD5] backdrop-blur-md">
            <Sparkles size={12} />
            STAY CONNECTED
          </div>

          <h2 className="text-[28px] font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl md:text-[42px]">
            Be Part of Something{" "}
            <span className="text-[#B8E6A5]">Good.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[510px] text-[13px] leading-7 text-[#C1DCCE] sm:text-sm">
            Get updates about upcoming events, meaningful volunteer
            opportunities, and inspiring stories that bring our community
            together.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mx-auto mt-8 flex max-w-[490px] flex-col gap-2.5 rounded-2xl border border-white/10 bg-white/[0.07] p-2 backdrop-blur-xl sm:flex-row sm:rounded-xl"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-lg bg-white px-4 py-3">
              <Mail size={17} className="shrink-0 text-[#527565]" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-transparent text-sm text-[#183D2C] outline-none placeholder:text-[#94A39A]"
              />
            </div>

            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#B8E6A5] px-6 py-3 text-sm font-semibold text-[#12452E] transition-all duration-300 hover:bg-[#D0F0C2] hover:shadow-[0_5px_20px_rgba(184,230,165,0.2)]"
            >
              Subscribe
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#A8CCB8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8E6A5]" />
            Your inbox stays private. No spam, ever.
          </div>

        </div>
      </div>
    </section>
  );
}
