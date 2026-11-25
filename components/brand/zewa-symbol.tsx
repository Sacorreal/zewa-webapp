export const BRAND_COLORS = {
  navy: "#14263d",
  glow: "#9af2e6",
  white: "#ffffff",
  stroke: "rgba(255, 255, 255, 0.85)",
  translucent: "rgba(255, 255, 255, 0.1)",
} as const;

interface ZewaSymbolProps {
  background?: string;
  size?: number;
  className?: string;
}

/**
 * Símbolo ZEWA: tres nodos conectados en trazo de "Z" (conexión, orden y trazabilidad).
 * Usa colores explícitos para poder renderizarse también en `ImageResponse` (favicon e iconos).
 */
export function ZewaSymbol({ background = BRAND_COLORS.navy, size, className }: ZewaSymbolProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="8" fill={background} />
      <path
        d="M9 10h14L9 22h14"
        fill="none"
        stroke={BRAND_COLORS.stroke}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="10" r="2.6" fill={BRAND_COLORS.glow} />
      <circle cx="23" cy="22" r="2.6" fill={BRAND_COLORS.glow} />
      <circle cx="16" cy="16" r="2.1" fill={BRAND_COLORS.white} />
    </svg>
  );
}
