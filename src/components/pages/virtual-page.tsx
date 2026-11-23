import { PageHeader } from "@/components/layout/page-header";
import { ComingSoon } from "@/components/sections/shared/coming-soon";

export function VirtualPage() {
  return (
    <>
      <PageHeader title="Virtual" />
      <ComingSoon module="Virtual" description="Stream links, live Q&A, polls and replays for online guests." />
    </>
  );
}