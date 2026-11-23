"use client";

import { PageHeader } from "@/components/layout/page-header";
import { OrdersTable } from "@/components/sections/orders/orders-table";
import { useEvent } from "@/context/event-context";
import { useEventOrders } from "@/lib/store";

export function OrdersPage() {
  const event = useEvent();
  return (
    <>
      <PageHeader title="Registrations" description="Who registered, payments, refunds and receipts." />
      <OrdersTable orders={useEventOrders(event)} />
    </>
  );
}
