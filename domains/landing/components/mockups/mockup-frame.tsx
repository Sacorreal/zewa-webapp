import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PROPERTY_NAME, SIDEBAR_ITEMS } from "../../content/mockups";

interface MockupFrameProps {
  caption: string;
  section: string;
  activeItem?: string;
  withSidebar?: boolean;
  className?: string;
  children: ReactNode;
}

function WindowBar({ section }: { section: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-subtle px-4 py-2.5">
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
        <span className="size-2.5 rounded-full bg-line-strong" />
      </div>
      <p className="truncate text-[11px] text-ink-soft">
        ZEWA / <span className="font-semibold text-navy">{section}</span>
      </p>
    </div>
  );
}

function MockupSidebar({ activeItem }: { activeItem?: string }) {
  return (
    <aside className="hidden w-40 shrink-0 flex-col gap-1 bg-navy-deep p-3 sm:flex" aria-hidden="true">
      <p className="mb-1 truncate px-2 text-[10px] font-semibold text-mist">{PROPERTY_NAME}</p>
      {SIDEBAR_ITEMS.map(({ icon: Icon, label }) => (
        <span
          key={label}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px]",
            label === activeItem ? "bg-white/10 font-semibold text-white" : "text-[#d7e3fc]",
          )}
        >
          <Icon className={cn("size-3.5", label === activeItem && "text-petrol-glow")} />
          {label}
        </span>
      ))}
    </aside>
  );
}

/** Marco común a todos los mockups para que se lean como pantallas del mismo producto. */
export function MockupFrame({
  caption,
  section,
  activeItem,
  withSidebar = false,
  className,
  children,
}: MockupFrameProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-card border border-line bg-white shadow-pop",
        className,
      )}
    >
      <figcaption className="sr-only">{caption}</figcaption>
      <WindowBar section={section} />
      <div className="flex" aria-hidden="true">
        {withSidebar && <MockupSidebar activeItem={activeItem} />}
        <div className="min-w-0 flex-1 bg-subtle/60 p-4">{children}</div>
      </div>
    </figure>
  );
}

export function MockupCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-lg border border-line bg-white p-3 shadow-card", className)}>
      {children}
    </div>
  );
}

export function ProgressBar({ percent, tone = "petrol" }: { percent: number; tone?: "petrol" | "warning" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-subtle">
      <div
        className={cn("h-full rounded-full", tone === "petrol" ? "bg-petrol" : "bg-warning")}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
