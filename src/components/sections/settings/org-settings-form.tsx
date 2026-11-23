"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/vendor/untitledui/base/button";
import { Input } from "@/vendor/untitledui/base/input";
import { Select } from "@/vendor/untitledui/base/select";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";

export function OrgSettingsForm() {
  const { organization, user } = useAuth();
  return (
    <form className="flex max-w-3xl flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <Card>
        <CardHeader title="Organization" />
        <CardBody className="flex flex-col gap-5">
          <Input name="org" label="Organization name" defaultValue={organization} />
          <Input name="email" type="email" label="Contact email" defaultValue={user.email} />
          <Select name="currency" label="Default currency" options={[{ value: "USD", label: "US dollar (USD)" }, { value: "INR", label: "Indian rupee (INR)" }, { value: "EUR", label: "Euro (EUR)" }]} />
        </CardBody>
      </Card>
      <div className="flex justify-end">
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}
