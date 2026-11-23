import { Badge, type BadgeColor } from "@/vendor/untitledui/base/badge";
import { Button } from "@/vendor/untitledui/base/button";
import { Card, CardHeader } from "@/vendor/untitledui/application/card";
import { Table, TableCell, TableHead, TableRow } from "@/vendor/untitledui/application/table";
import { formatMoney } from "@/lib/utils/format";
import type { Order } from "@/types";

const color: Record<Order["status"], BadgeColor> = { paid: "success", pending: "warning", refunded: "gray" };

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Card>
      <CardHeader title="All orders" actions={<Button color="secondary" size="sm">Export CSV</Button>} />
      <Table>
        <TableHead columns={["Order", "Buyer", "Items", "Total", "Status", "Date"]} />
        <tbody>
          {orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-semibold text-gray-900">{o.id}</TableCell>
              <TableCell>
                <p className="font-medium text-gray-900">{o.buyer}</p>
                <p>{o.email}</p>
              </TableCell>
              <TableCell>{o.items}</TableCell>
              <TableCell>{formatMoney(o.total)}</TableCell>
              <TableCell>
                <Badge color={color[o.status]}>{o.status}</Badge>
              </TableCell>
              <TableCell>{o.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
