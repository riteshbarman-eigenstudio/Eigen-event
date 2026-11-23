import { PageHeader } from "@/components/layout/page-header";
import { CheckInConsole } from "@/components/sections/check-in/check-in-console";
import { attendees } from "@/lib/mock-data";
import { Button } from "@/vendor/untitledui/base/button";

export function CheckInPage({ registered }: { registered: number }) {
  return (
    <>
      <PageHeader title="Check-in" description="Scan tickets and welcome guests at the door." actions={<Button href="/scan" color="secondary">Open scanner app</Button>} />
      <CheckInConsole attendees={attendees} total={registered} />
    </>
  );
}