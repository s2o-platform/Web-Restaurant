"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { setApiToken } from "@/services/api";
import type { AuthResponse, User } from "@/types/auth";

type AuthState = {
  token: string | null;
  user: User | null;
  hydrated: boolean;
  login: (payload: AuthResponse) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hydrated: false,
      login: ({ token, user }) => {
        setApiToken(token);
        set({ token, user });
      },
      logout: () => {
        setApiToken(null);
        set({ token: null, user: null });
      },
      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "restaurant-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ token, user }) => ({ token, user }),
      onRehydrateStorage: () => (state) => {
        setApiToken(state?.token ?? null);
        state?.setHydrated(true);
      },
    },
  ),
);
