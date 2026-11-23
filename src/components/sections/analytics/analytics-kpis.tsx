import { StatCard, StatGrid } from "../shared/stat-card";

export function AnalyticsKpis() {
  return (
    <StatGrid>
      <StatCard label="Registrations" value="1,284" note="Up 18% this week" />
      <StatCard label="Revenue" value="$48.2k" note="Up 9% this week" />
      <StatCard label="Conversion" value="6.4%" note="Page visit to ticket" />
      <StatCard label="NPS" value="62" note="From the last event" />
    </StatGrid>
  );
}
