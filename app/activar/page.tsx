import { LinkIcon } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCardLayout } from "@/components/layout/auth-card-layout";
import { AppProviders } from "@/components/providers/app-providers";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivationForm } from "@/domains/invitations/components/activation-form";
import { validateInvitation } from "@/domains/invitations/services/invitations.actions";

export const metadata: Metadata = {
  title: "Activar cuenta",
  robots: { index: false, follow: false },
};

/** Destino del enlace del correo de invitación (`/activar?token=...`). */
export default function ActivatePage({ searchParams }: PageProps<"/activar">) {
  return (
    <AppProviders>
      <Suspense fallback={<ActivationSkeleton />}>
        <Activation searchParams={searchParams} />
      </Suspense>
    </AppProviders>
  );
}

async function Activation({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { token } = await searchParams;
  const tokenValue = typeof token === "string" ? token : undefined;
  const result = await validateInvitation(tokenValue);

  if (!result.valid || !tokenValue) {
    return (
      <AuthCardLayout eyebrow="Activación de cuenta" title="Este enlace ya no es válido">
        <div className="flex items-start gap-3 text-sm text-ink">
          <LinkIcon className="mt-0.5 size-4 shrink-0 text-mist" aria-hidden="true" />
          <p>
            {result.valid ? "El enlace de activación no es válido." : result.reason} Pide a ZEWA que
            reenvíe la invitación.
          </p>
        </div>
      </AuthCardLayout>
    );
  }

  const { data: invitation } = result;
  return (
    <AuthCardLayout
      eyebrow="Activación de cuenta"
      title={`Administra ${invitation.clientName}`}
      description="Fuiste invitado como administrador del conjunto en ZEWA."
    >
      <ActivationForm token={tokenValue} invitation={invitation} />
    </AuthCardLayout>
  );
}

function ActivationSkeleton() {
  return (
    <main className="flex min-h-svh flex-1 items-center justify-center bg-subtle px-4">
      <Skeleton className="h-96 w-full max-w-md rounded-panel" />
    </main>
  );
}
