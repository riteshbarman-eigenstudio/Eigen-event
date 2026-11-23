import { PublicHeader } from "@/components/layout/public-header";
import { CheckInConsole } from "@/components/sections/check-in/check-in-console";
import { attendees } from "@/lib/mock-data";

export function ScannerPage() {
  return (
    <>
      <PublicHeader cta={false} />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <CheckInConsole attendees={attendees} total={1284} />
      </main>
    </>
  );
}