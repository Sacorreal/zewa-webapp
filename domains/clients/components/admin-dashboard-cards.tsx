import { Building2, CircleCheck, Hourglass, PauseCircle, type LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getClientStats } from "../services/clients.actions";
import type { ClientStats } from "../types/client.types";

interface StatCard {
  key: keyof ClientStats;
  label: string;
  icon: LucideIcon;
  iconClass: string;
}

const STAT_CARDS: readonly StatCard[] = [
  { key: "total", label: "Clientes registrados", icon: Building2, iconClass: "bg-navy text-white" },
  { key: "active", label: "Activos", icon: CircleCheck, iconClass: "bg-sage text-petrol" },
  {
    key: "pendingActivation",
    label: "Pendientes de activación",
    icon: Hourglass,
    iconClass: "bg-warning-soft text-warning-ink",
  },
  { key: "suspended", label: "Suspendidos", icon: PauseCircle, iconClass: "bg-destructive/10 text-destructive" },
];

const GRID_CLASS = "grid gap-4 sm:grid-cols-2 xl:grid-cols-4";

export async function AdminDashboardCards() {
  const stats = await getClientStats();

  return (
    <ul className={GRID_CLASS}>
      {STAT_CARDS.map(({ key, label, icon: Icon, iconClass }) => (
        <li
          key={key}
          className="flex items-center gap-4 rounded-card border border-line bg-white p-5 shadow-card"
        >
          <span className={`flex size-11 items-center justify-center rounded-xl ${iconClass}`}>
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="font-heading text-2xl font-bold text-navy">{stats[key]}</span>
            <span className="text-sm text-ink-soft">{label}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function AdminDashboardCardsSkeleton() {
  return (
    <div className={GRID_CLASS}>
      {STAT_CARDS.map(({ key }) => (
        <Skeleton key={key} className="h-[86px] rounded-card" />
      ))}
    </div>
  );
}
