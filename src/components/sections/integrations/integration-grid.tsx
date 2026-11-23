import { Badge } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Card } from "@/vendor/untitledui/application/card";
import type { Integration } from "@/types";

export function IntegrationGrid({ items }: { items: Integration[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((i) => (
        <Card key={i.id} className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-md font-semibold text-gray-900">{i.name}</h3>
            {i.connected && <Badge color="success">Connected</Badge>}
          </div>
          <p className="flex-1 text-sm text-gray-600">{i.description}</p>
          <Button color="secondary" size="sm" className="self-start">
            {i.connected ? "Manage" : "Connect"}
          </Button>
        </Card>
      ))}
    </div>
  );
}
