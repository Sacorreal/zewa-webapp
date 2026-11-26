"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/shared/form-alert";
import { NewPasswordFields } from "@/components/shared/new-password-fields";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { type SetPasswordInput, setPasswordSchema } from "@/lib/validation/password";
import { useAcceptInvitation } from "../hooks/use-accept-invitation.hooks";
import type { InvitationPreview } from "../types/invitation.types";

interface ActivationFormProps {
  token: string;
  invitation: InvitationPreview;
}

/**
 * Acepta la invitación. Si la cuenta es nueva, define la contraseña; si el
 * usuario ya existía (administra otro conjunto), solo confirma.
 */
export function ActivationForm({ token, invitation }: ActivationFormProps) {
  const accept = useAcceptInvitation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordInput>({ resolver: zodResolver(setPasswordSchema) });

  if (accept.data) {
    return (
      <div aria-live="polite" className="flex flex-col items-center gap-3 text-center">
        <CircleCheck className="size-10 text-petrol" aria-hidden="true" />
        <p className="font-medium text-navy">Tu cuenta quedó activa</p>
        <p className="text-sm text-ink-soft">
          Ya eres administrador de {accept.data.clientName}. Podrás ingresar con {accept.data.email}{" "}
          cuando el acceso de administradores esté disponible.
        </p>
      </div>
    );
  }

  const pending = accept.isPending;
  const summary = (
    <dl className="grid gap-2 rounded-lg bg-subtle p-4 text-sm">
      <div className="flex justify-between gap-4">
        <dt className="text-ink-soft">Correo</dt>
        <dd className="truncate text-navy">{invitation.email}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-ink-soft">Vence</dt>
        <dd className="text-navy">{formatDateTime(invitation.expiresAt)}</dd>
      </div>
    </dl>
  );

  if (!invitation.requiresPassword) {
    return (
      <div className="flex flex-col gap-5">
        <FormAlert message={accept.error?.message} />
        {summary}
        <Button size="lg" disabled={pending} onClick={() => accept.mutate({ token })}>
          {pending ? "Activando…" : "Aceptar invitación"}
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(({ password }) => accept.mutate({ token, password }))}
      className="flex flex-col gap-5"
    >
      <FormAlert message={accept.error?.message} />
      {summary}
      <NewPasswordFields register={register} errors={errors} />
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Activando…" : "Activar cuenta"}
      </Button>
    </form>
  );
}
