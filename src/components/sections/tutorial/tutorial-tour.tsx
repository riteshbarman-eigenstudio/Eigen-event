"use client";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useCallback } from "react";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { Button } from "@/vendor/untitledui/base/button";

const stepCards = [
  { id: "basics", title: "1. Basics", text: "Name your conference, add a short description, pick the start date, time and time zone." },
  { id: "format", title: "2. Format", text: "Choose in-person, virtual or hybrid. Add the venue or city and the capacity." },
  { id: "tickets", title: "3. Tickets", text: "Create your first ticket with a name, price in ₹ and quantity. Use 0 for a free ticket." },
  { id: "publish", title: "4. Publish", text: "Set the event page address and who can see it: public, unlisted or private." },
];

export function TutorialTour() {
  const start = useCallback(() => {
    const d = driver({
      showProgress: true,
      allowClose: true,
      steps: [
        {
          element: '[data-tour="nav-events"]',
          popover: { title: "Open Events", description: "Every conference lives under Events in the sidebar. Start here." },
        },
        {
          element: "#tour-create-btn",
          popover: { title: "Create event", description: "On the Events page, click Create event to open the setup wizard." },
        },
        ...stepCards.map((s) => ({
          element: `#tour-${s.id}`,
          popover: { title: s.title, description: s.text },
        })),
        {
          element: "#tour-finish",
          popover: { title: "You are ready", description: "Finish the wizard and your conference is created. You can change everything later in event settings." },
        },
      ],
    });
    d.drive();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader title="Create a conference" description="A guided tour of the four-step event wizard." />
        <CardBody className="flex flex-wrap items-center gap-3">
          <Button onClick={start}>Start tour</Button>
          <span id="tour-create-btn" className="inline-flex">
            <Button href="/events/new" color="secondary">Create event</Button>
          </span>
        </CardBody>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2">
        {stepCards.map((s) => (
          <div key={s.id} id={`tour-${s.id}`} className="rounded-lg border border-gray-200 bg-white p-5">
            <h3 className="text-md font-semibold text-gray-900">{s.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{s.text}</p>
          </div>
        ))}
      </div>
      <p id="tour-finish" className="w-fit rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-700">
        Click Create event on the last step to finish.
      </p>
    </div>
  );
}
