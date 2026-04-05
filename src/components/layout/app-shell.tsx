import type { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { PageHeader } from "@/components/ui/page-header";

type AppShellProps = {
  title: string;
  description: string;
  userName: string;
  userRole: string;
  onLogout: () => void;
  action?: ReactNode;
  children: ReactNode;
};

export function AppShell({
  title,
  description,
  userName,
  userRole,
  onLogout,
  action,
  children,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar userName={userName} userRole={userRole} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex min-h-full w-full max-w-[1440px] flex-col">
            <PageHeader title={title} description={description} action={action} />
            <div className="flex-1 px-8 py-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
