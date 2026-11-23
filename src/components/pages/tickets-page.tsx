import { PageHeader } from "@/components/layout/page-header";
import { PromoCodeTable } from "@/components/sections/tickets/promo-code-table";
import { TicketTypeList } from "@/components/sections/tickets/ticket-type-list";
import { promoCodes, tickets } from "@/lib/mock-data";
import { Button } from "@/vendor/untitledui/base/button";
import { Plus } from "@untitledui/icons";

export function TicketsPage() {
  return (
    <>
      <PageHeader title="Tickets" description="Ticket types, pricing and discount codes." actions={<Button iconLeading={Plus}>Add ticket type</Button>} />
      <TicketTypeList tickets={tickets} />
      <PromoCodeTable codes={promoCodes} />
    </>
  );
}