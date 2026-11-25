"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FormAlert } from "@/components/shared/form-alert";
import { FormField, fieldA11y } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateClient } from "../../hooks/use-client-mutations.hooks";
import { type CreateClientInput, createClientSchema } from "../../validations/client.schema";
import { ClientCreatedSummary } from "../client-created-summary";
import { ClientIdentityFields } from "./client-identity-fields";
import { FormActions, FormSection } from "./form-layout";
import { LogoField } from "./logo-field";

const EMAIL_HINT = "Recibirá la invitación para activar su cuenta de administrador.";

export function CreateClientForm() {
  const createClient = useCreateClient();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientInput>({
    resolver: zodResolver(createClientSchema),
    defaultValues: { name: "", taxId: "", administratorEmail: "" },
  });

  if (createClient.data) {
    return (
      <ClientCreatedSummary
        result={createClient.data}
        onCreateAnother={() => {
          reset();
          createClient.reset();
        }}
      />
    );
  }

  const pending = createClient.isPending;

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => createClient.mutate(values))}
      className="flex flex-col gap-6"
    >
      <FormAlert message={createClient.error?.message} />

      <FormSection title="Datos del conjunto">
        <ClientIdentityFields register={register} errors={errors} />
        <Controller
          control={control}
          name="logo"
          render={({ field, fieldState }) => (
            <LogoField
              file={field.value}
              onFileChange={field.onChange}
              error={fieldState.error?.message}
              disabled={pending}
            />
          )}
        />
      </FormSection>

      <FormSection title="Administrador">
        <FormField
          id="administratorEmail"
          label="Correo del administrador"
          error={errors.administratorEmail?.message}
          hint={EMAIL_HINT}
        >
          <Input
            {...fieldA11y("administratorEmail", errors.administratorEmail?.message, EMAIL_HINT)}
            type="email"
            autoComplete="off"
            {...register("administratorEmail")}
          />
        </FormField>
      </FormSection>

      <FormActions cancelHref="/admin/clients">
        <Button type="submit" disabled={pending}>
          {pending ? "Creando cliente…" : "Crear cliente y enviar invitación"}
        </Button>
      </FormActions>
    </form>
  );
}
