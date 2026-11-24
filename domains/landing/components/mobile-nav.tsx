"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MAIN_NAV, ROUTES } from "../content/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="flex size-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-subtle focus-visible:outline-2 focus-visible:outline-petrol"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <nav
        id="mobile-nav-panel"
        aria-label="Navegación principal"
        className={cn(
          "absolute inset-x-0 top-full border-b border-line bg-white px-5 pb-6 pt-2 shadow-pop",
          open ? "block animate-in fade-in slide-in-from-top-2" : "hidden",
        )}
      >
        <ul className="flex flex-col">
          {MAIN_NAV.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                className="block border-b border-line py-3.5 text-[15px] font-medium text-ink transition-colors hover:text-navy"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-col gap-3">
          <Link
            href={ROUTES.demo}
            onClick={close}
            className={cn(buttonVariants({ size: "lg" }), "w-full")}
          >
            Solicitar una demo
          </Link>
          <Link
            href={ROUTES.login}
            onClick={close}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
          >
            Iniciar sesión
          </Link>
        </div>
      </nav>
    </div>
  );
}
