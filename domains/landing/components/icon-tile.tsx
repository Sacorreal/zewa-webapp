import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconTileTone = "sage" | "navy" | "glass";

const TONE_CLASSES: Record<IconTileTone, string> = {
  sage: "bg-sage text-petrol",
  navy: "bg-navy text-white",
  glass: "bg-white/10 text-petrol-glow",
};

interface IconTileProps {
  icon: LucideIcon;
  tone?: IconTileTone;
  className?: string;
}

export function IconTile({ icon: Icon, tone = "sage", className }: IconTileProps) {
  return (
    <span
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-xl",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
