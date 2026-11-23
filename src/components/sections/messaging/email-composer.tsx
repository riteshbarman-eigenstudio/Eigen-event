"use client";

import { useMemo, useState } from "react";
import { useEvent } from "@/context/event-context";
import { downloadFile } from "@/lib/csv";
import { emailTemplates, renderEmailHtml } from "@/lib/email-template";
import { sendEmail, useEventAttendees } from "@/lib/store";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Select } from "@/vendor/untitledui/base/select";
import { Textarea } from "@/vendor/untitledui/base/textarea";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { cx } from "@/vendor/untitledui/utils/cx";

export function EmailComposer({ onSent }: { onSent: () => void }) {
  const event = useEvent();
  const attendees = useEventAttendees(event);
  const registered = useMemo(() => [...new Set(attendees.map((a) => a.email.toLowerCase()))], [attendees]);

  const [template, setTemplate] = useState<string>(emailTemplates[0].id);
  const [subject, setSubject] = useState<string>(emailTemplates[0].subject);
  const [heading, setHeading] = useState<string>(emailTemplates[0].heading);
  const [message, setMessage] = useState<string>(emailTemplates[0].message);
  const [ctaLabel, setCtaLabel] = useState<string>(emailTemplates[0].ctaLabel);
  const [ctaUrl, setCtaUrl] = useState("");
  const [extra, setExtra] = useState("");
  const [tab, setTab] = useState<"preview" | "html">("preview");
  const [error, setError] = useState("");

  const eventUrl = typeof window === "undefined" ? `/e/${event.slug}` : `${window.location.origin}/e/${event.slug}`;
  const html = renderEmailHtml({
    eventName: event.name,
    eventDate: new Date(event.startsAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    eventCity: event.city,
    heading,
    message,
    ctaLabel,
    ctaUrl: ctaUrl || eventUrl,
  });

  function applyTemplate(id: string) {
    const t = emailTemplates.find((x) => x.id === id);
    if (!t) return;
    setTemplate(id);
    setSubject(t.subject);
    setHeading(t.heading);
    setMessage(t.message);
    setCtaLabel(t.ctaLabel);
  }

  function send() {
    const extras = extra
      .split(/[,\s;]+/)
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
    const bad = extras.find((e) => !/^\S+@\S+\.\S+$/.test(e));
    if (bad) return setError(`"${bad}" is not a valid email address.`);
    if (!subject.trim()) return setError("Add a subject line.");
    if (!heading.trim() || !message.trim()) return setError("Add a heading and a message.");
    const recipients = [...new Set([...registered, ...extras])];
    if (recipients.length === 0) return setError("No recipients yet. Register someone first, or add email addresses in the extra recipients field.");
    sendEmail(event.id, subject, recipients, html);
    onSent();
  }

  return (
    <Card>
      <CardHeader title="New email" description={`Goes to ${registered.length} registered ${registered.length === 1 ? "person" : "people"}, plus any extra addresses.`} />
      <CardBody className="grid gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <Select name="template" label="Template" value={template} onChange={(e) => applyTemplate(e.target.value)} options={emailTemplates.map((t) => ({ value: t.id, label: t.label }))} />
          <Input name="subject" label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <Input name="heading" label="Heading" value={heading} onChange={(e) => setHeading(e.target.value)} />
          <Textarea name="message" label="Message" rows={6} value={message} onChange={(e) => setMessage(e.target.value)} hint="Leave a blank line to start a new paragraph." />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input name="cta-label" label="Button text" value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} hint="Leave empty for no button." />
            <Input name="cta-url" label="Button link" placeholder={eventUrl} value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} hint="Defaults to the event page." />
          </div>
          <Input name="extra" label="Extra recipients (optional)" placeholder="me@example.com, team@example.com" value={extra} onChange={(e) => setExtra(e.target.value)} />
          {error && (
            <p role="alert" className="text-sm font-medium text-error-600">
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <Button onClick={send}>Send email</Button>
            <Button color="secondary" onClick={() => downloadFile(`${event.slug}-email.html`, html, "text/html")}>
              Download HTML
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-1" role="tablist" aria-label="Email view">
            {(["preview", "html"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cx("cursor-pointer rounded-md px-3 py-2 text-sm font-semibold transition", tab === t ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-900")}
              >
                {t === "preview" ? "Preview" : "HTML source"}
              </button>
            ))}
          </div>
          {tab === "preview" ? (
            <iframe title="Email preview" srcDoc={html} sandbox="" className="h-[560px] w-full rounded-md border border-gray-200 bg-white" />
          ) : (
            <pre className="h-[560px] overflow-auto rounded-md border border-gray-200 bg-gray-50 p-4 text-xs text-gray-700">{html}</pre>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
