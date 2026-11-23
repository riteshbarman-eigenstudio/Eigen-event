"use client";

import { useEvent } from "@/context/event-context";
import { formatMoney, formatNumber, percent } from "@/lib/utils/format";
import { StatCard, StatGrid } from "../shared/stat-card";

export function KpiCards() {
  const e = useEvent();
  return (
    <StatGrid>
      <StatCard label="Registered" value={formatNumber(e.registered)} note={`${percent(e.registered, e.capacity)}% of ${formatNumber(e.capacity)} capacity`} />
      <StatCard label="Revenue" value={formatMoney(e.revenue)} note="Gross, before fees" />
      <StatCard label="Checked in" value={formatNumber(e.checkedIn)} note="Opens on event day" />
      <StatCard label="Spots left" value={formatNumber(e.capacity - e.registered)} note="Across all ticket types" />
    </StatGrid>
  );
}
