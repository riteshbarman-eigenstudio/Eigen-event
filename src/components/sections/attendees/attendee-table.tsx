"use client";

import { SearchLg } from "@untitledui/icons";
import { useState } from "react";
import { Avatar } from "@/vendor/untitledui/base/avatar";
import { Badge, type BadgeColor } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Card } from "@/vendor/untitledui/application/card";
import { Table, TableCell, TableHead, TableRow } from "@/vendor/untitledui/application/table";
import type { Attendee } from "@/types";

const color: Record<Attendee["status"], BadgeColor> = { registered: "gray", "checked-in": "success", pending: "warning" };

export function AttendeeTable({ attendees }: { attendees: Attendee[] }) {
  const [q, setQ] = useState("");
  const rows = attendees.filter((a) => (a.name + a.email + a.company).toLowerCase().includes(q.toLowerCase()));
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-4">
        <Input name="q" placeholder="Search attendees" icon={SearchLg} value={q} onChange={(e) => setQ(e.target.value)} className="w-full sm:w-72" aria-label="Search attendees" />
        <div className="flex gap-3">
          <Button color="secondary" size="sm">Import CSV</Button>
          <Button color="secondary" size="sm">Export</Button>
        </div>
      </div>
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
