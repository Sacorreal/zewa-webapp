import { MailCheck } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { loginHref } from "@/domains/tenant-auth/content/login-modes";
import type { LoginMode } from "@/domains/tenant-auth/types/tenant-auth.types";

interface RecoveryRequestSentProps {
  message: string;
  mode: LoginMode;
}

/** Confirmación genérica: nunca indica si la cuenta existe. */
export function RecoveryRequestSent({ message, mode }: RecoveryRequestSentProps) {
  return (
    <div aria-live="polite" className="flex flex-col items-center gap-4 text-center">
      <MailCheck className="size-10 text-petrol" aria-hidden="true" />
      <p className="font-medium text-navy">Revisa tu correo</p>
      <p className="text-sm text-ink-soft">{message}</p>
      <p className="text-sm text-ink-soft">
        El enlace vence en unos minutos. Si no lo ves, revisa la carpeta de spam o vuelve a
        intentarlo más tarde.
      </p>
      <Link href={loginHref(mode)} className={buttonVariants({ variant: "outline" })}>
        Volver a iniciar sesión
      </Link>
    </div>
  );
}
