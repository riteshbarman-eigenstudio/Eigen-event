import { PageHeader } from "@/components/layout/page-header";
import { ComingSoon } from "@/components/sections/shared/coming-soon";

export function SpeakersPage() {
  return (
    <>
      <PageHeader title="Speakers" />
      <ComingSoon module="Speakers" description="Call for speakers, review scoring and speaker profiles." />
    </>
  );
}