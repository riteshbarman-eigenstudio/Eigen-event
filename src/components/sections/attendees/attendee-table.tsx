"use client";

import { SearchLg } from "@untitledui/icons";
import { useState } from "react";
import { useEvent } from "@/context/event-context";
import { attendeeCsvHeaders, downloadCsv, parseCsv, sampleAttendeeCsv, toCsv } from "@/lib/csv";
import { importAttendees } from "@/lib/store";
import { Avatar } from "@/vendor/untitledui/base/avatar";
import { Badge, type BadgeColor } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Card } from "@/vendor/untitledui/application/card";
import { Table, TableCell, TableHead, TableRow } from "@/vendor/untitledui/application/table";
import type { Attendee } from "@/types";

const color: Record<Attendee["status"], BadgeColor> = { registered: "gray", "checked-in": "success", pending: "warning" };

export function AttendeeTable({ attendees }: { attendees: Attendee[] }) {
  const event = useEvent();
  const [q, setQ] = useState("");
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  async function onFile(file: File | undefined) {
    if (!file) return;
    const rows = parseCsv(await file.text());
    const head = (rows[0] ?? []).map((h) => h.trim().toLowerCase());
    const idx = Object.fromEntries(attendeeCsvHeaders.map((h) => [h, head.indexOf(h)]));
    if (idx.name < 0 || idx.email < 0) return setMessage({ ok: false, text: "The CSV needs at least name and email columns. Download the sample to see the format." });
    const valid = rows
      .slice(1)
      .map((r) => ({ name: r[idx.name]?.trim() ?? "", email: r[idx.email]?.trim() ?? "", company: (idx.company >= 0 ? r[idx.company] : "")?.trim() ?? "", ticket: (idx.ticket >= 0 ? r[idx.ticket] : "")?.trim() ?? "" }))
      .filter((r) => r.name && /^\S+@\S+\.\S+$/.test(r.email));
    if (valid.length === 0) return setMessage({ ok: false, text: "No valid rows found. Each row needs a name and a valid email." });
    const n = importAttendees(event.id, valid);
    setMessage({ ok: true, text: `Imported ${n} attendee${n === 1 ? "" : "s"}.` });
  }
  const rows = attendees.filter((a) => (a.name + a.email + a.company).toLowerCase().includes(q.toLowerCase()));
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
        <Input name="q" placeholder="Search attendees" icon={SearchLg} value={q} onChange={(e) => setQ(e.target.value)} className="w-full sm:w-72" aria-label="Search attendees" />
        <div className="flex gap-3">
          <Button color="secondary" size="sm" onClick={() => setImporting((v) => !v)}>Import CSV</Button>
          <Button color="secondary" size="sm" onClick={() => downloadCsv("attendees.csv", toCsv(["name", "email", "company", "ticket", "status", "source"], attendees.map((a) => [a.name, a.email, a.company, a.ticket, a.status, a.source])))}>Export CSV</Button>
        </div>
      </div>
      {importing && (
        <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50 px-6 py-4">
          <p className="text-sm text-gray-700">
            Upload a CSV with the columns <span className="font-semibold">name, email, company, ticket</span> (company and ticket are optional).
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button color="secondary" size="sm" onClick={() => downloadCsv("sample-attendees.csv", sampleAttendeeCsv)}>
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
        <TableHead columns={["Name", "Company", "Ticket", "Status", "Source"]} />
        <tbody>
          {rows.map((a) => (
            <TableRow key={a.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar name={a.name} size="sm" />
                  <div>
                    <p className="font-medium text-gray-900">{a.name}</p>
                    <p>{a.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{a.company}</TableCell>
              <TableCell>{a.ticket}</TableCell>
              <TableCell>
                <Badge color={color[a.status]}>{a.status}</Badge>
              </TableCell>
              <TableCell>{a.source}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
