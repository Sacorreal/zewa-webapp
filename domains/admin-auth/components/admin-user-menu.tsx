import { LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { requireAdminSession } from "@/lib/auth/admin-session.server";
import { logout } from "../services/auth.actions";

/** Usuario del panel y cierre de sesión. Lee la sesión: debe ir dentro de `<Suspense>`. */
export async function AdminUserMenu() {
  const { user } = await requireAdminSession();

  return (
    <div className="flex items-center gap-3">
      <span className="hidden items-center gap-2 text-sm text-ink sm:flex">
        <ShieldCheck className="size-4 text-petrol" aria-hidden="true" />
        <span className="max-w-56 truncate">{user.email}</span>
      </span>
      <form action={logout}>
        <Button type="submit" variant="outline" size="sm">
          <LogOut data-icon="inline-start" aria-hidden="true" />
          Cerrar sesión
        </Button>
      </form>
    </div>
  );
}

export function AdminUserMenuSkeleton() {
  return <Skeleton className="h-8 w-48" />;
}
