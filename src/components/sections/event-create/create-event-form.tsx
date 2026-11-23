"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Select } from "@/vendor/untitledui/base/select";
import { Textarea } from "@/vendor/untitledui/base/textarea";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { cx } from "@/vendor/untitledui/utils/cx";
import { createEvent, slugTaken, type NewEventInput } from "@/lib/store";

const steps = ["Basics", "Format", "Tickets", "Publish"];

interface Form {
  name: string;
  tagline: string;
  date: string;
  time: string;
  timezone: string;
  format: NewEventInput["format"];
  city: string;
  capacity: string;
  ticketName: string;
  price: string;
  quantity: string;
  slug: string;
  visibility: NewEventInput["visibility"];
}

const initial: Form = {
  name: "",
  tagline: "",
  date: "",
  time: "09:00",
  timezone: "Asia/Kolkata",
  format: "in-person",
  city: "",
  capacity: "",
  ticketName: "General admission",
  price: "",
  quantity: "",
  slug: "",
  visibility: "public",
};

function slugify(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CreateEventForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const last = step === steps.length - 1;

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setF((p) => ({ ...p, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };
  const bind = (key: keyof Form) => ({
    name: key,
    value: f[key],
    error: errors[key],
    onChange: (e: { target: { value: string } }) => set(key, e.target.value as never),
  });

  function validate(s: number) {
    const e: Partial<Record<keyof Form, string>> = {};
    if (s === 0) {
      if (!f.name.trim()) e.name = "Give your event a name.";
      if (!f.date) e.date = "Pick a start date.";
      if (!f.time) e.time = "Pick a start time.";
    }
    if (s === 1) {
      if (f.format !== "virtual" && !f.city.trim()) e.city = "Add a venue or city.";
      if (!(Number(f.capacity) > 0)) e.capacity = "Enter a capacity above 0.";
    }
    if (s === 2) {
      if (!f.ticketName.trim()) e.ticketName = "Name the ticket.";
      if (f.price === "" || Number(f.price) < 0) e.price = "Enter a price (0 for free).";
      if (!(Number(f.quantity) > 0)) e.quantity = "Enter a quantity above 0.";
      else if (Number(f.quantity) > Number(f.capacity)) e.quantity = `Cannot exceed the capacity of ${f.capacity}.`;
    }
    if (s === 3) {
      const slug = slugify(f.slug || f.name);
      if (!slug) e.slug = "Enter an address for the event page.";
      else if (slugTaken(slug)) e.slug = "That address is taken. Try another.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(publish: boolean) {
    if (!validate(3)) return;
    const event = createEvent({
      name: f.name,
      tagline: f.tagline,
      date: f.date,
      time: f.time,
      timezone: f.timezone,
      format: f.format,
      city: f.city,
      capacity: Number(f.capacity),
      ticketName: f.ticketName,
      price: Number(f.price),
      quantity: Number(f.quantity),
      slug: f.slug || f.name,
      visibility: f.visibility,
      publish,
    });
    router.push(`/events/${event.id}`);
  }

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader title={`Step ${step + 1} of ${steps.length}: ${steps[step]}`} description="You can change everything later in event settings." />
      <div className="flex gap-2 px-6 pt-5" aria-hidden="true">
        {steps.map((s, i) => (
          <span key={s} className={cx("h-1.5 flex-1 rounded-full", i <= step ? "bg-brand-600" : "bg-gray-100")} />
        ))}
      </div>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!validate(step)) return;
          if (last) submit(true);
          else setStep(step + 1);
        }}
      >
        <CardBody className="flex flex-col gap-5">
          {step === 0 && (
            <>
              <Input {...bind("name")} label="Event name" placeholder="Eigen Summit 2027" required />
              <Textarea name="tagline" label="Short description" placeholder="One or two sentences for the event page" value={f.tagline} onChange={(e) => set("tagline", e.target.value)} />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input {...bind("date")} type="date" label="Start date" required />
                <Input {...bind("time")} type="time" label="Start time" required />
              </div>
              <Select name="timezone" label="Time zone" value={f.timezone} onChange={(e) => set("timezone", e.target.value)} options={[{ value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" }, { value: "UTC", label: "UTC" }, { value: "America/New_York", label: "America/New York" }]} />
            </>
          )}
          {step === 1 && (
            <>
              <Select name="format" label="Format" value={f.format} onChange={(e) => set("format", e.target.value as Form["format"])} options={[{ value: "in-person", label: "In-person" }, { value: "virtual", label: "Virtual" }, { value: "hybrid", label: "Hybrid" }]} />
              <Input {...bind("city")} label="Venue or city" placeholder="Bengaluru International Centre" hint={f.format === "virtual" ? "Optional for virtual events." : undefined} />
              <Input {...bind("capacity")} type="number" min={1} label="Capacity" placeholder="500" />
            </>
          )}
          {step === 2 && (
            <>
              <Input {...bind("ticketName")} label="First ticket name" placeholder="General admission" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input {...bind("price")} type="number" min={0} label="Price (₹)" placeholder="499" hint="Use 0 for a free ticket." />
                <Input {...bind("quantity")} type="number" min={1} label="Quantity" placeholder="500" />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <Input {...bind("slug")} label="Event page address" placeholder={slugify(f.name) || "eigen-summit-2027"} hint={`eigenevent.app/e/${slugify(f.slug || f.name) || "your-address"}`} />
              <Select name="visibility" label="Visibility" value={f.visibility} onChange={(e) => set("visibility", e.target.value as Form["visibility"])} options={[{ value: "public", label: "Public, anyone can find it" }, { value: "unlisted", label: "Unlisted, link only" }, { value: "private", label: "Private, invite only" }]} />
              <dl className="grid gap-3 rounded-md bg-gray-50 p-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-gray-500">Event</dt>
                  <dd className="font-medium text-gray-900">{f.name}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">When</dt>
                  <dd className="font-medium text-gray-900">
                    {f.date} {f.time}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Where</dt>
                  <dd className="font-medium text-gray-900">{f.city || (f.format === "virtual" ? "Online" : "-")}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Ticket</dt>
                  <dd className="font-medium text-gray-900">
                    {f.ticketName}, {Number(f.price) > 0 ? `₹${f.price}` : "Free"} × {f.quantity}
                  </dd>
                </div>
              </dl>
            </>
          )}
          <div className="flex flex-wrap justify-between gap-3 border-t border-gray-200 pt-5">
            <Button color="secondary" onClick={() => (step === 0 ? router.push("/events") : setStep(step - 1))}>
              {step === 0 ? "Cancel" : "Back"}
            </Button>
            <div className="flex gap-3">
              {last && (
                <Button color="secondary" onClick={() => submit(false)}>
                  Save as draft
                </Button>
              )}
              <Button type="submit">{last ? "Publish event" : "Continue"}</Button>
            </div>
          </div>
        </CardBody>
      </form>
    </Card>
  );
}
