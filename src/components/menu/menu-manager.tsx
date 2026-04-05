"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { MenuCategory, MenuItem } from "@/types/menu";
import { initialMenuItems } from "@/utils/mock-data";
import { formatCurrency } from "@/utils/format";

const categories: MenuCategory[] = ["Starter", "Main", "Dessert", "Drink"];

const emptyForm = {
  name: "",
  category: "Main" as MenuCategory,
  price: "0",
  available: true,
};

export function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>(() =>
    initialMenuItems.map((item) => ({ ...item })),
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const summary = useMemo(
    () => ({
      total: items.length,
      available: items.filter((item) => item.available).length,
    }),
    [items],
  );

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextItem: MenuItem = {
      id: editingId ?? `M-${Math.floor(Math.random() * 900 + 100)}`,
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      available: form.available,
    };

    if (!nextItem.name) {
      return;
    }

    setItems((current) =>
      editingId
        ? current.map((item) => (item.id === editingId ? nextItem : item))
        : [nextItem, ...current],
    );

    resetForm();
  }

  function startEdit(item: MenuItem) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      price: String(item.price),
      available: item.available,
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-slate-950">
            {editingId ? "Edit menu item" : "Add menu item"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Keep items simple and publish changes fast during service.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Item name
              </label>
              <Input
                placeholder="Pan-seared cod"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>
              <select
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-slate-400"
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    category: event.target.value as MenuCategory,
                  }))
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Price
              </label>
              <Input
                min="0"
                step="0.5"
                type="number"
                value={form.price}
                onChange={(event) =>
                  setForm((current) => ({ ...current, price: event.target.value }))
                }
              />
            </div>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
              <input
                checked={form.available}
                className="h-4 w-4 rounded border-slate-300"
                type="checkbox"
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    available: event.target.checked,
                  }))
                }
              />
              Available for ordering
            </label>

            <div className="flex gap-3">
              <Button block type="submit">
                {editingId ? "Update item" : "Create item"}
              </Button>
              <Button block variant="secondary" onClick={resetForm}>
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Menu items</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">
                {summary.total}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">Currently available</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">
                {summary.available}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-slate-950">Live menu</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4"
              >
                <div>
                  <p className="font-medium text-slate-950">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.category} • {formatCurrency(item.price)} •{" "}
                    {item.available ? "Available" : "Unavailable"}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => startEdit(item)}>
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() =>
                      setItems((current) =>
                        current.filter((entry) => entry.id !== item.id),
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
