"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { NEW_PASSWORD_HINT, type SetPasswordInput } from "@/lib/validation/password";
import { FormField, fieldA11y } from "./form-field";
import { PasswordInput } from "./password-input";

interface NewPasswordFieldsProps {
  register: UseFormRegister<SetPasswordInput>;
  errors: FieldErrors<SetPasswordInput>;
  passwordLabel?: string;
}

/** Contraseña nueva y su confirmación (activación de cuenta y recuperación). */
export function NewPasswordFields({
  register,
  errors,
  passwordLabel = "Contraseña",
}: NewPasswordFieldsProps) {
  return (
    <>
      <FormField
        id="password"
        label={passwordLabel}
        error={errors.password?.message}
        hint={NEW_PASSWORD_HINT}
      >
        <PasswordInput
          {...fieldA11y("password", errors.password?.message, NEW_PASSWORD_HINT)}
          autoComplete="new-password"
          {...register("password")}
        />
      </FormField>
      <FormField
        id="confirmPassword"
        label="Confirmar contraseña"
        error={errors.confirmPassword?.message}
      >
        <PasswordInput
          {...fieldA11y("confirmPassword", errors.confirmPassword?.message)}
          autoComplete="new-password"
          {...register("confirmPassword")}
        />
      </FormField>
    </>
  );
}
