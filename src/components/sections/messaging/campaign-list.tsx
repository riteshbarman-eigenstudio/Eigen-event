import { Badge, type BadgeColor } from "@/vendor/untitledui/base/badge";
import { Card } from "@/vendor/untitledui/application/card";
import { Table, TableCell, TableHead, TableRow } from "@/vendor/untitledui/application/table";
import type { Campaign } from "@/types";

const color: Record<Campaign["status"], BadgeColor> = { sent: "success", scheduled: "warning", draft: "gray" };

export function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <Card>
      <Table>
        <TableHead columns={["Campaign", "Channel", "Audience", "Status", "Open rate", "Date"]} />
        <tbody>
          {campaigns.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-semibold text-gray-900">{c.name}</TableCell>
              <TableCell>{c.channel}</TableCell>
              <TableCell>{c.audience}</TableCell>
              <TableCell>
                <Badge color={color[c.status]}>{c.status}</Badge>
              </TableCell>
              <TableCell>{c.openRate ? `${c.openRate}%` : "-"}</TableCell>
              <TableCell>{c.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
