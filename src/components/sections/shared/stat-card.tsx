import { Card } from "@/vendor/untitledui/application/card";

export function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <Card className="p-6">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-2 text-h1 font-semibold text-gray-900">{value}</p>
      {note && <p className="mt-1 text-sm text-gray-500">{note}</p>}
    </Card>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{children}</div>;
}
