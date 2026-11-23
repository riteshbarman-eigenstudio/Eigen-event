import { PageHeader } from "@/components/layout/page-header";
import { SettingsForm } from "@/components/sections/event-settings/settings-form";

export function EventSettingsPage() {
  return (
    <>
      <PageHeader title="Event settings" description="Details, registration rules and publishing." />
      <SettingsForm />
    </>
  );
}