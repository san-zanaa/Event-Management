"use client";

import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";
import "react-toastify/dist/ReactToastify.css";

/**
 * Global toast host. Rendered once in the root layout so any
 * component can fire notifications via `toast.*` from react-toastify.
 */
export default function ToastProvider() {
    const { resolvedTheme } = useTheme();

    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss={false}
            pauseOnHover
            draggable
            limit={4}
        />
    );
}
