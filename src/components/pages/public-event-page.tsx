"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { PublicHeader } from "@/components/layout/public-header";
import { AgendaPreview } from "@/components/sections/public-event/agenda-preview";
import { EventHero } from "@/components/sections/public-event/event-hero";
import { SpeakersGrid } from "@/components/sections/public-event/speakers-grid";
import { TicketPicker } from "@/components/sections/public-event/ticket-picker";
import { CartProvider } from "@/context/cart-context";
import { agenda, speakers } from "@/lib/mock-data";
import { useEventLookup, useEventTickets } from "@/lib/store";
import { Button } from "@/vendor/untitledui/base/button";

/** Public event page. Resolves demo events and events created in this browser. */
export function PublicEventPage({ slug }: { slug: string }) {
  const { event, ready } = useEventLookup(slug);
  const tickets = useEventTickets(event);

  if (!event) {
    return (
      <>
        <PublicHeader cta={false} />
        <main className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24">
          {ready ? (
            <>
              <h1 className="text-h1 font-semibold text-gray-900">Event not found</h1>
              <p className="text-md text-gray-600">This event does not exist in this browser. Events created in the demo are stored locally.</p>
              <Button href="/">Go home</Button>
            </>
          ) : (
            <p className="text-sm text-gray-500">Loading event...</p>
          )}
        </main>
      </>
    );
  }

  const draft = event.status === "draft";
  return (
    <CartProvider>
      <PublicHeader />
      <main>
        {draft && (
          <div className="border-b border-warning-200 bg-warning-50 px-4 py-3 text-center text-sm text-warning-700">
            This event is a draft and is not open for registration.{" "}
            <Link href={`/events/${event.id}`} className="font-semibold underline">
              Publish it from the dashboard
            </Link>
          </div>
        )}
        <EventHero event={event} />
        {!event.created && <SpeakersGrid speakers={speakers} />}
        {!event.created && <AgendaPreview sessions={agenda} />}
        <TicketPicker eventId={event.id} tickets={tickets} disabled={draft || event.status === "ended"} />
      </main>
      <Footer />
    </CartProvider>
  );
}
