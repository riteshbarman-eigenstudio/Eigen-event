import { PageHeader } from "@/components/layout/page-header";
import { KpiCards } from "@/components/sections/event-overview/kpi-cards";
import { SalesChart } from "@/components/sections/event-overview/sales-chart";
import { SetupChecklist } from "@/components/sections/event-overview/setup-checklist";

export function EventOverviewPage({ eventId }: { eventId: string }) {
  return (
    <>
      <PageHeader title="Overview" description="How this event is doing right now." />
      <KpiCards />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SalesChart />
        </div>
        <SetupChecklist eventId={eventId} />
      </div>
    </>
  );
}