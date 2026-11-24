import { cn } from "@/lib/utils";
import type { StatusLabel, StatusTone } from "../types/landing.types";

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "bg-sage text-petrol border-petrol/20",
  warning: "bg-warning-soft text-warning-ink border-warning/40",
  neutral: "bg-subtle text-ink border-line",
};

interface StatusBadgeProps {
  status: StatusLabel;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold leading-4",
        TONE_CLASSES[status.tone],
        className,
      )}
    >
      {status.label}
    </span>
  );
}
