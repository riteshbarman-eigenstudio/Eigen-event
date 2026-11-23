"use client";

import { Bell01, SearchLg } from "@untitledui/icons";
import Link from "next/link";
import { Input } from "@/vendor/untitledui/base/input";
import { Button } from "@/vendor/untitledui/base/button";
import { Avatar } from "@/vendor/untitledui/base/avatar";
import { useAuth } from "@/context/auth-context";
import { DemoLauncher } from "./demo-launcher";
import { LogoMark } from "./logo";

export function AppHeader() {
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4 md:px-8">
      <Link href="/events" className="lg:hidden" aria-label="Eigen Event">
        <LogoMark />
      </Link>
      <Input name="search" placeholder="Search events, people, orders" icon={SearchLg} className="hidden w-full max-w-sm md:flex" aria-label="Search" />
      <div className="flex items-center gap-2">
        <DemoLauncher />
        <Button color="tertiary" size="sm" aria-label="Notifications" iconLeading={Bell01} />
        <Button color="secondary" size="sm" onClick={signOut}>
          Sign out
        </Button>
        <Avatar name={user.name} size="sm" />
      </div>
    </header>
  );
}
