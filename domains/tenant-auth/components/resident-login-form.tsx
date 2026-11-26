"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/shared/form-alert";
import { FormField, fieldA11y } from "@/components/shared/form-field";
import { PasswordInput } from "@/components/shared/password-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type EmailLoginInput, emailLoginSchema } from "@/lib/validation/credentials";
import { useResidentLogin } from "../hooks/use-tenant-auth.hooks";
import { ForgotPasswordLink } from "./forgot-password-link";

export function ResidentLoginForm() {
  const login = useResidentLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailLoginInput>({ resolver: zodResolver(emailLoginSchema) });

  const pending = login.isPending || login.isSuccess;

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => login.mutate(values))}
      className="flex flex-col gap-5"
    >
      <FormAlert message={login.error?.message} />

      <FormField id="email" label="Correo electrónico" error={errors.email?.message}>
        <Input
          {...fieldA11y("email", errors.email?.message)}
          type="email"
          autoComplete="username"
          autoFocus
          {...register("email")}
        />
      </FormField>

      <FormField id="resident-password" label="Contraseña" error={errors.password?.message}>
        <PasswordInput
          {...fieldA11y("resident-password", errors.password?.message)}
          autoComplete="current-password"
          {...register("password")}
        />
      </FormField>

      <ForgotPasswordLink mode="residente" />

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Ingresando…" : "Ingresar"}
      </Button>
    </form>
  );
}
