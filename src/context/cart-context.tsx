"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface CartValue {
  quantities: Record<string, number>;
  setQuantity: (ticketId: string, qty: number) => void;
  count: number;
  total: (prices: Record<string, number>) => number;
}

const CartContext = createContext<CartValue | null>(null);

/** Ticket selection on the public event page and checkout. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const value = useMemo<CartValue>(
    () => ({
      quantities,
      setQuantity: (id, qty) => setQuantities((q) => ({ ...q, [id]: Math.max(0, qty) })),
      count: Object.values(quantities).reduce((a, b) => a + b, 0),
      total: (prices) => Object.entries(quantities).reduce((sum, [id, q]) => sum + (prices[id] ?? 0) * q, 0),
    }),
    [quantities],
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
