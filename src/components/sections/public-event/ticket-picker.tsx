"use client";

import { Minus, Plus } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { registerForEvent } from "@/lib/store";
import { Badge } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Card } from "@/vendor/untitledui/application/card";
import { formatMoney } from "@/lib/utils/format";
import type { TicketType } from "@/types";

export function TicketPicker({ eventId, tickets, disabled = false }: { eventId: string; tickets: TicketType[]; disabled?: boolean }) {
  const router = useRouter();
  const { quantities, setQuantity, count, total } = useCart();
  const prices = Object.fromEntries(tickets.map((t) => [t.id, t.price]));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) return;
    const lines = tickets
      .filter((t) => (quantities[t.id] ?? 0) > 0)
      .map((t) => ({ ticketId: t.id, name: t.name, qty: quantities[t.id], price: t.price }));
    const reg = registerForEvent(eventId, name, email, lines);
    router.push(`/tickets/${reg.id}`);
  }

  return (
    <section id="tickets" className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <h2 className="text-h2 font-semibold text-gray-900">Tickets</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {tickets.length === 0 && <p className="text-md text-gray-600">No tickets are available yet.</p>}
          {tickets.map((t) => {
            const q = quantities[t.id] ?? 0;
            const left = Math.max(0, t.total - t.sold);
            const soldOut = t.status === "sold-out" || left === 0;
            return (
              <Card key={t.id} className="flex flex-wrap items-center justify-between gap-4 p-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-md font-semibold text-gray-900">{t.name}</h3>
                    {soldOut && <Badge>Full</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {t.kind === "free" ? "Free" : formatMoney(t.price)}
                    {!soldOut && ` · ${left} left`}
                  </p>
                </div>
                {soldOut ? (
                  <Button color="secondary" size="sm" disabled>
                    Full
                  </Button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button color="secondary" size="sm" disabled={disabled} aria-label={`Remove one ${t.name}`} iconLeading={Minus} onClick={() => setQuantity(t.id, q - 1)} />
                    <span className="w-6 text-center text-md font-semibold text-gray-900" aria-live="polite">
                      {q}
                    </span>
                    <Button color="secondary" size="sm" disabled={disabled || q >= left} aria-label={`Add one ${t.name}`} iconLeading={Plus} onClick={() => setQuantity(t.id, q + 1)} />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
        <Card className="h-fit p-6">
          <form noValidate onSubmit={submit} className="flex flex-col gap-4">
            <h3 className="text-md font-semibold text-gray-900">Registration summary</h3>
            <div className="flex justify-between text-sm text-gray-600">
              <span>{count} ticket(s)</span>
              <span className="font-semibold text-gray-900">{formatMoney(total(prices))}</span>
            </div>
            {count > 0 && (
              <>
                <Input name="reg-name" label="Full name" placeholder="Asha Rao" value={name} error={errors.name} onChange={(e) => setName(e.target.value)} />
                <Input name="reg-email" type="email" label="Email" placeholder="asha@example.com" value={email} error={errors.email} onChange={(e) => setEmail(e.target.value)} />
              </>
            )}
            <Button type="submit" disabled={disabled || count === 0} className="w-full">
              {disabled ? "Registration closed" : "Register"}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
