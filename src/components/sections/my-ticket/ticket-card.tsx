import { QrCode01 } from "@untitledui/icons";
import { Button } from "@/vendor/untitledui/base/button";
import { Badge } from "@/vendor/untitledui/base/badge";
import { formatDate } from "@/lib/utils/format";
import type { EventItem } from "@/types";

export function TicketCard({ event, holder, ticket }: { event: EventItem; holder: string; ticket: string }) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="bg-brand-600 p-6 text-white">
        <Badge className="border-white/20 bg-white/10 text-white">{ticket}</Badge>
        <h1 className="mt-3 text-h2 font-semibold">{event.name}</h1>
        <p className="mt-1 text-sm text-white/80">
          {formatDate(event.startsAt)} · {event.city}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 border-t-2 border-dashed border-gray-200 p-6">
        <div>
          <p className="text-sm text-gray-500">Attendee</p>
          <p className="text-md font-semibold text-gray-900">{holder}</p>
        </div>
        <QrCode01 className="size-16 text-gray-900" />
      </div>
      <div className="border-t border-gray-200 p-4">
        <Button color="secondary" className="w-full">
          Add to calendar
        </Button>
      </div>
    </div>
  );
}
