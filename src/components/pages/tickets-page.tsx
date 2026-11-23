"use client";

import { Plus } from "@untitledui/icons";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { TicketTypeList } from "@/components/sections/tickets/ticket-type-list";
import { useEvent } from "@/context/event-context";
import { addTicket, useEventTickets } from "@/lib/store";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";

export function TicketsPage() {
  const event = useEvent();
  const tickets = useEventTickets(event);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [error, setError] = useState("");

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Name the ticket.");
    if (price === "" || Number(price) < 0) return setError("Enter a price (0 for free).");
    if (!(Number(qty) > 0)) return setError("Enter a quantity above 0.");
    addTicket(event.id, { name, price: Number(price), total: Number(qty) });
    setName("");
    setPrice("");
    setQty("");
    setError("");
    setOpen(false);
  }

  return (
    <>
      <PageHeader title="Tickets" description="Ticket types, pricing and discount codes." actions={<Button iconLeading={Plus} onClick={() => setOpen((o) => !o)}>Add ticket type</Button>} />
      {open && (
        <Card>
          <CardHeader title="New ticket type" />
          <CardBody>
            <form noValidate onSubmit={save} className="flex flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-3">
                <Input name="ticket-name" label="Name" placeholder="Early bird" value={name} onChange={(e) => setName(e.target.value)} />
                <Input name="ticket-price" type="number" min={0} label="Price (₹)" placeholder="299" value={price} onChange={(e) => setPrice(e.target.value)} />
                <Input name="ticket-qty" type="number" min={1} label="Quantity" placeholder="100" value={qty} onChange={(e) => setQty(e.target.value)} />
              </div>
              {error && <p className="text-sm text-error-600">{error}</p>}
              <div className="flex gap-3">
                <Button type="submit">Save ticket type</Button>
                <Button color="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      )}
      <TicketTypeList tickets={tickets} />
    </>
  );
}
