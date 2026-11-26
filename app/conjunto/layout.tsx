import type { Metadata } from "next";
import { AppProviders } from "@/components/providers/app-providers";

export const metadata: Metadata = {
  title: { default: "Mi conjunto", template: "%s | ZEWA" },
  robots: { index: false, follow: false },
};

export default function TenantAreaLayout({ children }: LayoutProps<"/conjunto">) {
  return <AppProviders>{children}</AppProviders>;
}
