
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

const ToggleButton = () => {
    const { theme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

    if (!mounted) {
        return <div className="h-10 w-[76px]" />;
    }
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle dark mode"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`relative flex h-10 w-[76px] items-center rounded-full p-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                isDark
                    ? "bg-emerald-700"
                    : "bg-emerald-500"
            }`}>
            <Sun
                size={17}
                className="absolute left-[10px] text-emerald-100"/>
            <Moon
                size={17}
                className="absolute right-[10px] text-emerald-100"/>
            <span
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
                    isDark ? "translate-x-9" : "translate-x-0"
                }`}>
                {isDark ? (
                    <Moon size={17} className="text-emerald-700" />
                ) : (
                    <Sun size={17} className="text-amber-500" />
                )}
            </span>
        </button>
    );
};

export default ToggleButton;
