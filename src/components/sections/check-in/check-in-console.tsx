"use client";

import { CheckCircle, QrCode01, SearchLg } from "@untitledui/icons";
import { useState } from "react";
import { Avatar } from "@/vendor/untitledui/base/avatar";
import { Badge } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { ProgressBar } from "@/vendor/untitledui/base/progress-bar";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { formatNumber, percent } from "@/lib/utils/format";
import type { Attendee } from "@/types";

/** Door console: live counter, simulated QR scan and manual search. */
export function CheckInConsole({ attendees, total }: { attendees: Attendee[]; total: number }) {
  const [guests, setGuests] = useState(attendees);
  const [q, setQ] = useState("");
  const [last, setLast] = useState<string | null>(null);
  const checked = guests.filter((g) => g.status === "checked-in").length;

  function checkIn(id: string) {
    setGuests((gs) => gs.map((g) => (g.id === id ? { ...g, status: "checked-in" } : g)));
    const g = guests.find((x) => x.id === id);
    if (g) setLast(g.name);
  }
  function simulateScan() {
    const next = guests.find((g) => g.status !== "checked-in");
    if (next) checkIn(next.id);
  }
  const matches = guests.filter((g) => (g.name + g.email).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader title="Arrivals" description="Live counter" />
          <CardBody className="flex flex-col gap-3">
            <p className="text-display font-semibold text-gray-900">{formatNumber(checked)}</p>
            <ProgressBar value={percent(checked, guests.length)} />
            <p className="text-sm text-gray-500">
              {checked} of {guests.length} demo guests ({formatNumber(total)} registered overall)
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Scanner" description="Camera opens on the door device" />
          <CardBody className="flex flex-col items-center gap-4">
            <div className="flex size-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400">
              <QrCode01 className="size-16" />
            </div>
            <Button onClick={simulateScan} iconLeading={QrCode01} className="w-full">
              Simulate scan
            </Button>
            {last && (
              <p className="flex items-center gap-2 text-sm font-medium text-success-700" role="status">
                <CheckCircle className="size-5" /> Welcome, {last}
              </p>
            )}
          </CardBody>
        </Card>
      </div>
      <Card className="lg:col-span-2">
        <CardHeader title="Guest list" description="Search by name or email to check someone in manually" />
        <CardBody className="flex flex-col gap-4">
          <Input name="guest" placeholder="Search guests" icon={SearchLg} value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search guests" />
          <ul className="flex flex-col divide-y divide-gray-200">
            {matches.map((g) => (
              <li key={g.id} className="flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar name={g.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{g.name}</p>
                    <p className="text-sm text-gray-500">{g.ticket}</p>
                  </div>
                </div>
                {g.status === "checked-in" ? (
                  <Badge color="success">Checked in</Badge>
                ) : (
                  <Button size="sm" color="secondary" onClick={() => checkIn(g.id)}>
                    Check in
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
