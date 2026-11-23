"use client";

import { usePathname, useRouter } from "next/navigation";
import { eventNav } from "@/config/nav";
import { useEvent } from "@/context/event-context";
import { Select } from "@/vendor/untitledui/base/select";

/** Section switcher for the event currently open (replaces the old scrolling tab bar). */
export function EventSubnav() {
  const event = useEvent();
  const pathname = usePathname();
  const router = useRouter();
  const base = `/events/${event.id}`;
  const current = eventNav.find((item) => (item.slug === "" ? pathname === base : pathname.startsWith(base + item.slug)));

  return (
    <Select
      name="event-section"
      aria-label="Event section"
      className="w-full sm:w-64"
      value={current?.slug ?? ""}
      onChange={(e) => router.push(base + e.target.value)}
      options={eventNav.map((item) => ({ value: item.slug, label: item.phase === 2 ? `${item.label} (soon)` : item.label }))}
    />
  );
}
