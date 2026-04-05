"use client";

import { create } from "zustand";

import { ordersService } from "@/services/api";
import type { Order, OrderStatus } from "@/types/order";
import { getErrorMessage } from "@/utils/format";

type OrderState = {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  loadOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
};

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  isLoading: false,
  error: null,
  loadOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const orders = await ordersService.list();
      set({ orders, isLoading: false });
    } catch (error) {
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },
  updateOrderStatus: async (orderId, status) => {
    const previousOrders = get().orders;

    set({
      error: null,
      orders: previousOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    });

    try {
      const updatedOrder = await ordersService.updateStatus(orderId, status);

      set({
        orders: get().orders.map((order) =>
          order.id === orderId ? updatedOrder : order,
        ),
      });
    } catch (error) {
      set({
        orders: previousOrders,
        error: getErrorMessage(error),
      });
    }
  },
}));
