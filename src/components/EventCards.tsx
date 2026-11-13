import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
  Tag,
  ImageOff,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEventDate, resolveImageSrc } from "@/lib/api";

export type Event = {
  _id: string;
  title: string;
  date: string;
  dateISO?: string;
  time?: string;
  location: string;
  description: string;
  category: string;
  image: string;
  organizerEmail: string;
  volunteerCount?: number;
  spotsLeft?: number;
};

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const imageSrc = resolveImageSrc(event.image);

  return (
    <Card className="group overflow-hidden rounded-2xl border border-[#e5eee2] bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-600 dark:bg-[#222630]">
      <Link
        href={`/${event._id}`}
        className="relative block h-[190px] w-full overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-[#1B1E26] dark:to-[#222630]"
        aria-label={event.title}>
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={event.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"/>
        ) : (
          <div className="flex h-full items-center justify-center text-emerald-300">
            <ImageOff size={44} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <Badge className="absolute left-3 top-3 gap-1 rounded-full border-0 bg-[#d8f5cb] px-3 py-1 text-xs font-semibold text-[#397c35] shadow-sm hover:bg-[#d8f5cb]">
          <Tag className="h-3 w-3" />
          {event.category}
        </Badge>

        {typeof event.volunteerCount === "number" && event.volunteerCount > 0 && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#397c35] shadow-sm backdrop-blur-sm">
            <Users className="h-3.5 w-3.5" />
            {event.volunteerCount} joined
          </div>
        )}
      </Link>

      <CardContent className="p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold tracking-wide text-[#8c8d8c]">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 shrink-0 text-[#05c153]" />
            <span>{formatEventDate(event.date, event.dateISO)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0 text-[#05c153]" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <Link href={`/${event._id}`} className="block">
          <h3 className="line-clamp-1 text-base font-bold text-[#0ead69] transition-colors group-hover:text-[#07c573]">
            {event.title}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-[22px] text-[#929894] dark:text-gray-400">
          {event.description}
        </p>

        <div className="mt-4 border-t border-[#edf1eb] pt-3 dark:border-gray-600">
          <div className="flex items-center justify-between gap-2">
            <span className="line-clamp-1 text-xs text-[#849087]">
              {event.organizerEmail}
            </span>

            <Link
              href={`/${event._id}`}
              className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#0ead69] transition-colors hover:text-[#087c4b]">
              View Event
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
