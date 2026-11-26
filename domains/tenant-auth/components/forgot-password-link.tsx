import Link from "next/link";
import { passwordRecoveryHref } from "../content/login-modes";
import type { LoginMode } from "../types/tenant-auth.types";

/** Enlace a la recuperación de contraseña con el mismo tipo de acceso. */
export function ForgotPasswordLink({ mode }: { mode: LoginMode }) {
  return (
    <Link
      href={passwordRecoveryHref(mode)}
      className="-mt-2 self-end text-sm font-medium text-petrol underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-petrol"
    >
      ¿Olvidaste tu contraseña?
    </Link>
  );
}
