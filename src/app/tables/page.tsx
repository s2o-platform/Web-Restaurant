"use client";

import { useState } from "react";

import { ProtectedPage } from "@/components/layout/protected-page";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { TableItem, TableStatus } from "@/types/table";
import { initialTables } from "@/utils/mock-data";

const tones: Record<TableStatus, "neutral" | "warning" | "info" | "success"> = {
  available: "success",
  occupied: "warning",
  reserved: "info",
  cleaning: "neutral",
};

const statuses: TableStatus[] = ["available", "occupied", "reserved", "cleaning"];

export default function TablesPage() {
  const [tables, setTables] = useState<TableItem[]>(() =>
    initialTables.map((table) => ({ ...table })),
  );

  return (
    <ProtectedPage
      title="Table management"
      description="Keep seating and reset status visible for the full team."
    >
      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
        {tables.map((table) => (
          <Card key={table.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-slate-950">
                    {table.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {table.section} • {table.seats} seats
                  </p>
                </div>
                <Badge tone={tones[table.status]}>{table.status}</Badge>
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Update status
                </label>
                <select
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-slate-400"
                  value={table.status}
                  onChange={(event) =>
                    setTables((current) =>
                      current.map((entry) =>
                        entry.id === table.id
                          ? {
                              ...entry,
                              status: event.target.value as TableStatus,
                            }
                          : entry,
                      ),
                    )
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ProtectedPage>
  );
}
