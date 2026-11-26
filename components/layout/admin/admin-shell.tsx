"use client";

import { Menu, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, Suspense, useState } from "react";
import { ZewaHomeLink } from "@/components/brand/zewa-home-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_ITEMS, isNavItemActive } from "./admin-navigation";
import { useSidebarCollapsed } from "./use-sidebar-collapsed";

interface AdminShellProps {
  userMenu: ReactNode;
  children: ReactNode;
}

/** Oculta un elemento solo en escritorio con la barra colapsada (en móvil el cajón va siempre expandido). */
const HIDDEN_WHEN_COLLAPSED = "lg:sr-only";

/**
 * Estructura del panel global: barra lateral (cajón en móvil, colapsable a solo iconos en
 * escritorio), encabezado y contenido.
 */
export function AdminShell({ userMenu, children }: AdminShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { collapsed, toggle } = useSidebarCollapsed();
  const closeMenu = () => setMenuOpen(false);
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;
  const toggleLabel = collapsed ? "Expandir barra lateral" : "Colapsar barra lateral";

  return (
    <div className="flex min-h-svh flex-1 bg-subtle">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-8 bg-sidebar px-4 py-6 text-sidebar-foreground transition-[translate,width] lg:sticky lg:top-0 lg:h-svh lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full",
          collapsed && "lg:w-18 lg:px-3",
        )}
        aria-label="Navegación del panel"
      >
        <div
          className={cn(
            "flex items-center justify-between px-2",
            collapsed && "lg:justify-center lg:px-0",
          )}
        >
          <ZewaHomeLink
            tone="onDark"
            wordmarkClassName={collapsed ? HIDDEN_WHEN_COLLAPSED : undefined}
          />
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
        <Suspense
          fallback={
            <NavigationLinks pathname={null} collapsed={collapsed} onNavigate={closeMenu} />
          }
        >
          <AdminNavigation collapsed={collapsed} onNavigate={closeMenu} />
        </Suspense>
        <div className="mt-auto flex flex-col gap-3">
          <p className={cn("px-2 text-xs text-mist", collapsed && "lg:hidden")}>
            Administración global
          </p>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "hidden justify-start gap-3 px-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-white lg:flex",
              collapsed && "justify-center px-0",
            )}
            onClick={toggle}
            aria-label={toggleLabel}
            aria-expanded={!collapsed}
            title={toggleLabel}
          >
            <ToggleIcon className="size-4" aria-hidden="true" />
            <span className={cn(collapsed && "sr-only")}>Colapsar</span>
          </Button>
        </div>
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
  collapsed: boolean;
  onNavigate: () => void;
}

/** Lee la ruta actual (dato de runtime): va dentro de `<Suspense>`. */
function AdminNavigation(props: NavigationProps) {
  return <NavigationLinks pathname={usePathname()} {...props} />;
}

function NavigationLinks({
  pathname,
  collapsed,
  onNavigate,
}: NavigationProps & { pathname: string | null }) {
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
                title={collapsed ? label : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-white",
                  active && "bg-sidebar-accent text-white",
                  collapsed && "lg:justify-center lg:px-0",
                )}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span className={cn(collapsed && HIDDEN_WHEN_COLLAPSED)}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
