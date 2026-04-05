import axios from "axios";

import type { AuthResponse, LoginPayload } from "@/types/auth";
import type { MenuItem } from "@/types/menu";
import type { Order, OrderStatus } from "@/types/order";
import type { TableItem } from "@/types/table";
import { dashboardSummary, initialMenuItems, initialOrders, initialTables } from "@/utils/mock-data";

const hasApiBaseUrl = Boolean(process.env.NEXT_PUBLIC_API_URL);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api",
  timeout: 8000,
});

export function setApiToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const ordersDb: Order[] = initialOrders.map((order) => ({
  ...order,
  items: order.items.map((item) => ({ ...item })),
}));

let menuDb: MenuItem[] = initialMenuItems.map((item) => ({ ...item }));
const tablesDb: TableItem[] = initialTables.map((table) => ({ ...table }));

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    if (hasApiBaseUrl) {
      const { data } = await api.post<AuthResponse>("/auth/login", payload);
      return data;
    }

    await wait();

    if (
      payload.email === "manager@bistro.local" &&
      payload.password === "demo123"
    ) {
      return {
        token: "demo-token-restaurant",
        user: {
          id: "staff-1",
          name: "Avery Stone",
          email: payload.email,
          role: "Floor Manager",
        },
      };
    }

    throw new Error("Invalid credentials. Use manager@bistro.local / demo123.");
  },
};

export const dashboardService = {
  async getSummary() {
    if (hasApiBaseUrl) {
      const { data } = await api.get<typeof dashboardSummary>("/dashboard/summary");
      return data;
    }

    await wait(250);
    return { ...dashboardSummary };
  },
};

export const ordersService = {
  async list(): Promise<Order[]> {
    if (hasApiBaseUrl) {
      const { data } = await api.get<Order[]>("/orders");
      return data;
    }

    await wait();
    return ordersDb.map((order) => ({
      ...order,
      items: order.items.map((item) => ({ ...item })),
    }));
  },

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    if (hasApiBaseUrl) {
      const { data } = await api.patch<Order>(`/orders/${orderId}`, { status });
      return data;
    }

    await wait(250);

    const order = ordersDb.find((entry) => entry.id === orderId);

    if (!order) {
      throw new Error("Order not found.");
    }

    order.status = status;

    return {
      ...order,
      items: order.items.map((item) => ({ ...item })),
    };
  },
};

export const menuService = {
  async list() {
    if (hasApiBaseUrl) {
      const { data } = await api.get<MenuItem[]>("/menu");
      return data;
    }

    await wait(250);
    return menuDb.map((item) => ({ ...item }));
  },

  async save(item: Omit<MenuItem, "id"> & { id?: string }) {
    if (hasApiBaseUrl) {
      const method = item.id ? "patch" : "post";
      const path = item.id ? `/menu/${item.id}` : "/menu";
      const { data } = await api.request<MenuItem>({
        method,
        url: path,
        data: item,
      });
      return data;
    }

    await wait(250);

    if (item.id) {
      menuDb = menuDb.map((entry) => (entry.id === item.id ? { ...entry, ...item } : entry));
      return menuDb.find((entry) => entry.id === item.id)!;
    }

    const created = {
      ...item,
      id: `M-${Math.floor(Math.random() * 900 + 100)}`,
    };

    menuDb = [created, ...menuDb];
    return created;
  },

  async remove(itemId: string) {
    if (hasApiBaseUrl) {
      await api.delete(`/menu/${itemId}`);
      return;
    }

    await wait(200);
    menuDb = menuDb.filter((entry) => entry.id !== itemId);
  },
};

export const tableService = {
  async list() {
    if (hasApiBaseUrl) {
      const { data } = await api.get<TableItem[]>("/tables");
      return data;
    }

    await wait(250);
    return tablesDb.map((table) => ({ ...table }));
  },
};
