import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/admin/page-header";
import { Pagination } from "@/components/shared/pagination";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ClientsFilters } from "@/domains/clients/components/clients-filters";
import { ClientsTable, ClientsTableSkeleton } from "@/domains/clients/components/clients-table";
import { listClients } from "@/domains/clients/services/clients.actions";
import { clientListQuerySchema } from "@/domains/clients/validations/client.schema";

export const metadata: Metadata = { title: "Clientes" };

type SearchParams = Record<string, string | string[] | undefined>;

export default function ClientsPage({ searchParams }: PageProps<"/admin/clients">) {
  return (
    <>
      <PageHeader
        eyebrow="Administración global"
        title="Clientes"
        description="Conjuntos residenciales registrados en la plataforma."
        actions={
          <Link href="/admin/clients/new" className={buttonVariants()}>
            <Plus data-icon="inline-start" aria-hidden="true" />
            Nuevo cliente
          </Link>
        }
      />
      <Suspense fallback={<Skeleton className="h-9" />}>
        <ClientsFilters />
      </Suspense>
      <Suspense fallback={<ClientsTableSkeleton />}>
        <ClientsResults searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ClientsResults({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const query = clientListQuerySchema.parse(firstValues(params));
  const result = await listClients(query);

  return (
    <div className="flex flex-col gap-4">
      <ClientsTable clients={result.items} />
      <Pagination
        page={result.page}
        pageSize={result.pageSize}
        total={result.total}
        hrefFor={(page) => pageHref(params, page)}
      />
    </div>
  );
}

function firstValues(params: SearchParams): Record<string, string | undefined> {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]),
  );
}

function pageHref(params: SearchParams, page: number): string {
  const next = new URLSearchParams(
    Object.entries(firstValues(params)).filter((entry): entry is [string, string] => Boolean(entry[1])),
  );
  next.set("page", String(page));
  return `/admin/clients?${next.toString()}`;
}
