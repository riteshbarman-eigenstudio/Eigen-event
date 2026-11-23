"use client";

import { Calendar, SearchLg } from "@untitledui/icons";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, type BadgeColor } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Card } from "@/vendor/untitledui/application/card";
import { EmptyState } from "@/vendor/untitledui/application/empty-state";
import { Table, TableCell, TableHead, TableRow } from "@/vendor/untitledui/application/table";
import { ProgressBar } from "@/vendor/untitledui/base/progress-bar";
import { cx } from "@/vendor/untitledui/utils/cx";
import { formatDate, formatMoney, percent } from "@/lib/utils/format";
import { useEvents } from "@/lib/store";
import type { EventStatus } from "@/types";

const statusColor: Record<EventStatus, BadgeColor> = { draft: "gray", "on-sale": "success", live: "brand", ended: "gray" };
const statusLabel: Record<EventStatus, string> = { draft: "Draft", "on-sale": "Registration open", live: "Live", ended: "Ended" };
const filters: { id: EventStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "on-sale", label: "Registration open" },
  { id: "draft", label: "Draft" },
  { id: "ended", label: "Ended" },
];

export function EventsBrowser() {
  const events = useEvents();
  const [filter, setFilter] = useState<EventStatus | "all">("all");
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () =>
      events.filter(
        (e) => (filter === "all" || e.status === filter) && e.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [events, filter, query],
  );

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
        <div className="flex gap-1" role="tablist" aria-label="Filter events">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cx(
                "cursor-pointer rounded-md px-3 py-2 text-sm font-semibold transition",
                filter === f.id ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Input name="q" placeholder="Search events" icon={SearchLg} value={query} onChange={(e) => setQuery(e.target.value)} className="w-full sm:w-72" aria-label="Search events" />
      </div>
      {rows.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events found"
          description="Try a different filter or create a new event."
          action={<Button href="/events/new">Create event</Button>}
        />
      ) : (
        <Table>
          <TableHead columns={["Event", "Date", "Status", "Registered", "Revenue"]} />
          <tbody>
            {rows.map((e) => (
              <TableRow key={e.id}>
                <TableCell>
                  <Link href={`/events/${e.id}`} className="font-semibold text-gray-900 hover:underline">
                    {e.name}
                  </Link>
                  <p className="text-gray-500">
                    {e.city} · {e.format}
                  </p>
                </TableCell>
                <TableCell>{formatDate(e.startsAt)}</TableCell>
                <TableCell>
                  <Badge color={statusColor[e.status]}>{statusLabel[e.status]}</Badge>
                </TableCell>
                <TableCell className="min-w-48">
                  <div className="flex flex-col gap-1.5">
                    <span>
                      {e.registered} / {e.capacity}
                    </span>
                    <ProgressBar value={percent(e.registered, e.capacity)} />
                  </div>
                </TableCell>
                <TableCell>{formatMoney(e.revenue)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
}
