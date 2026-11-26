import { LinkIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthCardLayout } from "@/components/layout/auth-card-layout";
import { AppProviders } from "@/components/providers/app-providers";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ResetPasswordForm } from "@/domains/password-recovery/components/reset-password-form";
import { RESET_DESCRIPTIONS } from "@/domains/password-recovery/content/audience";
import { validateResetToken } from "@/domains/password-recovery/services/password-recovery.actions";
import { PASSWORD_RECOVERY_PATH } from "@/domains/tenant-auth/content/login-modes";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
  robots: { index: false, follow: false },
};

const EYEBROW = "Restablecer contraseña";

/** Destino del enlace del correo de recuperación (`/restablecer-contrasena?token=...`). */
export default function ResetPasswordPage({ searchParams }: PageProps<"/restablecer-contrasena">) {
  return (
    <AppProviders>
      <Suspense fallback={<ResetSkeleton />}>
        <PasswordReset searchParams={searchParams} />
      </Suspense>
    </AppProviders>
  );
}

async function PasswordReset({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { token } = await searchParams;
  const tokenValue = typeof token === "string" ? token : undefined;
  const result = await validateResetToken(tokenValue);

  if (!result.valid || !tokenValue) {
    return (
      <AuthCardLayout eyebrow={EYEBROW} title="Este enlace ya no es válido">
        <div className="flex items-start gap-3 text-sm text-ink">
          <LinkIcon className="mt-0.5 size-4 shrink-0 text-mist" aria-hidden="true" />
          <p>{result.valid ? "El enlace para restablecer la contraseña no es válido." : result.reason}</p>
        </div>
        <Link href={PASSWORD_RECOVERY_PATH} className={buttonVariants({ size: "lg" })}>
          Solicitar un enlace nuevo
        </Link>
      </AuthCardLayout>
    );
  }

  const { data: preview } = result;
  return (
    <AuthCardLayout
      eyebrow={EYEBROW}
      title="Define tu contraseña nueva"
      description={RESET_DESCRIPTIONS[preview.audience]}
    >
      <ResetPasswordForm token={tokenValue} preview={preview} />
    </AuthCardLayout>
  );
}

function ResetSkeleton() {
  return (
    <main className="flex min-h-svh flex-1 items-center justify-center bg-subtle px-4">
      <Skeleton className="h-96 w-full max-w-md rounded-panel" />
    </main>
  );
}
