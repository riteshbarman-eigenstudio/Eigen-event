import { PageHeader } from "@/components/layout/page-header";
import { OrgSettingsForm } from "@/components/sections/settings/org-settings-form";

export function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Organization profile and defaults." />
      <OrgSettingsForm />
    </>
  );
}