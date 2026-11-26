import type { Metadata } from "next";
import { Suspense } from "react";
import {
  TenantWelcome,
  TenantWelcomeSkeleton,
} from "@/domains/tenant-auth/components/tenant-welcome";

export const metadata: Metadata = { title: "Inicio" };

/** Página base del conjunto; el dashboard operativo vendrá en su propio requerimiento. */
export default function TenantHomePage() {
  return (
    <Suspense fallback={<TenantWelcomeSkeleton />}>
      <TenantWelcome />
    </Suspense>
  );
}
