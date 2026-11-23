"use client";

import { useState } from "react";
import { useEvent } from "@/context/event-context";
import { parseCsv, toCsv, downloadCsv } from "@/lib/csv";
import { registerForEvent, useEventTickets } from "@/lib/store";
import { Badge, type BadgeColor } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Card, CardHeader } from "@/vendor/untitledui/application/card";
import { Table, TableCell, TableHead, TableRow } from "@/vendor/untitledui/application/table";
import { formatMoney } from "@/lib/utils/format";
import type { Order } from "@/types";

const color: Record<Order["status"], BadgeColor> = { paid: "success", pending: "warning", refunded: "gray" };

export function OrdersTable({ orders }: { orders: Order[] }) {
  const event = useEvent();
  const tickets = useEventTickets(event);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const sample = toCsv(["name", "email", "ticket", "quantity"], [
    ["Asha Rao", "asha@example.com", tickets[0]?.name ?? "General admission", 1],
    ["Marco Silva", "marco@example.com", tickets[0]?.name ?? "General admission", 2],
  ]);

  async function onFile(file: File | undefined) {
    if (!file) return;
    const rows = parseCsv(await file.text());
    const head = (rows[0] ?? []).map((h) => h.trim().toLowerCase());
    const col = (n: string) => head.indexOf(n);
    if (col("name") < 0 || col("email") < 0 || col("ticket") < 0) return setMessage({ ok: false, text: "The CSV needs name, email and ticket columns. Download the sample to see the format." });
    let added = 0;
    const skipped: string[] = [];
    rows.slice(1).forEach((r, i) => {
      const name = r[col("name")]?.trim();
      const email = r[col("email")]?.trim();
      const t = tickets.find((x) => x.name.toLowerCase() === (r[col("ticket")] ?? "").trim().toLowerCase());
      const qty = col("quantity") >= 0 ? Number(r[col("quantity")]) || 1 : 1;
      if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !t || qty < 1) return skipped.push(String(i + 2));
      registerForEvent(event.id, name, email, [{ ticketId: t.id, name: t.name, qty, price: t.price }]);
      added++;
    });
    setMessage({ ok: added > 0, text: `Imported ${added} registration${added === 1 ? "" : "s"}.${skipped.length ? ` Skipped rows: ${skipped.join(", ")} (needs a name, a valid email and an existing ticket name).` : ""}` });
  }

  return (
    <Card>
      <CardHeader title="All registrations" actions={<div className="flex gap-3"><Button color="secondary" size="sm" onClick={() => setImporting((v) => !v)}>Import CSV</Button><Button color="secondary" size="sm" onClick={() => downloadCsv("registrations.csv", toCsv(["Registration", "Name", "Email", "Tickets", "Total (INR)", "Status", "Date"], orders.map((o) => [o.id, o.buyer, o.email, o.items, o.total, o.status, o.date])))}>Export CSV</Button></div>} />
      {importing && (
        <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50 px-6 py-4">
          <p className="text-sm text-gray-700">
            Upload a CSV with the columns <span className="font-semibold">name, email, ticket, quantity</span>. The ticket must match one of this event&apos;s ticket names; quantity defaults to 1.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button color="secondary" size="sm" onClick={() => downloadCsv("sample-registrations.csv", sample)}>
              Download sample CSV
            </Button>
            <input
              type="file"
              accept=".csv,text/csv"
              aria-label="Choose a CSV file"
              className="text-sm text-gray-600 file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-gray-300 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-gray-700"
              onChange={(e) => {
                void onFile(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </div>
          {message && (
            <p role="status" className={message.ok ? "text-sm font-medium text-success-700" : "text-sm font-medium text-error-600"}>
              {message.text}
            </p>
          )}
        </div>
      )}
      <Table>
        <TableHead columns={["Registration", "Registrant", "Tickets", "Total", "Status", "Date"]} />
        <tbody>
          {orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-semibold text-gray-900">{o.id}</TableCell>
              <TableCell>
                <p className="font-medium text-gray-900">{o.buyer}</p>
                <p>{o.email}</p>
              </TableCell>
              <TableCell>{o.items}</TableCell>
              <TableCell>{formatMoney(o.total)}</TableCell>
              <TableCell>
                <Badge color={color[o.status]}>{o.status}</Badge>
              </TableCell>
              <TableCell>{o.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
