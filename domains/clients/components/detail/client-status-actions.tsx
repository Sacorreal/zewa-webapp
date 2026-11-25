"use client";

import { Pause, Play, Send } from "lucide-react";
import { useState } from "react";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";
import { Button } from "@/components/ui/button";
import {
  useChangeClientStatus,
  useResendInvitation,
} from "../../hooks/use-client-mutations.hooks";
import type { ClientStatus } from "../../types/client.types";

type PendingAction = "suspend" | "reactivate" | "resend" | null;

interface ClientStatusActionsProps {
  clientId: string;
  clientName: string;
  status: ClientStatus;
  canResendInvitation: boolean;
}

/** Acciones sensibles del detalle, cada una con confirmación previa. */
export function ClientStatusActions({
  clientId,
  clientName,
  status,
  canResendInvitation,
}: ClientStatusActionsProps) {
  const [action, setAction] = useState<PendingAction>(null);
  const changeStatus = useChangeClientStatus(clientId);
  const resend = useResendInvitation(clientId);

  const close = () => setAction(null);
  const options = { onSettled: close };

  const dialogs = {
    suspend: {
      title: `¿Suspender ${clientName}?`,
      description:
        "Sus usuarios perderán el acceso de inmediato. La información se conserva y puedes reactivarlo cuando quieras.",
      confirmLabel: "Suspender",
      tone: "destructive" as const,
      pending: changeStatus.isPending,
      onConfirm: () => changeStatus.mutate("SUSPENDED", options),
    },
    reactivate: {
      title: `¿Reactivar ${clientName}?`,
      description:
        "Los usuarios con membresía activa recuperarán el acceso. Si el administrador no ha activado su cuenta, quedará pendiente de activación.",
      confirmLabel: "Reactivar",
      tone: "default" as const,
      pending: changeStatus.isPending,
      onConfirm: () => changeStatus.mutate("ACTIVE", options),
    },
    resend: {
      title: "¿Reenviar la invitación?",
      description: "El enlace anterior dejará de funcionar y se enviará uno nuevo al administrador.",
      confirmLabel: "Reenviar",
      tone: "default" as const,
      pending: resend.isPending,
      onConfirm: () => resend.mutate(undefined, options),
    },
  };

  const dialog = action ? dialogs[action] : null;

  return (
    <>
      {canResendInvitation && (
        <Button variant="outline" onClick={() => setAction("resend")}>
          <Send data-icon="inline-start" aria-hidden="true" />
          Reenviar invitación
        </Button>
      )}
      {status === "SUSPENDED" ? (
        <Button variant="secondary" onClick={() => setAction("reactivate")}>
          <Play data-icon="inline-start" aria-hidden="true" />
          Reactivar
        </Button>
      ) : (
        <Button variant="destructive" onClick={() => setAction("suspend")}>
          <Pause data-icon="inline-start" aria-hidden="true" />
          Suspender
        </Button>
      )}

      {dialog && (
        <ConfirmationDialog
          open
          onOpenChange={(open) => !open && close()}
          title={dialog.title}
          description={dialog.description}
          confirmLabel={dialog.confirmLabel}
          tone={dialog.tone}
          pending={dialog.pending}
          onConfirm={dialog.onConfirm}
        />
      )}
    </>
  );
}
