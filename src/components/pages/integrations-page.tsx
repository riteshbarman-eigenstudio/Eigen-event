import { PageHeader } from "@/components/layout/page-header";
import { IntegrationGrid } from "@/components/sections/integrations/integration-grid";
import { integrations } from "@/lib/mock-data";

export function IntegrationsPage() {
  return (
    <>
      <PageHeader title="Integrations" description="Connect payments, video and the tools you already use." />
      <IntegrationGrid items={integrations} />
    </>
  );
}