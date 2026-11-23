"use client";

import { Mail01 } from "@untitledui/icons";
import Link from "next/link";
import { useEvent } from "@/context/event-context";
import { useEventEmails } from "@/lib/store";
import { Button } from "@/vendor/untitledui/base/button";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";

/** Right-hand column card: the latest emails sent to this event's guests. */
export function SentUpdates() {
  const event = useEvent();
  const emails = useEventEmails(event.id);
  const base = `/events/${event.id}/messaging`;
  return (
    <Card>
      <CardHeader title="Sent updates" description={emails.length ? `${emails.length} email${emails.length === 1 ? "" : "s"} sent` : "Emails you send to guests appear here."} />
      <CardBody className="flex flex-col gap-4">
        {emails.length === 0 ? (
          <p className="text-sm text-gray-600">Nothing sent yet.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-gray-200">
            {emails.slice(0, 5).map((m) => (
              <li key={m.id} className="flex items-start gap-3 py-3 first:pt-0">
                <Mail01 className="mt-0.5 size-5 shrink-0 text-gray-400" />
                <div className="min-w-0">
                  <Link href={base} className="block truncate text-sm font-medium text-gray-900 hover:underline">
                    {m.subject}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {m.recipients.length} recipient{m.recipients.length === 1 ? "" : "s"} ·{" "}
                    {new Date(m.sentAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Button href={base} color="secondary" size="sm" className="w-full">
          {emails.length ? "View all updates" : "Send an update"}
        </Button>
      </CardBody>
    </Card>
  );
}
