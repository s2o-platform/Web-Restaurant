"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/utils/cn";

const navigation = [
  { href: "/dashboard", label: "Overview", shortLabel: "OV" },
  { href: "/orders", label: "Orders", shortLabel: "OR" },
  { href: "/menu", label: "Menu", shortLabel: "MN" },
  { href: "/tables", label: "Tables", shortLabel: "TB" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 px-6 py-8 text-slate-100 xl:flex xl:flex-col">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-amber-300">
          Service Board
        </p>
        <h2 className="mt-3 text-2xl font-semibold">Restaurant HQ</h2>
        <p className="mt-2 text-sm text-slate-400">
          Daily operations for floor, kitchen, and menu management.
        </p>
      </div>

      <nav className="mt-10 flex flex-col gap-2">
        {navigation.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-white text-slate-950"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold",
                  active ? "bg-slate-100" : "bg-slate-800",
                )}
              >
                {item.shortLabel}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
        <p className="text-sm font-medium text-white">Tonight&apos;s reminder</p>
        <p className="mt-2 text-sm text-slate-400">
          Keep order statuses moving so the kitchen board stays reliable.
        </p>
      </div>
    </aside>
  );
}
