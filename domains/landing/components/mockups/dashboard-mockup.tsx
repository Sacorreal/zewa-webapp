import { FileCheck } from "lucide-react";
import {
  DASHBOARD_ACTIVITY,
  DASHBOARD_BUDGET,
  DASHBOARD_DOCUMENTATION,
  DASHBOARD_KPIS,
  PROPERTY_NAME,
} from "../../content/mockups";
import { StatusBadge } from "../status-badge";
import { MockupCard, MockupFrame, ProgressBar } from "./mockup-frame";

const label = "text-[10px] font-semibold uppercase tracking-wide text-ink-soft";

export function DashboardMockup() {
  return (
    <MockupFrame caption={`Vista ilustrativa del dashboard de ZEWA para ${PROPERTY_NAME}, con datos ficticios.`} section={`${PROPERTY_NAME} / Dashboard`} activeItem="Dashboard" withSidebar>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="font-heading text-sm font-bold text-navy">{PROPERTY_NAME}</p>
        <StatusBadge status={{ label: "Datos ilustrativos", tone: "neutral" }} />
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        <MockupCard>
          <div className="flex items-center justify-between">
            <span className={label}>{DASHBOARD_BUDGET.label}</span>
            <span className="text-[11px] font-semibold text-petrol">{DASHBOARD_BUDGET.percent}%</span>
          </div>
          <p className="mt-1 font-heading text-lg font-bold text-navy">
            {DASHBOARD_BUDGET.executed}
            <span className="text-xs font-medium text-ink-soft"> / {DASHBOARD_BUDGET.total}</span>
          </p>
          <ProgressBar percent={DASHBOARD_BUDGET.percent} />
        </MockupCard>

        <div className="grid grid-cols-3 gap-2.5">
          {DASHBOARD_KPIS.map((kpi) => (
            <MockupCard key={kpi.label} className="flex flex-col gap-1">
              <span className={`${label} line-clamp-1`}>{kpi.label}</span>
              <span className="font-heading text-xl font-bold text-navy">{kpi.value}</span>
              <StatusBadge status={kpi.status} className="self-start" />
            </MockupCard>
          ))}
        </div>

        <MockupCard className="flex items-center gap-3">
          <FileCheck className="size-4 shrink-0 text-petrol" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className={label}>{DASHBOARD_DOCUMENTATION.label}</span>
              <span className="text-[11px] font-semibold text-navy">{DASHBOARD_DOCUMENTATION.percent}%</span>
            </div>
            <ProgressBar percent={DASHBOARD_DOCUMENTATION.percent} />
            <p className="mt-1 text-[10px] text-ink-soft">{DASHBOARD_DOCUMENTATION.detail}</p>
          </div>
        </MockupCard>

        <MockupCard>
          <span className={label}>Actividad reciente</span>
          <ul className="mt-2 flex flex-col divide-y divide-line">
            {DASHBOARD_ACTIVITY.map((item) => (
              <li key={item.text} className="flex items-center gap-2 py-1.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-sage text-[9px] font-bold text-navy">
                  {item.initials}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-navy">{item.text}</span>
                <span className="hidden text-[10px] text-ink-soft md:inline">{item.time}</span>
                <StatusBadge status={item.status} />
              </li>
            ))}
          </ul>
        </MockupCard>
      </div>
    </MockupFrame>
  );
}
