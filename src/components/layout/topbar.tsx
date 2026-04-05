import { Button } from "@/components/ui/button";

type TopbarProps = {
  userName: string;
  userRole: string;
  onLogout: () => void;
};

export function Topbar({ userName, userRole, onLogout }: TopbarProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-8 py-5">
      <div>
        <p className="text-sm font-medium text-slate-900">Shift control</p>
        <p className="text-sm text-slate-500">
          Track service flow and update the floor in real time.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">{userName}</p>
          <p className="text-sm text-slate-500">{userRole}</p>
        </div>
        <Button variant="secondary" onClick={onLogout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
