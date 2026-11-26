import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCardLayout } from "@/components/layout/auth-card-layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TenantSelector } from "@/domains/tenant-auth/components/tenant-selector";
import { listSelectableTenants, logout } from "@/domains/tenant-auth/services/tenant-auth.actions";

export const metadata: Metadata = { title: "Elige tu conjunto" };

export default function SelectTenantPage() {
  return (
    <AuthCardLayout
      eyebrow="Residentes y propietarios"
      title="Elige tu conjunto"
      description="Tu cuenta pertenece a varios conjuntos. Selecciona en cuál quieres ingresar."
    >
      <Suspense fallback={<SelectableTenantsSkeleton />}>
        <SelectableTenants />
      </Suspense>
      <form action={logout}>
        <Button type="submit" variant="ghost" size="sm" className="w-full">
          Ingresar con otra cuenta
        </Button>
      </form>
    </AuthCardLayout>
  );
}

async function SelectableTenants() {
  const tenants = await listSelectableTenants();
  if (tenants.length === 0) {
    return (
      <p className="type-small text-ink-soft">
        No tienes conjuntos activos disponibles. Comunícate con la administración de tu conjunto.
      </p>
    );
  }
  return <TenantSelector tenants={tenants} />;
}

function SelectableTenantsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-full rounded-xl" />
    </div>
  );
}
