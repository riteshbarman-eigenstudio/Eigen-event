"use client";

import { CheckCircle } from "@untitledui/icons";
import Link from "next/link";
import { useEvent } from "@/context/event-context";
import { useEventEmails, useEventTickets } from "@/lib/store";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { cx } from "@/vendor/untitledui/utils/cx";

export function SetupChecklist({ eventId }: { eventId: string }) {
  const event = useEvent();
  const tickets = useEventTickets(event);
  const emails = useEventEmails(event.id);
  const tasks = event.created
    ? [
        { label: "Create the event", done: true, slug: "/settings" },
        { label: "Add ticket types", done: tickets.length > 0, slug: "/tickets" },
        { label: "Publish the event page", done: event.status !== "draft", slug: "" },
        { label: "Get your first registration", done: event.registered > 0, slug: "/orders" },
        { label: "Send the first announcement", done: emails.length > 0, slug: "/messaging" },
      ]
    : [
        { label: "Create the event", done: true, slug: "/settings" },
        { label: "Add ticket types", done: true, slug: "/tickets" },
        { label: "Connect a payment provider", done: true, slug: "/settings" },
        { label: "Send the first announcement", done: false, slug: "/messaging" },
        { label: "Invite door staff", done: false, slug: "/check-in" },
      ];
  return (
    <Card>
      <CardHeader title="Launch checklist" description={`${tasks.filter((t) => t.done).length} of ${tasks.length} done`} />
      <CardBody>
        <ul className="flex flex-col gap-4">
          {tasks.map((t) => (
            <li key={t.label} className="flex items-center gap-3">
              <CheckCircle className={cx("size-5", t.done ? "text-brand-600" : "text-gray-300")} />
              <Link href={`/events/${eventId}${t.slug}`} className={cx("text-sm font-medium", t.done ? "text-gray-500 line-through" : "text-gray-900 hover:underline")}>
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
