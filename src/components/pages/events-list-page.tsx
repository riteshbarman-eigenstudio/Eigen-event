import { PageHeader } from "@/components/layout/page-header";
import { EventsBrowser } from "@/components/sections/events-list/events-browser";
import { events } from "@/lib/mock-data";
import { Button } from "@/vendor/untitledui/base/button";
import { Plus } from "@untitledui/icons";

export function EventsListPage() {
  return (
    <>
      <PageHeader
        title="Events"
        description="Everything you are planning, selling and running."
        actions={
          <Button href="/events/new" iconLeading={Plus}>
            Create event
          </Button>
        }
      />
      <EventsBrowser events={events} />
    </>
  );
}