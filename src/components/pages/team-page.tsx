import { PageHeader } from "@/components/layout/page-header";
import { TeamTable } from "@/components/sections/team/team-table";
import { team } from "@/lib/mock-data";
import { Button } from "@/vendor/untitledui/base/button";
import { UserPlus01 } from "@untitledui/icons";

export function TeamPage() {
  return (
    <>
      <PageHeader title="Team" description="Who can do what in your organization." actions={<Button iconLeading={UserPlus01}>Invite member</Button>} />
      <TeamTable members={team} />
    </>
  );
}