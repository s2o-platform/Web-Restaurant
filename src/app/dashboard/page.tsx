"use client";

import Link from "next/link";

import { ProtectedPage } from "@/components/layout/protected-page";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { dashboardSummary, initialOrders } from "@/utils/mock-data";
import { formatCurrency } from "@/utils/format";

const metrics = [
  {
    label: "Active orders",
    value: dashboardSummary.activeOrders,
    note: "Across dining room, patio, and bar",
  },
  {
    label: "Revenue today",
    value: formatCurrency(dashboardSummary.revenueToday),
    note: "Compared with yesterday: +8.4%",
  },
  {
    label: "Available tables",
    value: dashboardSummary.availableTables,
    note: "Ready to seat immediately",
  },
  {
    label: "Low stock items",
    value: dashboardSummary.lowStockItems,
    note: "Review before dinner peak",
  },
];

export default function DashboardPage() {
  return (
    <ProtectedPage
      title="Dashboard overview"
      description="Keep the team aligned with a quick read on service performance."
      action={
        <Link
          href="/orders"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          Open orders board
        </Link>
      }
    >
      <div className="space-y-8">
        <section className="grid gap-4 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-slate-500">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {metric.value}
                </p>
                <p className="mt-3 text-sm text-slate-500">{metric.note}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-950">
                Recent order activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Focus on the orders that need attention next.
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {initialOrders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4"
                >
                  <div>
                    <p className="font-medium text-slate-950">{order.id}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {order.table} • {order.customerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium capitalize text-slate-900">
                      {order.status}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-slate-950">
                Quick actions
              </h2>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="/menu"
                className="block rounded-2xl border border-slate-200 px-4 py-4 transition-colors hover:bg-slate-50"
              >
                <p className="font-medium text-slate-950">Update menu items</p>
                <p className="mt-1 text-sm text-slate-500">
                  Add dishes, adjust pricing, or hide unavailable items.
                </p>
              </Link>
              <Link
                href="/tables"
                className="block rounded-2xl border border-slate-200 px-4 py-4 transition-colors hover:bg-slate-50"
              >
                <p className="font-medium text-slate-950">Check table status</p>
                <p className="mt-1 text-sm text-slate-500">
                  See what is free, reserved, occupied, or being reset.
                </p>
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </ProtectedPage>
  );
}
