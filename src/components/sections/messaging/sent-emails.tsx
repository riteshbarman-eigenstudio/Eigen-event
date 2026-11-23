"use client";

import { Mail01 } from "@untitledui/icons";
import { useState } from "react";
import { useEvent } from "@/context/event-context";
import { downloadFile } from "@/lib/csv";
import { useEventEmails } from "@/lib/store";
import { Badge } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { EmptyState } from "@/vendor/untitledui/application/empty-state";
import { Table, TableCell, TableHead, TableRow } from "@/vendor/untitledui/application/table";

export function SentEmails() {
  const event = useEvent();
  const emails = useEventEmails(event.id);
  const [openId, setOpenId] = useState<string | null>(null);
  const open = emails.find((e) => e.id === openId);

  if (emails.length === 0) {
    return (
      <Card>
        <EmptyState icon={Mail01} title="No emails sent yet" description="Click New email to write an update for everyone registered for this event." />
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Table>
          <TableHead columns={["Subject", "Recipients", "Status", "Sent", ""]} />
          <tbody>
            {emails.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-semibold text-gray-900">{m.subject}</TableCell>
                <TableCell>{m.recipients.length}</TableCell>
                <TableCell>
                  <Badge color="success">Sent</Badge>
                </TableCell>
                <TableCell>{new Date(m.sentAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</TableCell>
                <TableCell>
                  <Button color="secondary" size="sm" onClick={() => setOpenId(openId === m.id ? null : m.id)}>
                    {openId === m.id ? "Hide" : "View"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Card>
      {open && (
        <Card>
          <CardHeader
            title={open.subject}
            description={`Sent to ${open.recipients.length}: ${open.recipients.slice(0, 5).join(", ")}${open.recipients.length > 5 ? ` and ${open.recipients.length - 5} more` : ""}`}
            actions={
              <Button color="secondary" size="sm" onClick={() => downloadFile(`${event.slug}-${open.id}.html`, open.html, "text/html")}>
                Download HTML
              </Button>
            }
          />
          <CardBody>
            <iframe title="Sent email" srcDoc={open.html} sandbox="" className="h-[560px] w-full rounded-md border border-gray-200 bg-white" />
          </CardBody>
        </Card>
      )}
    </>
  );
}
