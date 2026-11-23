"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { eventNav } from "@/config/nav";
import { useEvent } from "@/context/event-context";
import { Badge } from "@/vendor/untitledui/base/badge";
import { cx } from "@/vendor/untitledui/utils/cx";

/** Tab bar for the event currently open. Phase 2 modules are marked "Soon". */
export function EventSubnav() {
  const event = useEvent();
  const pathname = usePathname();
  const base = `/events/${event.id}`;
  return (
    <nav aria-label="Event" className="-mx-4 overflow-x-auto border-b border-gray-200 px-4 md:-mx-8 md:px-8">
      <ul className="flex gap-1">
        {eventNav.map((item) => {
          const href = base + item.slug;
          const active = item.slug === "" ? pathname === base : pathname.startsWith(href);
          return (
            <li key={item.slug}>
              <Link
                href={href}
                className={cx(
                  "flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-semibold whitespace-nowrap transition",
                  active ? "border-brand-600 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-900",
                )}
              >
                {item.label}
                {item.phase === 2 && <Badge>Soon</Badge>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
