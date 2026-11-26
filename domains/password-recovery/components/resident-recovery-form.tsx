"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/shared/form-alert";
import { FormField, fieldA11y } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResidentResetRequest } from "../hooks/use-password-recovery.hooks";
import {
  type ResidentResetRequestInput,
  residentResetRequestSchema,
} from "../validations/password-recovery.schema";
import { BackToLoginLink } from "./back-to-login-link";
import { RecoveryRequestSent } from "./recovery-request-sent";

const MODE = "residente";

export function ResidentRecoveryForm() {
  const request = useResidentResetRequest();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResidentResetRequestInput>({ resolver: zodResolver(residentResetRequestSchema) });

  if (request.data) return <RecoveryRequestSent message={request.data} mode={MODE} />;

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => request.mutate(values))}
      className="flex flex-col gap-5"
    >
      <FormAlert message={request.error?.message} />

      <FormField id="recovery-email" label="Correo electrónico" error={errors.email?.message}>
        <Input
          {...fieldA11y("recovery-email", errors.email?.message)}
          type="email"
          autoComplete="username"
          autoFocus
          {...register("email")}
        />
      </FormField>

      <Button type="submit" size="lg" disabled={request.isPending}>
        {request.isPending ? "Enviando…" : "Enviar enlace"}
      </Button>

      <BackToLoginLink mode={MODE} />
    </form>
  );
}
