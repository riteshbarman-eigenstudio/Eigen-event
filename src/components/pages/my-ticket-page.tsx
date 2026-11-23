"use client";

import { PublicHeader } from "@/components/layout/public-header";
import { TicketCard } from "@/components/sections/my-ticket/ticket-card";
import { useRegistration } from "@/lib/store";
import { Button } from "@/vendor/untitledui/base/button";

export function MyTicketPage({ orderId }: { orderId: string }) {
  const { registration, event, ready } = useRegistration(orderId);

  if (!registration || !event) {
    return (
      <>
        <PublicHeader cta={false} />
        <main className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24">
          {ready ? (
            <>
              <h1 className="text-h1 font-semibold text-gray-900">Registration not found</h1>
              <p className="text-md text-gray-600">This registration was not made in this browser.</p>
              <Button href="/">Go home</Button>
            </>
          ) : (
            <p className="text-sm text-gray-500">Loading your ticket...</p>
          )}
        </main>
      </>
    );
  }

  const cards = registration.lines.flatMap((l) => Array.from({ length: l.qty }, () => l.name));
  return (
    <>
      <PublicHeader cta={false} />
      <main className="flex flex-col items-center gap-8 px-4 py-16">
        <div className="text-center">
          <h1 className="text-h1 font-semibold text-gray-900">You are registered</h1>
          <p className="mt-1 text-md text-gray-600">
            Confirmation {registration.id} for {registration.email}
          </p>
        </div>
        {cards.map((ticket, i) => (
          <TicketCard key={i} event={event} holder={i === 0 ? registration.buyer : `${registration.buyer} (guest ${i})`} ticket={ticket} />
        ))}
      </main>
    </>
  );
}
