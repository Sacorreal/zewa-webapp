import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DetailSkeleton } from "@/components/layout/admin/detail-skeleton";
import { PageHeader } from "@/components/layout/admin/page-header";
import { EditClientForm } from "@/domains/clients/components/form/edit-client-form";
import { getClient } from "@/domains/clients/services/clients.actions";

export const metadata: Metadata = { title: "Editar cliente" };

export default function EditClientPage({ params }: PageProps<"/admin/clients/[id]/edit">) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <Suspense fallback={<DetailSkeleton />}>
        <EditClientContent params={params} />
      </Suspense>
    </div>
  );
}

async function EditClientContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Editar cliente"
        title={client.name}
        description="El correo del administrador no se edita aquí: se gestiona con la invitación."
      />
      <EditClientForm client={client} />
    </>
  );
}
