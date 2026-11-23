"use client";

import { Minus, Plus } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Card } from "@/vendor/untitledui/application/card";
import { formatMoney } from "@/lib/utils/format";
import type { TicketType } from "@/types";

export function TicketPicker({ tickets }: { tickets: TicketType[] }) {
  const router = useRouter();
  const { quantities, setQuantity, count, total } = useCart();
  const prices = Object.fromEntries(tickets.map((t) => [t.id, t.price]));

  return (
    <section id="tickets" className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <h2 className="text-h2 font-semibold text-gray-900">Tickets</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {tickets.map((t) => {
            const q = quantities[t.id] ?? 0;
            const soldOut = t.status === "sold-out";
            return (
              <Card key={t.id} className="flex flex-wrap items-center justify-between gap-4 p-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-md font-semibold text-gray-900">{t.name}</h3>
                    {soldOut && <Badge>Sold out</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{t.kind === "free" ? "Free" : formatMoney(t.price)}</p>
                </div>
                {soldOut ? (
                  <Button color="secondary" size="sm">
                    Join waitlist
                  </Button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button color="secondary" size="sm" aria-label={`Remove one ${t.name}`} iconLeading={Minus} onClick={() => setQuantity(t.id, q - 1)} />
                    <span className="w-6 text-center text-md font-semibold text-gray-900" aria-live="polite">
                      {q}
                    </span>
                    <Button color="secondary" size="sm" aria-label={`Add one ${t.name}`} iconLeading={Plus} onClick={() => setQuantity(t.id, q + 1)} />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
        <Card className="flex h-fit flex-col gap-4 p-6">
          <h3 className="text-md font-semibold text-gray-900">Order summary</h3>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{count} ticket(s)</span>
            <span className="font-semibold text-gray-900">{formatMoney(total(prices))}</span>
          </div>
          <Button disabled={count === 0} onClick={() => router.push("/tickets/demo-order")} className="w-full">
            Register
          </Button>
        </Card>
      </div>
    </section>
  );
}
