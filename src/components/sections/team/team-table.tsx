import { Avatar } from "@/vendor/untitledui/base/avatar";
import { Badge } from "@/vendor/untitledui/base/badge";
import { Card } from "@/vendor/untitledui/application/card";
import { Table, TableCell, TableHead, TableRow } from "@/vendor/untitledui/application/table";
import type { TeamMember } from "@/types";

export function TeamTable({ members }: { members: TeamMember[] }) {
  return (
    <Card>
      <Table>
        <TableHead columns={["Member", "Role"]} />
        <tbody>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar name={m.name} size="sm" />
                  <div>
                    <p className="font-medium text-gray-900">{m.name}</p>
                    <p>{m.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge color={m.role === "Owner" ? "brand" : "gray"}>{m.role}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
