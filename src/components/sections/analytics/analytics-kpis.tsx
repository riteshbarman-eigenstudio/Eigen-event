"use client";

import { useEvent } from "@/context/event-context";
import { formatMoney, formatNumber } from "@/lib/utils/format";
import { StatCard, StatGrid } from "../shared/stat-card";

export function AnalyticsKpis() {
  const e = useEvent();
  return (
    <StatGrid>
      <StatCard label="Registrations" value={formatNumber(e.registered)} note={e.created ? "Since you published" : "Up 18% this week"} />
      <StatCard label="Revenue" value={formatMoney(e.revenue)} note={e.created ? "Gross, before fees" : "Up 9% this week"} />
      <StatCard label="Conversion" value={e.created ? "-" : "6.4%"} note="Page visit to registration" />
      <StatCard label="NPS" value={e.created ? "-" : "62"} note={e.created ? "Available after the event" : "From the last event"} />
    </StatGrid>
  );
}
