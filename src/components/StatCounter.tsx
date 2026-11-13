"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
    value: number;
    suffix?: string;
    duration?: number;
    className?: string;
};
export default function StatCounter({
    value,
    suffix = "",
    duration = 1600,
    className,
}: StatCounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const [display, setDisplay] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (
            typeof IntersectionObserver === "undefined" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            const frame = requestAnimationFrame(() => {
                setDisplay(value);
                setStarted(true);
            });
            return () => cancelAnimationFrame(frame);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [value]);

    useEffect(() => {
        if (!started) return;

        let frame: number;
        const startTime = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(value * eased));

            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [started, value, duration]);

    return (
        <span ref={ref} className={className}>
            {display.toLocaleString("en-US")}
            {suffix}
        </span>
    );
}
