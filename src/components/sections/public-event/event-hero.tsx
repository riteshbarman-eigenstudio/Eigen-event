import { Calendar, MarkerPin01 } from "@untitledui/icons";
import { Badge } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { formatDate } from "@/lib/utils/format";
import type { EventItem } from "@/types";

export function EventHero({ event }: { event: EventItem }) {
  return (
    <section id="overview" className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 md:px-8 md:py-24">
        <Badge>{event.format}</Badge>
        <h1 className="max-w-3xl text-display font-semibold tracking-tight text-gray-900">{event.name}</h1>
        <p className="max-w-2xl text-h3 text-gray-600">{event.tagline}</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-md text-gray-600">
          <span className="flex items-center gap-2">
            <Calendar className="size-5 text-gray-400" />
            {formatDate(event.startsAt)}
          </span>
          <span className="flex items-center gap-2">
            <MarkerPin01 className="size-5 text-gray-400" />
            {event.city}
          </span>
        </div>
        <Button href="#tickets" size="lg">
          Get tickets
        </Button>
      </div>
    </section>
  );
}
