"use client";

import { ProtectedPage } from "@/components/layout/protected-page";
import { MenuManager } from "@/components/menu/menu-manager";

export default function MenuPage() {
  return (
    <ProtectedPage
      title="Menu management"
      description="Create, edit, and retire dishes without leaving the dashboard."
    >
      <MenuManager />
    </ProtectedPage>
  );
}
