import { Badge } from "@/components/ui/badge";
import type { Order, OrderStatus } from "@/types/order";
import { cn } from "@/utils/cn";
import { formatCurrency } from "@/utils/format";

const statusTone: Record<OrderStatus, "neutral" | "info" | "warning" | "success"> = {
  new: "neutral",
  preparing: "warning",
  ready: "info",
  served: "success",
  completed: "success",
};

type OrdersTableProps = {
  orders: Order[];
  onStatusChange: (orderId: string, status: OrderStatus) => void;
};

export function OrdersTable({ orders, onStatusChange }: OrdersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr_0.9fr_0.9fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        <span>Order</span>
        <span>Guests</span>
        <span>Items</span>
        <span>Server</span>
        <span>Total</span>
        <span>Status</span>
      </div>

      <div className="divide-y divide-slate-200">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-[1.1fr_1fr_1fr_1fr_0.9fr_0.9fr] gap-4 px-6 py-5 text-sm text-slate-700"
          >
            <div>
              <p className="font-semibold text-slate-950">{order.id}</p>
              <p className="mt-1 text-slate-500">
                {order.table} • {order.placedAt}
              </p>
            </div>
            <div>
              <p className="font-medium text-slate-900">{order.customerName}</p>
              <p className="mt-1 text-slate-500">{order.table}</p>
            </div>
            <div>
              <p className="line-clamp-2">
                {order.items
                  .map((item) => `${item.quantity}x ${item.name}`)
                  .join(", ")}
              </p>
            </div>
            <div className="flex items-center font-medium text-slate-900">
              {order.serverName}
            </div>
            <div className="flex items-center font-semibold text-slate-950">
              {formatCurrency(order.total)}
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={statusTone[order.status]}>{order.status}</Badge>
              <select
                className={cn(
                  "h-10 min-w-32 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400",
                )}
                value={order.status}
                onChange={(event) =>
                  onStatusChange(order.id, event.target.value as OrderStatus)
                }
              >
                <option value="new">New</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="served">Served</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
