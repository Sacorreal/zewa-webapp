import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DetailSkeleton } from "@/components/layout/admin/detail-skeleton";
import { ClientDetail } from "@/domains/clients/components/detail/client-detail";
import { getClient } from "@/domains/clients/services/clients.actions";

export const metadata: Metadata = { title: "Detalle del cliente" };

export default function ClientDetailPage({ params }: PageProps<"/admin/clients/[id]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ClientDetailContent params={params} />
    </Suspense>
  );
}

async function ClientDetailContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClient(id);
  if (!client) notFound();
  return <ClientDetail client={client} />;
}
