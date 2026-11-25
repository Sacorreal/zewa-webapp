/* eslint-disable @next/next/no-img-element -- el logo viene del CDN de Spaces, sin optimizar por next/image */
import { ZewaSymbol } from "@/components/brand/zewa-symbol";
import { cn } from "@/lib/utils";

interface ClientLogoProps {
  name: string;
  logoUrl: string | null;
  className?: string;
}

/** Logo del conjunto o, si no tiene, el símbolo institucional de ZEWA. */
export function ClientLogo({ name, logoUrl, className }: ClientLogoProps) {
  if (!logoUrl) {
    return <ZewaSymbol className={cn("size-10 shrink-0", className)} />;
  }
  return (
    <img
      src={logoUrl}
      alt={`Logo de ${name}`}
      className={cn("size-10 shrink-0 rounded-lg border border-line bg-white object-contain", className)}
    />
  );
}
