import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import { salesByWeek } from "@/lib/mock-data";

export function SalesChart() {
  const max = Math.max(...salesByWeek);
  return (
    <Card>
      <CardHeader title="Tickets sold per week" description="Sample data" />
      <CardBody>
        <div className="flex h-48 items-end gap-3" role="img" aria-label="Bar chart of weekly ticket sales">
          {salesByWeek.map((v, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                className={i === salesByWeek.length - 1 ? "w-full rounded-sm bg-brand-600" : "w-full rounded-sm bg-gray-200"}
                style={{ height: `${(v / max) * 80}%` }}
              />
              <span className="text-xs text-gray-500">W{i + 1}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
