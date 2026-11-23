import { PageHeader } from "@/components/layout/page-header";
import { OrdersTable } from "@/components/sections/orders/orders-table";
import { orders } from "@/lib/mock-data";

export function OrdersPage() {
  return (
    <>
      <PageHeader title="Orders" description="Payments, refunds and receipts." />
      <OrdersTable orders={orders} />
    </>
  );
}