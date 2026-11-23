"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/config/nav";
import { cx } from "@/vendor/untitledui/utils/cx";
import { Avatar } from "@/vendor/untitledui/base/avatar";
import { useAuth } from "@/context/auth-context";
import { Logo } from "./logo";

export function Sidebar() {
  const pathname = usePathname();
  const { user, organization } = useAuth();
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-gray-200 bg-white px-4 py-6 lg:flex">
      <div className="flex flex-col gap-6">
        <Link href="/events" className="px-2">
          <Logo />
        </Link>
        <nav className="flex flex-col gap-1" aria-label="Main">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                data-tour={`nav-${item.label.toLowerCase()}`}
                className={cx(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition",
                  active ? "bg-gray-50 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-3 border-t border-gray-200 px-2 pt-4">
        <Avatar name={user.name} size="md" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">{user.name}</p>
          <p className="truncate text-sm text-gray-500">{organization}</p>
        </div>
      </div>
    </aside>
  );
}
