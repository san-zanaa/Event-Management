"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "blur";

type RevealProps = {
    children: ReactNode;
    variant?: RevealVariant;
    delay?: number;
    duration?: number;
    distance?: number;
    once?: boolean;
    className?: string;
    style?: CSSProperties;
};

const hiddenTransforms: Record<RevealVariant, (distance: number) => string> = {
    up: (d) => `translateY(${d}px)`,
    down: (d) => `translateY(-${d}px)`,
    left: (d) => `translateX(${d}px)`,
    right: (d) => `translateX(-${d}px)`,
    scale: () => "scale(0.92)",
    blur: (d) => `translateY(${d / 2}px)`,
};
export default function Reveal({
    children,
    variant = "up",
    delay = 0,
    duration = 650,
    distance = 28,
    once = true,
    className,
    style,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const reducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (
            typeof IntersectionObserver === "undefined" ||
            reducedMotion
        ) {
            const frame = requestAnimationFrame(() => setVisible(true));
            return () => cancelAnimationFrame(frame);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        if (once) observer.unobserve(entry.target);
                    } else if (!once) {
                        setVisible(false);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [once]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : hiddenTransforms[variant](distance),
                filter: variant === "blur" && !visible ? "blur(6px)" : undefined,
                transitionProperty: "opacity, transform, filter",
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                willChange: "opacity, transform",
            }}>
            {children}
        </div>
    );
}
