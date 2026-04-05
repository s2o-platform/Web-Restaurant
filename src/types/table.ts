export type TableStatus = "available" | "occupied" | "reserved" | "cleaning";

export type TableItem = {
  id: string;
  name: string;
  seats: number;
  section: string;
  status: TableStatus;
};
