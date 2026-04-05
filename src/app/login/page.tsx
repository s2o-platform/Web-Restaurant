"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/api";
import { useAuthStore } from "@/store/auth";
import type { LoginPayload } from "@/types/auth";
import { getErrorMessage } from "@/utils/format";

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((state) => state.login);
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);

  const [form, setForm] = useState<LoginPayload>({
    email: "manager@bistro.local",
    password: "demo123",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nextPath = searchParams.get("next");
  const destination =
    nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard";

  useEffect(() => {
    if (hydrated && token) {
      router.replace(destination);
    }
  }, [destination, hydrated, router, token]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await authService.login(form);
      login(response);
      router.replace(destination);
    } catch (submitError) {
      setError(getErrorMessage(submitError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_32px_80px_-48px_rgba(15,23,42,0.45)] lg:grid-cols-[1.1fr_0.9fr]">
      <section className="hidden bg-slate-950 px-12 py-14 text-white lg:flex lg:flex-col">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-300">
          Staff dashboard
        </p>
        <h1 className="mt-6 max-w-md text-5xl font-semibold tracking-tight">
          Run service from one clean control room.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">
          Monitor order flow, update menu items, and keep table status current
          without digging through customer-facing screens.
        </p>

        <div className="mt-auto grid gap-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm font-semibold">Demo access</p>
            <p className="mt-2 text-sm text-slate-400">
              Email: <span className="text-white">manager@bistro.local</span>
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Password: <span className="text-white">demo123</span>
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center bg-white px-6 py-12 lg:px-12">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardHeader className="px-0 pt-0">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-amber-600">
              Sign in
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Use your staff account to access daily operations.
            </p>
          </CardHeader>
          <CardContent className="px-0 pb-0 pt-8">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                />
              </div>

              {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <Button block disabled={isSubmitting} type="submit">
                {isSubmitting ? "Signing in..." : "Log in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <Suspense
        fallback={
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
            <p className="text-sm font-medium text-slate-900">
              Loading sign-in...
            </p>
          </div>
        }
      >
        <LoginPageContent />
      </Suspense>
    </main>
  );
}
