import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { loginHref } from "@/domains/tenant-auth/content/login-modes";
import type { LoginMode } from "@/domains/tenant-auth/types/tenant-auth.types";

export function BackToLoginLink({ mode }: { mode: LoginMode }) {
  return (
    <Link
      href={loginHref(mode)}
      className="inline-flex items-center gap-1.5 self-center text-sm font-medium text-petrol underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-petrol"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Volver a iniciar sesión
    </Link>
  );
}
