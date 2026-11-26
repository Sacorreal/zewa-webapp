"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/shared/form-alert";
import { NewPasswordFields } from "@/components/shared/new-password-fields";
import { Button, buttonVariants } from "@/components/ui/button";
import { loginHref } from "@/domains/tenant-auth/content/login-modes";
import { formatDateTime } from "@/lib/format";
import { type SetPasswordInput, setPasswordSchema } from "@/lib/validation/password";
import { AUDIENCE_LOGIN_MODE } from "../content/audience";
import { useConfirmPasswordReset } from "../hooks/use-password-recovery.hooks";
import type { PasswordResetPreview } from "../types/password-recovery.types";

interface ResetPasswordFormProps {
  token: string;
  preview: PasswordResetPreview;
}

/** Define la contraseña nueva con el token del enlace del correo. */
export function ResetPasswordForm({ token, preview }: ResetPasswordFormProps) {
  const confirm = useConfirmPasswordReset();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordInput>({ resolver: zodResolver(setPasswordSchema) });

  if (confirm.data) {
    return (
      <div aria-live="polite" className="flex flex-col items-center gap-4 text-center">
        <CircleCheck className="size-10 text-petrol" aria-hidden="true" />
        <p className="font-medium text-navy">Tu contraseña quedó actualizada</p>
        <p className="text-sm text-ink-soft">
          Cerramos las sesiones abiertas en otros dispositivos. Ingresa con tu contraseña nueva.
        </p>
        <Link
          href={loginHref(AUDIENCE_LOGIN_MODE[confirm.data.audience])}
          className={buttonVariants({ size: "lg" })}
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  const pending = confirm.isPending;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(({ password }) => confirm.mutate({ token, password }))}
      className="flex flex-col gap-5"
    >
      <FormAlert message={confirm.error?.message} />
      <dl className="grid gap-2 rounded-lg bg-subtle p-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">Cuenta</dt>
          <dd className="truncate text-navy">{preview.email}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">El enlace vence</dt>
          <dd className="text-navy">{formatDateTime(preview.expiresAt)}</dd>
        </div>
      </dl>
      <NewPasswordFields register={register} errors={errors} passwordLabel="Contraseña nueva" />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Guardando…" : "Guardar contraseña"}
      </Button>
    </form>
  );
}
