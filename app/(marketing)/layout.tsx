import type { ReactNode } from "react";
import { SiteFooter } from "@/domains/landing/components/site-footer";
import { SiteHeader } from "@/domains/landing/components/site-header";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
