"use client";

import { Plus } from "@untitledui/icons";
import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { EmailComposer } from "@/components/sections/messaging/email-composer";
import { SentEmails } from "@/components/sections/messaging/sent-emails";
import { Button } from "@/vendor/untitledui/base/button";

export function MessagingPage() {
  const [composing, setComposing] = useState(false);
  return (
    <>
      <PageHeader
        title="Messaging"
        description="Write HTML emails and send updates to everyone registered for this event. This is a demo: nothing leaves your browser."
        actions={
          <Button iconLeading={Plus} onClick={() => setComposing((v) => !v)}>
            {composing ? "Close composer" : "New email"}
          </Button>
        }
      />
      {composing && <EmailComposer onSent={() => setComposing(false)} />}
      <SentEmails />
    </>
  );
}
