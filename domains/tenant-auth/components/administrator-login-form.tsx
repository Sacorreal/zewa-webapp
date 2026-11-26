"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormAlert } from "@/components/shared/form-alert";
import { FormField, fieldA11y } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdministratorLogin } from "../hooks/use-tenant-auth.hooks";
import {
  type AdministratorLoginInput,
  administratorLoginSchema,
} from "../validations/administrator-login.schema";
import { PasswordInput } from "./password-input";

const NIT_HINT = "Con o sin dígito de verificación, p. ej. 900.123.456-8.";

export function AdministratorLoginForm() {
  const login = useAdministratorLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdministratorLoginInput>({ resolver: zodResolver(administratorLoginSchema) });

  const pending = login.isPending || login.isSuccess;

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => login.mutate(values))}
      className="flex flex-col gap-5"
    >
      <FormAlert message={login.error?.message} />

      <FormField id="nit" label="NIT del conjunto" error={errors.nit?.message} hint={NIT_HINT}>
        <Input
          {...fieldA11y("nit", errors.nit?.message, NIT_HINT)}
          autoComplete="username"
          autoFocus
          {...register("nit")}
        />
      </FormField>

      <FormField id="admin-password" label="Contraseña" error={errors.password?.message}>
        <PasswordInput
          {...fieldA11y("admin-password", errors.password?.message)}
          autoComplete="current-password"
          {...register("password")}
        />
      </FormField>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Ingresando…" : "Ingresar como administrador"}
      </Button>
    </form>
  );
}
