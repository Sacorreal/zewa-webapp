import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCardLayout } from "@/components/layout/auth-card-layout";
import { AppProviders } from "@/components/providers/app-providers";
import { Skeleton } from "@/components/ui/skeleton";
import { ForgotPasswordPanel } from "@/domains/password-recovery/components/forgot-password-panel";
import {
  LOGIN_MODE_QUERY_PARAM,
  parseLoginMode,
} from "@/domains/tenant-auth/content/login-modes";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
  robots: { index: false, follow: false },
};

/** Solicitud del enlace para restablecer la contraseña (administrador o residente/propietario). */
export default function PasswordRecoveryPage({ searchParams }: PageProps<"/recuperar-contrasena">) {
  return (
    <AppProviders>
      <AuthCardLayout
        eyebrow="Recuperar contraseña"
        title="¿Olvidaste tu contraseña?"
        description="Te enviaremos un enlace para definir una nueva."
      >
        <Suspense fallback={<PanelFallback />}>
          <PanelWithMode searchParams={searchParams} />
        </Suspense>
      </AuthCardLayout>
    </AppProviders>
  );
}

async function PanelWithMode({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return <ForgotPasswordPanel initialMode={parseLoginMode(params[LOGIN_MODE_QUERY_PARAM])} />;
}

function PanelFallback() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}
