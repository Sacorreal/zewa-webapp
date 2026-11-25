"use client";

import { CircleCheck, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import type { ClientCreated } from "../types/client.types";
import { ClientLogo } from "./client-logo";
import { ClientStatusBadge, DeliveryStatusBadge } from "./status-pill";

interface ClientCreatedSummaryProps {
  result: ClientCreated;
  onCreateAnother: () => void;
}

/** Resumen tras crear un cliente: datos registrados y resultado del envío de la invitación. */
export function ClientCreatedSummary({ result, onCreateAnother }: ClientCreatedSummaryProps) {
  const { client, invitation } = result;
  const sent = invitation.deliveryStatus === "SENT";

  return (
    <section
      aria-live="polite"
      className="flex flex-col gap-6 rounded-card border border-line bg-white p-6 shadow-card"
    >
      <header className="flex items-start gap-3">
        <CircleCheck className="mt-0.5 size-6 shrink-0 text-petrol" aria-hidden="true" />
        <div>
          <h2 className="type-h4 text-navy">Cliente creado</h2>
          <p className="text-sm text-ink-soft">
            El conjunto quedó pendiente de activación hasta que el administrador acepte la invitación.
          </p>
        </div>
      </header>

      <dl className="grid gap-4 sm:grid-cols-2">
        <SummaryItem label="Conjunto">
          <span className="flex items-center gap-2">
            <ClientLogo name={client.name} logoUrl={client.logoUrl} className="size-8" />
            {client.name}
          </span>
        </SummaryItem>
        <SummaryItem label="NIT">{client.taxId}</SummaryItem>
        <SummaryItem label="Administrador">{invitation.email}</SummaryItem>
        <SummaryItem label="Estado">
          <ClientStatusBadge status={client.status} />
        </SummaryItem>
        <SummaryItem label="Invitación">
          <DeliveryStatusBadge status={invitation.deliveryStatus} />
        </SummaryItem>
        <SummaryItem label="Vence">{formatDateTime(invitation.expiresAt)}</SummaryItem>
      </dl>

      {!sent && (
        <p className="flex items-start gap-2 rounded-lg bg-warning-soft p-3 text-sm text-warning-ink">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          El correo no se pudo enviar. El cliente quedó registrado y puedes reenviar la invitación desde su detalle.
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={onCreateAnother}>
          Crear otro cliente
        </Button>
        <Link href={`/admin/clients/${client.id}`} className={buttonVariants()}>
          Ver detalle
        </Link>
      </div>
    </section>
  );
}

function SummaryItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</dt>
      <dd className="text-sm text-navy">{children}</dd>
    </div>
  );
}
