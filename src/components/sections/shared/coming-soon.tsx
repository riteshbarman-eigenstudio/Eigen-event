import { Clock } from "@untitledui/icons";
import { Card } from "@/vendor/untitledui/application/card";
import { EmptyState } from "@/vendor/untitledui/application/empty-state";
import { Badge } from "@/vendor/untitledui/base/badge";

/** Placeholder for modules scheduled for Phase 2 or 3 (see docs/PLAN.md section 8). */
export function ComingSoon({ module, description, phase = 2 }: { module: string; description: string; phase?: 2 | 3 }) {
  return (
    <Card>
      <EmptyState
        icon={Clock}
        title={`${module} is coming in Phase ${phase}`}
        description={description}
        action={<Badge>Planned</Badge>}
      />
    </Card>
  );
}
