import { PageHeader } from "@/components/layout/page-header";
import { ComingSoon } from "@/components/sections/shared/coming-soon";

export function ContactsPage() {
  return (
    <>
      <PageHeader title="Contacts" description="Everyone you have ever invited or who registered." />
      <ComingSoon module="Contacts" description="A shared contact list with segments across all your events." />
    </>
  );
}