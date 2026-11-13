import { useSyncExternalStore } from "react";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function resolveImageSrc(image?: string | null): string | null {
  if (!image) return null;
  if (image.startsWith("http") || image.startsWith("data:")) return image;
  return `${API_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

export function formatEventDate(date?: string | null, dateISO?: string | null): string {
  const source = date || dateISO;
  if (!source) return "Date to be announced";
  const parsed = new Date(source);
  if (Number.isNaN(parsed.getTime())) return source;
  return parsed.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function daysUntil(dateISO?: string | null, date?: string | null): number | null {
  const source = dateISO || date;
  if (!source) return null;
  const target = new Date(source);
  if (Number.isNaN(target.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

const emptySubscribe = () => () => {};

function todayString(): string {
  const today = new Date();
  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}

export function useClientToday(): string {
  return useSyncExternalStore(emptySubscribe, todayString, () => "");
}

export function countdownLabel(dateISO?: string | null, date?: string | null): string | null {
  const days = daysUntil(dateISO, date);
  if (days === null) return null;
  if (days > 1) return `In ${days} days`;
  if (days === 1) return "Tomorrow";
  if (days === 0) return "Happening today";
  return "Already happened";
}
