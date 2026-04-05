export type OrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "served"
  | "completed";

export type OrderItem = {
  name: string;
  quantity: number;
};

export type Order = {
  id: string;
  table: string;
  customerName: string;
  serverName: string;
  status: OrderStatus;
  placedAt: string;
  total: number;
  items: OrderItem[];
};
