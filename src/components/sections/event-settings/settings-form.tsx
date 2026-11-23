"use client";

import { useEvent } from "@/context/event-context";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Select } from "@/vendor/untitledui/base/select";
import { Textarea } from "@/vendor/untitledui/base/textarea";
import { Checkbox } from "@/vendor/untitledui/base/checkbox";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";

export function SettingsForm() {
  const e = useEvent();
  return (
    <form className="flex max-w-3xl flex-col gap-6" onSubmit={(ev) => ev.preventDefault()}>
      <Card>
        <CardHeader title="Event details" />
        <CardBody className="flex flex-col gap-5">
          <Input name="name" label="Event name" defaultValue={e.name} />
          <Textarea name="tagline" label="Short description" defaultValue={e.tagline} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input name="city" label="City" defaultValue={e.city} />
            <Select name="format" label="Format" defaultValue={e.format} options={[{ value: "in-person", label: "In-person" }, { value: "virtual", label: "Virtual" }, { value: "hybrid", label: "Hybrid" }]} />
          </div>
          <Input name="slug" label="Event page address" defaultValue={e.slug} hint={`eigenevent.app/e/${e.slug}`} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader title="Registration" />
        <CardBody className="flex flex-col gap-4">
          <Input name="capacity" type="number" label="Total capacity" defaultValue={e.capacity} />
          <Checkbox label="Enable waitlist" hint="Let guests join a waitlist when a ticket sells out." defaultChecked />
          <Checkbox label="Require approval" hint="Review each registration before it is confirmed." />
        </CardBody>
      </Card>
      <div className="flex justify-end gap-3">
        <Button color="secondary">Cancel</Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}
