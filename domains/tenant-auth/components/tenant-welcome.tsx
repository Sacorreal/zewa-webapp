import { Skeleton } from "@/components/ui/skeleton";
import { requireTenantSession } from "@/lib/auth/tenant-session.server";
import { roleLabel } from "../content/roles";

/** Bienvenida de la página base del conjunto. Lee la sesión: debe ir dentro de `<Suspense>`. */
export async function TenantWelcome() {
  const { tenant } = await requireTenantSession();
  const roles = tenant.roles.map(roleLabel).join(" y ").toLowerCase();

  return (
    <section className="flex flex-col gap-3 rounded-panel border border-line bg-white p-6 shadow-card sm:p-8">
      <span className="type-eyebrow text-petrol">Bienvenido</span>
      <h1 className="type-h3 text-navy">{tenant.name}</h1>
      <p className="type-small text-ink-soft">
        Ingresaste como {roles} del conjunto (NIT {tenant.taxId}). Muy pronto encontrarás aquí la
        gestión de tu copropiedad.
      </p>
    </section>
  );
}

export function TenantWelcomeSkeleton() {
  return <Skeleton className="h-40 w-full rounded-panel" />;
}
