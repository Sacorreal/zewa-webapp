import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCardLayout } from "@/components/layout/auth-card-layout";
import { AppProviders } from "@/components/providers/app-providers";
import { Skeleton } from "@/components/ui/skeleton";
import { LoginPanel } from "@/domains/tenant-auth/components/login-panel";
import {
  DEFAULT_LOGIN_MODE,
  LOGIN_MODE_QUERY_PARAM,
  parseLoginMode,
} from "@/domains/tenant-auth/content/login-modes";

export const metadata: Metadata = { title: "Iniciar sesión" };

/** Acceso de los usuarios de un conjunto: administrador (NIT) o residente/propietario (correo). */
export default function LoginPage({ searchParams }: PageProps<"/iniciar-sesion">) {
  return (
    <AppProviders>
      <AuthCardLayout
        eyebrow="Iniciar sesión"
        title="Ingresa a tu conjunto"
        description="Elige cómo quieres ingresar a ZEWA."
      >
        <Suspense fallback={<LoginPanelFallback />}>
          <LoginPanelWithMode searchParams={searchParams} />
        </Suspense>
      </AuthCardLayout>
    </AppProviders>
  );
}

async function LoginPanelWithMode({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return <LoginPanel initialMode={parseLoginMode(params[LOGIN_MODE_QUERY_PARAM])} />;
}

/** Mientras se leen los parámetros se muestra el modo por defecto, sin saltos de diseño. */
function LoginPanelFallback() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true" data-mode={DEFAULT_LOGIN_MODE}>
      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
