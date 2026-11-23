import { Badge } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Card, CardHeader } from "@/vendor/untitledui/application/card";
import { Table, TableCell, TableHead, TableRow } from "@/vendor/untitledui/application/table";
import type { PromoCode } from "@/types";

export function PromoCodeTable({ codes }: { codes: PromoCode[] }) {
  return (
    <Card>
      <CardHeader title="Promo codes" description="Discounts and access codes" actions={<Button color="secondary" size="sm">Add code</Button>} />
      <Table>
        <TableHead columns={["Code", "Discount", "Used", "Status"]} />
        <tbody>
          {codes.map((c) => (
            <TableRow key={c.code}>
              <TableCell className="font-mono font-semibold text-gray-900">{c.code}</TableCell>
              <TableCell>{c.discount}</TableCell>
              <TableCell>
                {c.used} / {c.limit}
              </TableCell>
              <TableCell>
                <Badge color={c.active ? "success" : "gray"}>{c.active ? "Active" : "Paused"}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
