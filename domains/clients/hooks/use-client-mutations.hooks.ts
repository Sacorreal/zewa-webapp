"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { unwrapAction } from "@/lib/actions/unwrap-action";
import {
  changeClientStatus,
  createClient,
  resendInvitation,
  updateClient,
} from "../services/clients.actions";
import type { DeliveryStatus } from "../types/client.types";
import type { CreateClientInput, UpdateClientInput } from "../validations/client.schema";

const notifyError = (error: Error) => toast.error(error.message);

function toFormData(entries: Record<string, string | File | undefined>): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(entries)) {
    if (value !== undefined) formData.set(key, value);
  }
  return formData;
}

export function notifyInvitationDelivery(status: DeliveryStatus, email: string): void {
  if (status === "SENT") toast.success(`Invitación enviada a ${email}.`);
  else toast.warning(`No se pudo enviar la invitación a ${email}. Puedes reenviarla desde el detalle.`);
}

export function useCreateClient() {
  return useMutation({
    mutationFn: ({ logo, ...fields }: CreateClientInput) =>
      unwrapAction(createClient(toFormData({ ...fields, logo }))),
    onSuccess: ({ client, invitation }) => {
      toast.success(`Cliente ${client.name} creado.`);
      notifyInvitationDelivery(invitation.deliveryStatus, invitation.email);
    },
    onError: notifyError,
  });
}

export function useUpdateClient(clientId: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ logo, removeLogo, ...fields }: UpdateClientInput) =>
      unwrapAction(
        updateClient(clientId, toFormData({ ...fields, logo, removeLogo: String(removeLogo) })),
      ),
    onSuccess: (client) => {
      toast.success(`Cambios de ${client.name} guardados.`);
      router.push(`/admin/clients/${clientId}`);
    },
    onError: notifyError,
  });
}

export function useChangeClientStatus(clientId: string) {
  return useMutation({
    mutationFn: (status: "ACTIVE" | "SUSPENDED") =>
      unwrapAction(changeClientStatus(clientId, status)),
    onSuccess: (client) =>
      toast.success(
        client.status === "SUSPENDED"
          ? `${client.name} fue suspendido.`
          : `${client.name} fue reactivado.`,
      ),
    onError: notifyError,
  });
}

export function useResendInvitation(clientId: string) {
  return useMutation({
    mutationFn: () => unwrapAction(resendInvitation(clientId)),
    onSuccess: ({ deliveryStatus, email }) => notifyInvitationDelivery(deliveryStatus, email),
    onError: notifyError,
  });
}
