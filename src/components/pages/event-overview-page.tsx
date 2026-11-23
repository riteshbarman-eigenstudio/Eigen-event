import { PageHeader } from "@/components/layout/page-header";
import { KpiCards } from "@/components/sections/event-overview/kpi-cards";
import { SalesChart } from "@/components/sections/event-overview/sales-chart";
import { SetupChecklist } from "@/components/sections/event-overview/setup-checklist";
import { SentUpdates } from "@/components/sections/event-overview/sent-updates";
import { ShareCard } from "@/components/sections/event-overview/share-card";

export function EventOverviewPage({ eventId }: { eventId: string }) {
  return (
    <>
      <PageHeader title="Overview" description="How this event is doing right now." />
      <KpiCards />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <SalesChart />
          <ShareCard />
        </div>
        <div className="flex flex-col gap-6">
          <SetupChecklist eventId={eventId} />
          <SentUpdates />
        </div>
      </div>
    </>
  );
}
