"use client";

import { useState } from "react";
import { useEvent } from "@/context/event-context";
import { setEventStatus } from "@/lib/store";
import { Button } from "@/vendor/untitledui/base/button";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";

/** Public link + publish control. The public page is what attendees register on. */
export function ShareCard() {
  const event = useEvent();
  const [copied, setCopied] = useState(false);
  const path = `/e/${event.slug}`;
  const draft = event.status === "draft";

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${path}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be blocked
    }
  }

  return (
    <Card>
      <CardHeader title={draft ? "Your event is a draft" : "Your event is live"} description={draft ? "Publish it to open registration." : "Share this link so people can register."} />
      <CardBody className="flex flex-col gap-4">
        <p className="rounded-md bg-gray-50 px-3 py-2 text-sm break-all text-gray-700">eigenevent.app{path}</p>
        <div className="flex flex-wrap gap-3">
          {draft ? (
            <Button onClick={() => setEventStatus(event.id, "on-sale")}>Publish event</Button>
          ) : (
            <>
              <Button href={path}>Open public page</Button>
              <Button color="secondary" onClick={copy}>
                {copied ? "Copied" : "Copy link"}
              </Button>
            </>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
