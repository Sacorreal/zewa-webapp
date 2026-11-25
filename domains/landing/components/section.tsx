import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTone = "white" | "subtle" | "navy";

const TONE_CLASSES: Record<SectionTone, string> = {
  white: "bg-white",
  subtle: "bg-subtle border-y border-line",
  navy: "bg-navy text-white",
};

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}

export function Section({ id, tone = "white", className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 lg:py-28", TONE_CLASSES[tone], className)}>
      <div className="mx-auto w-full max-w-[1280px] px-5 lg:px-8">{children}</div>
    </section>
  );
}
