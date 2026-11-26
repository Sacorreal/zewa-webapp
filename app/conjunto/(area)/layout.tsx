import { Suspense } from "react";
import { TenantHeader, TenantHeaderSkeleton } from "@/domains/tenant-auth/components/tenant-header";

/**
 * Marco de la zona del conjunto (requiere sesión de alcance `tenant`). La
 * sesión se lee dentro de `<Suspense>` (Cache Components).
 */
export default function TenantWorkspaceLayout({ children }: LayoutProps<"/conjunto">) {
  return (
    <div className="flex min-h-svh flex-1 flex-col bg-subtle">
      <header className="sticky top-0 z-20 flex h-16 items-center border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
        <Suspense fallback={<TenantHeaderSkeleton />}>
          <TenantHeader />
        </Suspense>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
