"use client";

import { useEffect } from "react";

import { OrdersTable } from "@/components/order/orders-table";
import { ProtectedPage } from "@/components/layout/protected-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth";
import { useOrderStore } from "@/store/order";
import type { OrderStatus } from "@/types/order";

export default function OrdersPage() {
  const token = useAuthStore((state) => state.token);
  const orders = useOrderStore((state) => state.orders);
  const isLoading = useOrderStore((state) => state.isLoading);
  const error = useOrderStore((state) => state.error);
  const loadOrders = useOrderStore((state) => state.loadOrders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);

  useEffect(() => {
    if (token) {
      void loadOrders();
    }
  }, [loadOrders, token]);

  const newOrders = orders.filter((order) => order.status === "new").length;
  const preparingOrders = orders.filter(
    (order) => order.status === "preparing",
  ).length;
  const readyOrders = orders.filter((order) => order.status === "ready").length;

  return (
    <ProtectedPage
      title="Order management"
      description="Track incoming tickets and keep service moving table by table."
      action={
        <Button variant="secondary" onClick={() => void loadOrders()}>
          Refresh orders
        </Button>
      }
    >
      <div className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">New orders</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl font-semibold text-slate-950">
                  {newOrders}
                </p>
                <Badge tone="neutral">Needs pickup</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Preparing</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl font-semibold text-slate-950">
                  {preparingOrders}
                </p>
                <Badge tone="warning">Kitchen active</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Ready to serve</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-3xl font-semibold text-slate-950">
                  {readyOrders}
                </p>
                <Badge tone="info">Runner alert</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {isLoading && orders.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-sm text-slate-500">
              Loading orders...
            </CardContent>
          </Card>
        ) : (
          <OrdersTable
            orders={orders}
            onStatusChange={(orderId: string, status: OrderStatus) => {
              void updateOrderStatus(orderId, status);
            }}
          />
        )}
      </div>
    </ProtectedPage>
  );
}
