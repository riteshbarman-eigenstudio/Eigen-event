import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { AgendaPreview } from "@/components/sections/public-event/agenda-preview";
import { EventHero } from "@/components/sections/public-event/event-hero";
import { SpeakersGrid } from "@/components/sections/public-event/speakers-grid";
import { TicketPicker } from "@/components/sections/public-event/ticket-picker";
import { CartProvider } from "@/context/cart-context";
import { agenda, speakers, tickets } from "@/lib/mock-data";
import type { EventItem } from "@/types";

export function PublicEventPage({ event }: { event: EventItem }) {
  return (
    <CartProvider>
      <PublicHeader />
      <main>
        <EventHero event={event} />
        <SpeakersGrid speakers={speakers} />
        <AgendaPreview sessions={agenda} />
        <TicketPicker tickets={tickets} />
      </main>
      <Footer />
    </CartProvider>
  );
}