import { Suspense } from "react";
import { AdminShell } from "@/components/layout/admin/admin-shell";
import {
  AdminUserMenu,
  AdminUserMenuSkeleton,
} from "@/domains/admin-auth/components/admin-user-menu";

/**
 * La sesión se lee dentro de `<Suspense>` (Cache Components): el marco del
 * panel se prerenderiza y cada página verifica la sesión en su propia carga.
 */
export default function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <AdminShell
      userMenu={
        <Suspense fallback={<AdminUserMenuSkeleton />}>
          <AdminUserMenu />
        </Suspense>
      }
    >
      {children}
    </AdminShell>
  );
}
