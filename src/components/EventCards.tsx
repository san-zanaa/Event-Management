import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowUpRight, Tag, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Event = {
  _id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  image: string;
  organizerEmail: string;
  spotsLeft?: number;
};

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const imageSrc = event.image.startsWith("http")
    ? event.image
    : `http://localhost:5000${event.image.startsWith("/") ? "" : "/"}${event.image}`;

  return (
    <Card className="group overflow-hidden rounded-2xl border border-[#e5eee2] bg-white dark:bg-[#222630] py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-600">
      <div className="relative h-[190px] w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={event.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"/>

        <Badge className="absolute left-3 top-3 gap-1 rounded-full border-0 bg-[#d8f5cb] px-3 py-1 text-xs font-semibold text-[#397c35] shadow-sm hover:bg-[#d8f5cb]">
          <Tag className="h-3 w-3" />
          {event.category}
        </Badge>

        {event.spotsLeft !== undefined && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#ffe5ad] px-3 py-1.5 text-xs font-semibold text-[#65430b] shadow-sm">
            <Zap className="h-3.5 w-3.5 fill-current" />
            {event.spotsLeft} spots left
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold tracking-wide text-[#8c8d8c]">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 shrink-0 text-[#05c153]" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 shrink-0 text-[#05c153]" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>

        <h3 className="line-clamp-1 text-base font-bold text-[#0ead69]">
          {event.title}
        </h3>

        <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-[22px] text-[#929894]">
          {event.description}
        </p>

        <div className="mt-4 border-t border-[#edf1eb] dark:border-gray-600 pt-3">
          <div className="flex items-center justify-between gap-2">
            <span className="line-clamp-1 text-xs text-[#849087]">
              {event.organizerEmail}
            </span>

            <Link
              href={`/${event._id}`}
              className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#0ead69] transition-colors hover:text-[#087c4b]">
              View Event
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}