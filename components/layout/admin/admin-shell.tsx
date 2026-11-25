"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, Suspense, useState } from "react";
import { ZewaLogo } from "@/components/brand/zewa-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_ITEMS, isNavItemActive } from "./admin-navigation";

interface AdminShellProps {
  userMenu: ReactNode;
  children: ReactNode;
}

/** Estructura del panel global: barra lateral (cajón en móvil), encabezado y contenido. */
export function AdminShell({ userMenu, children }: AdminShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="flex min-h-svh flex-1 bg-subtle">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-8 bg-sidebar px-4 py-6 text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Navegación del panel"
      >
        <div className="flex items-center justify-between px-2">
          <ZewaLogo tone="onDark" />
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-white lg:hidden"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            <X />
          </Button>
        </div>
        <Suspense fallback={<NavigationLinks pathname={null} onNavigate={closeMenu} />}>
          <AdminNavigation onNavigate={closeMenu} />
        </Suspense>
        <p className="mt-auto px-2 text-xs text-mist">Administración global</p>
      </aside>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-navy-deep/40 lg:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <Menu />
          </Button>
          <div className="ml-auto">{userMenu}</div>
        </header>
        <main className="flex flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

interface NavigationProps {
  onNavigate: () => void;
}

/** Lee la ruta actual (dato de runtime): va dentro de `<Suspense>`. */
function AdminNavigation({ onNavigate }: NavigationProps) {
  return <NavigationLinks pathname={usePathname()} onNavigate={onNavigate} />;
}

function NavigationLinks({ pathname, onNavigate }: NavigationProps & { pathname: string | null }) {
  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {ADMIN_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isNavItemActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-white",
                  active && "bg-sidebar-accent text-white",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
