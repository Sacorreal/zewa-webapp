import { cn } from "@/lib/utils";
import { BRAND_COLORS, ZewaSymbol } from "./zewa-symbol";

type LogoTone = "onLight" | "onDark";

interface ZewaLogoProps {
  tone?: LogoTone;
  className?: string;
  wordmarkClassName?: string;
}

const WORDMARK_COLOR: Record<LogoTone, string> = {
  onLight: "text-navy",
  onDark: "text-white",
};

const SYMBOL_BACKGROUND: Record<LogoTone, string> = {
  onLight: BRAND_COLORS.navy,
  onDark: BRAND_COLORS.translucent,
};

export function ZewaLogo({ tone = "onLight", className, wordmarkClassName }: ZewaLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <ZewaSymbol background={SYMBOL_BACKGROUND[tone]} className="size-8 shrink-0" />
      <span
        className={cn(
          "font-heading text-xl font-extrabold tracking-[0.12em]",
          WORDMARK_COLOR[tone],
          wordmarkClassName,
        )}
      >
        ZEWA
      </span>
    </span>
  );
}
