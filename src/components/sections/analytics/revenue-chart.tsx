"use client";

import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { useEvent } from "@/context/event-context";
import { useWeeklyRegistrations } from "@/lib/store";

export function RevenueChart() {
  const salesByWeek = useWeeklyRegistrations(useEvent());
  const max = Math.max(1, ...salesByWeek);
  const w = 600;
  const h = 180;
  const pts = salesByWeek.map((v, i) => [(i / (salesByWeek.length - 1)) * w, h - (v / max) * (h - 16) - 8] as const);
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return (
    <Card>
      <CardHeader title="Registrations over time" description="Last 12 weeks" />
      <CardBody>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-52 w-full" preserveAspectRatio="none" role="img" aria-label="Line chart of registrations over time">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} stroke="#eaecf0" />
          ))}
          <path d={`${line} L${w} ${h} L0 ${h} Z`} fill="#f2f4f7" />
          <path d={line} fill="none" stroke="#262a32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </CardBody>
    </Card>
  );
}
