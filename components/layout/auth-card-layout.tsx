import type { ReactNode } from "react";
import { ZewaLogo } from "@/components/brand/zewa-logo";

interface AuthCardLayoutProps {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

/** Pantalla centrada para login y activación de cuentas. */
export function AuthCardLayout({ eyebrow, title, description, children }: AuthCardLayoutProps) {
  return (
    <main className="flex min-h-svh flex-1 items-center justify-center bg-subtle px-4 py-12">
      <div className="flex w-full max-w-md flex-col gap-8">
        <ZewaLogo className="self-center" />
        <section className="flex flex-col gap-6 rounded-panel border border-line bg-white p-6 shadow-card sm:p-8">
          <header className="flex flex-col gap-2">
            <span className="type-eyebrow text-petrol">{eyebrow}</span>
            <h1 className="type-h3 text-navy">{title}</h1>
            {description && <p className="type-small text-ink-soft">{description}</p>}
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}
