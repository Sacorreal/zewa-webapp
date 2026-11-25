"use client";

import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { FormField, fieldA11y } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { CLIENT_NAME_MAX_LENGTH } from "../../validations/client.schema";

interface IdentityValues {
  name: string;
  taxId: string;
}

interface ClientIdentityFieldsProps<T extends IdentityValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<IdentityValues>;
}

const TAX_ID_HINT = "Con o sin dígito de verificación. Ej.: 900.123.456-8";

/** Nombre y NIT del conjunto: comunes a la creación y la edición. */
export function ClientIdentityFields<T extends IdentityValues>({
  register,
  errors,
}: ClientIdentityFieldsProps<T>) {
  return (
    <>
      <FormField id="name" label="Nombre del conjunto" error={errors.name?.message}>
        <Input
          {...fieldA11y("name", errors.name?.message)}
          maxLength={CLIENT_NAME_MAX_LENGTH}
          autoComplete="organization"
          {...register("name" as Path<T>)}
        />
      </FormField>
      <FormField id="taxId" label="NIT" error={errors.taxId?.message} hint={TAX_ID_HINT}>
        <Input
          {...fieldA11y("taxId", errors.taxId?.message, TAX_ID_HINT)}
          inputMode="numeric"
          {...register("taxId" as Path<T>)}
        />
      </FormField>
    </>
  );
}
