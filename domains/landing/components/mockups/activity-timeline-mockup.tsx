import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";
import { TIMELINE_CASE, TIMELINE_EVENTS } from "../../content/transparency";
import { StatusBadge } from "../status-badge";

/** Línea de tiempo sobre fondo azul noche (sección 7). */
export function ActivityTimelineMockup() {
  return (
    <figure className="rounded-panel border border-navy-line bg-white/[0.03] p-5 shadow-pop sm:p-6">
      <figcaption className="border-b border-navy-line pb-4">
        <p className="type-eyebrow text-petrol-glow">{TIMELINE_CASE.label}</p>
        <p className="mt-1 font-heading text-lg font-bold text-white">{TIMELINE_CASE.title}</p>
        <p className="text-xs text-white/60">{TIMELINE_CASE.reference}</p>
      </figcaption>

      <ol className="mt-5 flex flex-col">
        {TIMELINE_EVENTS.map((event, index) => {
          const isPending = event.status.tone === "warning";
          return (
            <li key={event.title} className="relative flex gap-4 pb-5 last:pb-0">
              {index < TIMELINE_EVENTS.length - 1 && (
                <span className="absolute left-[7px] top-4 h-full w-0.5 bg-navy-line" aria-hidden="true" />
              )}
              <span
                className={cn(
                  "relative mt-1 size-4 shrink-0 rounded-full border-2 border-navy",
                  isPending ? "bg-warning" : "bg-petrol",
                )}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <p className="text-sm font-semibold text-white">{event.title}</p>
                  <StatusBadge status={event.status} />
                </div>
                <p className="mt-0.5 text-xs text-white/60">
                  {event.date} · {event.actor}
                </p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-[11px] text-white/80">
                  <Paperclip className="size-3" aria-hidden="true" />
                  {event.document}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
