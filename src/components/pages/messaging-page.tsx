import { PageHeader } from "@/components/layout/page-header";
import { CampaignList } from "@/components/sections/messaging/campaign-list";
import { campaigns } from "@/lib/mock-data";
import { Button } from "@/vendor/untitledui/base/button";
import { Plus } from "@untitledui/icons";

export function MessagingPage() {
  return (
    <>
      <PageHeader title="Messaging" description="Email and SMS to your guests." actions={<Button iconLeading={Plus}>New campaign</Button>} />
      <CampaignList campaigns={campaigns} />
    </>
  );
}