import Link from "next/link";
import { ZewaLogo } from "@/components/brand/zewa-logo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MAIN_NAV, ROUTES } from "../content/navigation";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur-xl">
      <div className="relative mx-auto flex h-18 w-full max-w-[1280px] items-center justify-between gap-6 px-5 lg:px-8">
        <Link href={ROUTES.home} aria-label="ZEWA, ir al inicio" className="rounded-lg">
          <ZewaLogo />
        </Link>

        <nav aria-label="Navegación principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {MAIN_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-ink transition-colors hover:text-navy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.login}
            className="hidden text-sm font-semibold text-ink transition-colors hover:text-navy sm:inline-flex"
          >
            Iniciar sesión
          </Link>
          <Link
            href={ROUTES.demo}
            className={cn(buttonVariants(), "hidden h-10 px-4 shadow-card sm:inline-flex")}
          >
            Solicitar una demo
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
