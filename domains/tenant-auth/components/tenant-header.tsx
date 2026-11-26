import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientLogo } from "@/domains/clients/components/client-logo";
import { requireTenantSession } from "@/lib/auth/tenant-session.server";
import { roleLabel } from "../content/roles";
import { logout } from "../services/tenant-auth.actions";

/** Conjunto activo, usuario y cierre de sesión. Lee la sesión: debe ir dentro de `<Suspense>`. */
export async function TenantHeader() {
  const { user, tenant } = await requireTenantSession();

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <ClientLogo name={tenant.name} logoUrl={tenant.logoUrl} className="size-9" />
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-heading font-bold text-navy">{tenant.name}</span>
          <span className="truncate text-xs text-ink-soft">
            {tenant.roles.map(roleLabel).join(" · ")}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden max-w-56 truncate text-sm text-ink sm:block">{user.email}</span>
        <form action={logout}>
          <Button type="submit" variant="outline" size="sm">
            <LogOut data-icon="inline-start" aria-hidden="true" />
            Cerrar sesión
          </Button>
        </form>
      </div>
    </div>
  );
}

export function TenantHeaderSkeleton() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <Skeleton className="h-9 w-56" />
      <Skeleton className="h-8 w-32" />
    </div>
  );
}
