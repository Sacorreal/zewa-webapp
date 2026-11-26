"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/shared/form-alert";
import { FormField, fieldA11y } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdministratorResetRequest } from "../hooks/use-password-recovery.hooks";
import {
  type AdministratorResetRequestInput,
  administratorResetRequestSchema,
} from "../validations/password-recovery.schema";
import { BackToLoginLink } from "./back-to-login-link";
import { RecoveryRequestSent } from "./recovery-request-sent";

const MODE = "administrador";
const NIT_HINT = "Con o sin dígito de verificación, p. ej. 900.123.456-8.";

export function AdministratorRecoveryForm() {
  const request = useAdministratorResetRequest();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdministratorResetRequestInput>({
    resolver: zodResolver(administratorResetRequestSchema),
  });

  if (request.data) return <RecoveryRequestSent message={request.data} mode={MODE} />;

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => request.mutate(values))}
      className="flex flex-col gap-5"
    >
      <FormAlert message={request.error?.message} />

      <FormField id="recovery-nit" label="NIT del conjunto" error={errors.nit?.message} hint={NIT_HINT}>
        <Input
          {...fieldA11y("recovery-nit", errors.nit?.message, NIT_HINT)}
          autoComplete="username"
          autoFocus
          {...register("nit")}
        />
      </FormField>

      <Button type="submit" size="lg" disabled={request.isPending}>
        {request.isPending ? "Enviando…" : "Enviar enlace"}
      </Button>

      <BackToLoginLink mode={MODE} />
    </form>
  );
}
