import type { ReactNode } from "react";
import { AuthProvider } from "@/context/auth-context";
import { AppHeader } from "./app-header";
import { Sidebar } from "./sidebar";

/** Organizer console frame: sidebar + header + scrolling content. */
export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />
          <main className="flex flex-1 flex-col gap-8 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
