import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/admin/page-header";
import { CreateClientForm } from "@/domains/clients/components/form/create-client-form";

export const metadata: Metadata = { title: "Nuevo cliente" };

/** La sesión la verifica la Server Action al enviar; el proxy ya filtró el acceso. */
export default function NewClientPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <PageHeader
        eyebrow="Clientes"
        title="Nuevo cliente"
        description="Registra el conjunto e invita a su administrador. El cliente quedará pendiente de activación."
      />
      <CreateClientForm />
    </div>
  );
}
