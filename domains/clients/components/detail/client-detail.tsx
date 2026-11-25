import { Pencil } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/layout/admin/page-header";
import { buttonVariants } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import { AUDIT_ACTION_LABELS, ROLE_LABELS } from "../../content/client-labels";
import type { ClientDetail as ClientDetailData } from "../../types/client.types";
import { ClientLogo } from "../client-logo";
import {
  ClientStatusBadge,
  DeliveryStatusBadge,
  InvitationStateBadge,
  MembershipStatusBadge,
} from "../status-pill";
import { ClientStatusActions } from "./client-status-actions";

export function ClientDetail({ client }: { client: ClientDetailData }) {
  const invitation = client.invitation;
  const canResendInvitation =
    client.status !== "SUSPENDED" && invitation !== null && invitation.state !== "ACCEPTED";

  return (
    <>
      <PageHeader
        eyebrow="Cliente"
        title={client.name}
        description={`NIT ${client.taxId}`}
        actions={
          <>
            <Link
              href={`/admin/clients/${client.id}/edit`}
              className={buttonVariants({ variant: "outline" })}
            >
              <Pencil data-icon="inline-start" aria-hidden="true" />
              Editar
            </Link>
            <ClientStatusActions
              clientId={client.id}
              clientName={client.name}
              status={client.status}
              canResendInvitation={canResendInvitation}
            />
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Panel title="Información general">
          <div className="flex items-center gap-4">
            <ClientLogo name={client.name} logoUrl={client.logoUrl} className="size-16" />
            <ClientStatusBadge status={client.status} />
          </div>
          <dl className="grid gap-3 text-sm">
            <Detail label="Creado">{formatDateTime(client.createdAt)}</Detail>
            <Detail label="Activado">{formatDateTime(client.activatedAt)}</Detail>
            <Detail label="Última actualización">{formatDateTime(client.updatedAt)}</Detail>
          </dl>
        </Panel>

        <Panel title="Invitación al administrador">
          {invitation ? (
            <dl className="grid gap-3 text-sm">
              <Detail label="Estado">
                <InvitationStateBadge state={invitation.state} />
              </Detail>
              <Detail label="Envío">
                <DeliveryStatusBadge status={invitation.deliveryStatus} />
              </Detail>
              <Detail label="Último envío">{formatDateTime(invitation.lastSentAt)}</Detail>
              <Detail label="Vence">{formatDateTime(invitation.expiresAt)}</Detail>
              <Detail label="Aceptada">{formatDateTime(invitation.acceptedAt)}</Detail>
            </dl>
          ) : (
            <p className="text-sm text-ink-soft">No hay invitaciones registradas.</p>
          )}
        </Panel>

        <Panel title="Usuarios y roles">
          <ul className="flex flex-col divide-y divide-line">
            {client.memberships.map((membership) => (
              <li key={membership.id} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                <span className="truncate text-sm font-medium text-navy">{membership.email}</span>
                <span className="flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                  {membership.roles.map((role) => ROLE_LABELS[role] ?? role).join(", ")}
                  <MembershipStatusBadge status={membership.status} />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Historial de cambios">
        {client.history.length === 0 ? (
          <p className="text-sm text-ink-soft">Sin eventos registrados.</p>
        ) : (
          <ol className="flex flex-col gap-4">
            {client.history.map((entry) => (
              <li key={entry.id} className="flex flex-col gap-0.5 border-l-2 border-sage pl-4">
                <span className="text-sm font-medium text-navy">
                  {AUDIT_ACTION_LABELS[entry.action] ?? entry.action}
                </span>
                <span className="text-xs text-ink-soft">
                  {formatDateTime(entry.createdAt)}
                  {entry.actorEmail && ` · ${entry.actorEmail}`}
                </span>
              </li>
            ))}
          </ol>
        )}
      </Panel>
    </>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 rounded-card border border-line bg-white p-5 shadow-card">
      <h2 className="type-h4 text-navy">{title}</h2>
      {children}
    </section>
  );
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right text-navy">{children}</dd>
    </div>
  );
}
