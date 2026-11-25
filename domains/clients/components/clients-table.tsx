import { Building2 } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import type { ClientSummary } from "../types/client.types";
import { ClientLogo } from "./client-logo";
import { ClientStatusBadge } from "./status-pill";

const COLUMNS = ["Conjunto", "NIT", "Administrador", "Estado", "Creado"] as const;

export function ClientsTable({ clients }: { clients: ClientSummary[] }) {
  if (clients.length === 0) return <EmptyClients />;

  return (
    <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
      <Table>
        <TableHeader>
          <TableRow>
            {COLUMNS.map((column) => (
              <TableHead key={column} className="px-4 text-xs uppercase tracking-wide text-ink-soft">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="px-4">
                <Link
                  href={`/admin/clients/${client.id}`}
                  prefetch
                  className="flex items-center gap-3 font-medium text-navy hover:text-petrol"
                >
                  <ClientLogo name={client.name} logoUrl={client.logoUrl} className="size-8" />
                  <span className="max-w-64 truncate">{client.name}</span>
                </Link>
              </TableCell>
              <TableCell className="px-4 tabular-nums">{client.taxId}</TableCell>
              <TableCell className="max-w-56 truncate px-4">{client.administratorEmail ?? "—"}</TableCell>
              <TableCell className="px-4">
                <ClientStatusBadge status={client.status} />
              </TableCell>
              <TableCell className="px-4 text-ink-soft">{formatDate(client.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmptyClients() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-line-strong bg-white px-6 py-12 text-center">
      <Building2 className="size-8 text-mist" aria-hidden="true" />
      <p className="font-medium text-navy">No hay clientes que coincidan</p>
      <p className="text-sm text-ink-soft">Ajusta los filtros o registra un nuevo conjunto.</p>
    </div>
  );
}

export function ClientsTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-2 rounded-card border border-line bg-white p-4 shadow-card">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-10" />
      ))}
    </div>
  );
}
