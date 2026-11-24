import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  inverted?: boolean;
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  inverted = false,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-3xl flex-col gap-3",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <span className={cn("type-eyebrow", inverted ? "text-petrol-glow" : "text-petrol")}>
        {eyebrow}
      </span>
      <Heading
        className={cn(Heading === "h1" ? "type-display" : "type-h2", inverted ? "text-white" : "text-navy")}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className={cn("type-lead", inverted ? "text-white/75" : "text-ink")}>{subtitle}</p>
      )}
    </div>
  );
}
