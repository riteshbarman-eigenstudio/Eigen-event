"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Select } from "@/vendor/untitledui/base/select";
import { Textarea } from "@/vendor/untitledui/base/textarea";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { cx } from "@/vendor/untitledui/utils/cx";

const steps = ["Basics", "Format", "Tickets", "Publish"];

export function CreateEventForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const last = step === steps.length - 1;

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader title={`Step ${step + 1} of ${steps.length}: ${steps[step]}`} description="You can change everything later in event settings." />
      <div className="flex gap-2 px-6 pt-5" aria-hidden="true">
        {steps.map((s, i) => (
          <span key={s} className={cx("h-1.5 flex-1 rounded-full", i <= step ? "bg-brand-600" : "bg-gray-100")} />
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (last) router.push("/events/evt_1");
          else setStep(step + 1);
        }}
      >
        <CardBody className="flex flex-col gap-5">
          {step === 0 && (
            <>
              <Input name="name" label="Event name" placeholder="Eigen Summit 2027" required />
              <Textarea name="tagline" label="Short description" placeholder="One or two sentences for the event page" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input name="date" type="date" label="Start date" required />
                <Input name="time" type="time" label="Start time" required />
              </div>
              <Select name="tz" label="Time zone" options={[{ value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" }, { value: "UTC", label: "UTC" }, { value: "America/New_York", label: "America/New York" }]} />
            </>
          )}
          {step === 1 && (
            <>
              <Select name="format" label="Format" options={[{ value: "in-person", label: "In-person" }, { value: "virtual", label: "Virtual" }, { value: "hybrid", label: "Hybrid" }]} />
              <Input name="venue" label="Venue or city" placeholder="Bengaluru International Centre" />
              <Input name="capacity" type="number" label="Capacity" placeholder="500" />
            </>
          )}
          {step === 2 && (
            <>
              <Input name="ticket" label="First ticket name" placeholder="General admission" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input name="price" type="number" label="Price (USD)" placeholder="49" hint="Use 0 for a free ticket." />
                <Input name="qty" type="number" label="Quantity" placeholder="500" />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <Input name="slug" label="Event page address" placeholder="eigen-summit-2027" hint="eigenevent.app/e/your-address" />
              <Select name="visibility" label="Visibility" options={[{ value: "public", label: "Public, anyone can find it" }, { value: "unlisted", label: "Unlisted, link only" }, { value: "private", label: "Private, invite only" }]} />
            </>
          )}
          <div className="flex justify-between gap-3 border-t border-gray-200 pt-5">
            <Button color="secondary" onClick={() => (step === 0 ? router.push("/events") : setStep(step - 1))}>
              {step === 0 ? "Cancel" : "Back"}
            </Button>
            <Button type="submit">{last ? "Create event" : "Continue"}</Button>
          </div>
        </CardBody>
      </form>
    </Card>
  );
}
