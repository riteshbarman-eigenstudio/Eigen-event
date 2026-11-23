import { ProgressBar } from "@/vendor/untitledui/base/progress-bar";
import { Card, CardBody, CardHeader } from "@/vendor/untitledui/application/card";
import type { TrafficSource } from "@/types";

export function SourceBreakdown({ sources }: { sources: TrafficSource[] }) {
  return (
    <Card>
      <CardHeader title="Traffic sources" description="Where registrations come from" />
      <CardBody className="flex flex-col gap-5">
        {sources.map((s) => (
          <div key={s.name} className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{s.name}</span>
              <span className="text-gray-500">{s.share}%</span>
            </div>
            <ProgressBar value={s.share} />
          </div>
        ))}
      </CardBody>
    </Card>
  );
}
