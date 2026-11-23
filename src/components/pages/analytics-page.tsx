import { PageHeader } from "@/components/layout/page-header";
import { AnalyticsKpis } from "@/components/sections/analytics/analytics-kpis";
import { RevenueChart } from "@/components/sections/analytics/revenue-chart";
import { SourceBreakdown } from "@/components/sections/analytics/source-breakdown";
import { trafficSources } from "@/lib/mock-data";

export function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" description="Registrations, traffic and attendance." />
      <AnalyticsKpis />
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>
        <SourceBreakdown sources={trafficSources} />
      </div>
    </>
  );
}