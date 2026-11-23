"use client";

import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { useEvent } from "@/context/event-context";
import { useWeeklyRegistrations } from "@/lib/store";

export function SalesChart() {
  const salesByWeek = useWeeklyRegistrations(useEvent());
  const max = Math.max(1, ...salesByWeek);
  return (
    <Card>
      <CardHeader title="People registered per week" description="Last 12 weeks" />
      <CardBody>
        <div className="flex h-48 items-end gap-3" role="img" aria-label="Bar chart of weekly registrations">
          {salesByWeek.map((v, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                className={i === salesByWeek.length - 1 ? "w-full rounded-sm bg-brand-600" : "w-full rounded-sm bg-gray-200"}
                style={{ height: `${(v / max) * 80}%` }}
              />
              <span className="text-xs text-gray-500">W{i + 1}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
