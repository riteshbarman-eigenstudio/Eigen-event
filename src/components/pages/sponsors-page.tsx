import { PageHeader } from "@/components/layout/page-header";
import { ComingSoon } from "@/components/sections/shared/coming-soon";

export function SponsorsPage() {
  return (
    <>
      <PageHeader title="Sponsors" />
      <ComingSoon module="Sponsors" description="Sponsor packages, logo walls, booths and lead capture." />
    </>
  );
}