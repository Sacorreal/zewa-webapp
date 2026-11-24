import { renderZewaIcon } from "@/components/brand/zewa-icon-image";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return renderZewaIcon(size.width);
}
