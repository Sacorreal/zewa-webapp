import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { SANCTION_CASE, SANCTION_STEPS, type StepState } from "../../content/mockups";
import { StatusBadge } from "../status-badge";
import { MockupCard, MockupFrame } from "./mockup-frame";

const NODE_CLASSES: Record<StepState, string> = {
  done: "bg-petrol border-petrol",
  current: "bg-warning border-warning",
  upcoming: "bg-white border-line-strong",
};

export function SanctionCaseMockup() {
  return (
    <MockupFrame caption="Expediente sancionatorio ilustrativo con línea de tiempo." section="Jurídico / Expedientes" activeItem="Jurídico" withSidebar>
      <MockupCard>
        <div className="flex items-start justify-between gap-2 border-b border-line pb-2.5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold text-ink-soft">{SANCTION_CASE.reference}</p>
            <p className="truncate font-heading text-sm font-bold text-navy">{SANCTION_CASE.title}</p>
            <p className="text-[10px] text-ink-soft">{SANCTION_CASE.unit}</p>
          </div>
          <StatusBadge status={SANCTION_CASE.status} />
        </div>

        <ol className="mt-3 flex flex-col">
          {SANCTION_STEPS.map((step, index) => (
            <li key={step.title} className="relative flex gap-3 pb-3 last:pb-0">
              {index < SANCTION_STEPS.length - 1 && (
                <span className="absolute left-[5px] top-3 h-full w-0.5 bg-line" aria-hidden="true" />
              )}
              <span className={cn("relative mt-1 size-3 shrink-0 rounded-full border-2", NODE_CLASSES[step.state])} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn("text-[11px] font-semibold", step.state === "upcoming" ? "text-ink-soft" : "text-navy")}>
                    {step.title}
                  </p>
                  <span className="text-[10px] text-ink-soft">{step.date}</span>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-[10px] text-ink-soft">
                  <Paperclip className="size-3" aria-hidden="true" />
                  {step.evidence}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </MockupCard>
    </MockupFrame>
  );
}
