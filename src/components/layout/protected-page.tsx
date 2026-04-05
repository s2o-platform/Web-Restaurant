"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { useHydrated } from "@/hooks/use-hydrated";
import { useAuthStore } from "@/store/auth";

type ProtectedPageProps = {
  title: string;
  description: string;
  action?: ReactNode;
  children: ReactNode;
};

export function ProtectedPage({
  title,
  description,
  action,
  children,
}: ProtectedPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useHydrated();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (mounted && hydrated && !token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [hydrated, mounted, pathname, router, token]);

  if (!mounted || !hydrated || !token || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-sm font-medium text-slate-900">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppShell
      title={title}
      description={description}
      action={action}
      userName={user.name}
      userRole={user.role}
      onLogout={() => {
        logout();
        router.replace("/login");
      }}
    >
      {children}
    </AppShell>
  );
}
