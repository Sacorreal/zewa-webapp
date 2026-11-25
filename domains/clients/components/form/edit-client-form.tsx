"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { FormAlert } from "@/components/shared/form-alert";
import { Button } from "@/components/ui/button";
import { useUpdateClient } from "../../hooks/use-client-mutations.hooks";
import type { ClientSummary } from "../../types/client.types";
import { type UpdateClientInput, updateClientSchema } from "../../validations/client.schema";
import { ClientIdentityFields } from "./client-identity-fields";
import { FormActions, FormSection } from "./form-layout";
import { LogoField } from "./logo-field";

export function EditClientForm({ client }: { client: ClientSummary }) {
  const updateClient = useUpdateClient(client.id);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<UpdateClientInput>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: { name: client.name, taxId: client.taxId, removeLogo: false },
  });

  const removeLogo = useWatch({ control, name: "removeLogo" });
  const pending = updateClient.isPending || updateClient.isSuccess;

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => updateClient.mutate(values))}
      className="flex flex-col gap-6"
    >
      <FormAlert message={updateClient.error?.message} />

      <FormSection title="Datos del conjunto">
        <ClientIdentityFields register={register} errors={errors} />
        <Controller
          control={control}
          name="logo"
          render={({ field, fieldState }) => (
            <LogoField
              file={field.value}
              onFileChange={(file) => {
                field.onChange(file);
                if (file) setValue("removeLogo", false, { shouldDirty: true });
              }}
              currentUrl={client.logoUrl}
              removed={removeLogo}
              onRemove={() => setValue("removeLogo", true, { shouldDirty: true })}
              error={fieldState.error?.message}
              disabled={pending}
            />
          )}
        />
      </FormSection>

      <FormActions cancelHref={`/admin/clients/${client.id}`}>
        <Button type="submit" disabled={pending || !isDirty}>
          {pending ? "Guardando…" : "Guardar cambios"}
        </Button>
      </FormActions>
    </form>
  );
}
