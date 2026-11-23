import { PageHeader } from "@/components/layout/page-header";
import { ComingSoon } from "@/components/sections/shared/coming-soon";

export function PageBuilderPage() {
  return (
    <>
      <PageHeader title="Page builder" />
      <ComingSoon module="Page builder" description="Drag-and-drop blocks, brand colours and custom domains for your event page." />
    </>
  );
}