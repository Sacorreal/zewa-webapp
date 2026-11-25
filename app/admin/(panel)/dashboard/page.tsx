import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/admin/page-header";
import { buttonVariants } from "@/components/ui/button";
import {
  AdminDashboardCards,
  AdminDashboardCardsSkeleton,
} from "@/domains/clients/components/admin-dashboard-cards";
import { ClientsTable, ClientsTableSkeleton } from "@/domains/clients/components/clients-table";
import { listClients } from "@/domains/clients/services/clients.actions";

export const metadata: Metadata = { title: "Resumen" };

const RECENT_CLIENTS = 5;

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Administración global"
        title="Resumen de la plataforma"
        description="Estado de los conjuntos registrados en ZEWA."
        actions={
          <Link href="/admin/clients/new" className={buttonVariants()}>
            <Plus data-icon="inline-start" aria-hidden="true" />
            Nuevo cliente
          </Link>
        }
      />
      <Suspense fallback={<AdminDashboardCardsSkeleton />}>
        <AdminDashboardCards />
      </Suspense>
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="type-h4 text-navy">Clientes recientes</h2>
          <Link href="/admin/clients" className="text-sm font-medium text-petrol hover:underline">
            Ver todos
          </Link>
        </div>
        <Suspense fallback={<ClientsTableSkeleton rows={RECENT_CLIENTS} />}>
          <RecentClients />
        </Suspense>
      </section>
    </>
  );
}

async function RecentClients() {
  const { items } = await listClients({ page: 1, pageSize: RECENT_CLIENTS, sort: "createdAt:desc" });
  return <ClientsTable clients={items} />;
}
