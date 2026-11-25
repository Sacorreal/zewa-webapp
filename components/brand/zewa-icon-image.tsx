import { ImageResponse } from "next/og";
import { ZewaSymbol } from "./zewa-symbol";

/** Genera el PNG del símbolo ZEWA para las convenciones `icon` y `apple-icon` de Next.js. */
export function renderZewaIcon(size: number) {
  return new ImageResponse(<ZewaSymbol size={size} />, { width: size, height: size });
}
