import type { DashboardSummary } from "@/types/dashboard";
import type { MenuItem } from "@/types/menu";
import type { Order } from "@/types/order";
import type { TableItem } from "@/types/table";

export const initialOrders: Order[] = [
  {
    id: "ORD-1024",
    table: "Table 2",
    customerName: "Jordan Lee",
    serverName: "Nina",
    status: "new",
    placedAt: "6:05 PM",
    total: 48.5,
    items: [
      { name: "Grilled Salmon", quantity: 1 },
      { name: "House Lemonade", quantity: 2 },
    ],
  },
  {
    id: "ORD-1025",
    table: "Table 8",
    customerName: "Taylor Smith",
    serverName: "Owen",
    status: "preparing",
    placedAt: "6:12 PM",
    total: 72,
    items: [
      { name: "Steak Frites", quantity: 2 },
      { name: "Caesar Salad", quantity: 1 },
    ],
  },
  {
    id: "ORD-1026",
    table: "Patio 3",
    customerName: "Chris Wong",
    serverName: "Ava",
    status: "ready",
    placedAt: "6:18 PM",
    total: 36,
    items: [
      { name: "Mushroom Pasta", quantity: 1 },
      { name: "Sparkling Water", quantity: 1 },
    ],
  },
  {
    id: "ORD-1027",
    table: "Bar 4",
    customerName: "Morgan Reed",
    serverName: "Nina",
    status: "served",
    placedAt: "6:24 PM",
    total: 29.5,
    items: [
      { name: "Margherita Pizza", quantity: 1 },
      { name: "Iced Tea", quantity: 1 },
    ],
  },
];

export const initialMenuItems: MenuItem[] = [
  { id: "M-101", name: "Burrata Plate", category: "Starter", price: 14, available: true },
  { id: "M-102", name: "Braised Short Rib", category: "Main", price: 29, available: true },
  { id: "M-103", name: "Lemon Tart", category: "Dessert", price: 9, available: true },
  { id: "M-104", name: "Cold Brew Tonic", category: "Drink", price: 6, available: false },
];

export const initialTables: TableItem[] = [
  { id: "T-1", name: "Table 1", seats: 2, section: "Window", status: "available" },
  { id: "T-2", name: "Table 2", seats: 4, section: "Main Hall", status: "occupied" },
  { id: "T-3", name: "Table 3", seats: 4, section: "Patio", status: "reserved" },
  { id: "T-4", name: "Table 4", seats: 6, section: "Private Room", status: "cleaning" },
  { id: "T-5", name: "Bar 1", seats: 2, section: "Bar", status: "available" },
];

export const dashboardSummary: DashboardSummary = {
  activeOrders: 14,
  revenueToday: 4280,
  availableTables: 9,
  lowStockItems: 3,
};
