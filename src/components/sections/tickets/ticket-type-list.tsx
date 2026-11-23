import { Badge, type BadgeColor } from "@/vendor/untitledui/base/badge";
import { ProgressBar } from "@/vendor/untitledui/base/progress-bar";
import { Card } from "@/vendor/untitledui/application/card";
import { formatMoney, percent } from "@/lib/utils/format";
import type { TicketType } from "@/types";

const color: Record<TicketType["status"], BadgeColor> = { "on-sale": "success", "sold-out": "gray", scheduled: "warning" };
const label: Record<TicketType["status"], string> = { "on-sale": "Open", "sold-out": "Full", scheduled: "Scheduled" };

export function TicketTypeList({ tickets }: { tickets: TicketType[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {tickets.map((t) => (
        <Card key={t.id} className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-md font-semibold text-gray-900">{t.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{t.kind === "free" ? "Free" : formatMoney(t.price)} per ticket</p>
            </div>
            <Badge color={color[t.status]}>{label[t.status]}</Badge>
          </div>
          <ProgressBar value={percent(t.sold, t.total)} />
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {t.sold} of {t.total} registered
            </span>
            {t.waitlist > 0 && <span>{t.waitlist} on waitlist</span>}
          </div>
        </Card>
      ))}
    </div>
  );
}
