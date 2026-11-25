import type {
  ClientMembership,
  ClientStatus,
  DeliveryStatus,
  InvitationState,
} from "../types/client.types";

type Tone = "success" | "warning" | "danger" | "neutral";

interface Labeled {
  label: string;
  tone: Tone;
}

export const CLIENT_STATUS_LABELS: Record<ClientStatus, Labeled> = {
  ACTIVE: { label: "Activo", tone: "success" },
  PENDING_ACTIVATION: { label: "Pendiente de activación", tone: "warning" },
  SUSPENDED: { label: "Suspendido", tone: "danger" },
};

export const INVITATION_STATE_LABELS: Record<InvitationState, Labeled> = {
  PENDING: { label: "Pendiente", tone: "warning" },
  ACCEPTED: { label: "Aceptada", tone: "success" },
  EXPIRED: { label: "Vencida", tone: "danger" },
  REVOKED: { label: "Reemplazada", tone: "neutral" },
};

export const DELIVERY_STATUS_LABELS: Record<DeliveryStatus, Labeled> = {
  PENDING: { label: "Envío en curso", tone: "neutral" },
  SENT: { label: "Correo enviado", tone: "success" },
  FAILED: { label: "Envío fallido", tone: "danger" },
};

export const MEMBERSHIP_STATUS_LABELS: Record<ClientMembership["status"], Labeled> = {
  PENDING: { label: "Pendiente", tone: "warning" },
  ACTIVE: { label: "Activa", tone: "success" },
  REVOKED: { label: "Revocada", tone: "neutral" },
};

export const ROLE_LABELS: Record<string, string> = {
  ADMINISTRADOR: "Administrador",
};

export const AUDIT_ACTION_LABELS: Record<string, string> = {
  CLIENT_CREATED: "Cliente creado",
  CLIENT_UPDATED: "Datos actualizados",
  CLIENT_SUSPENDED: "Cliente suspendido",
  CLIENT_REACTIVATED: "Cliente reactivado",
  INVITATION_RESENT: "Invitación reenviada",
  INVITATION_ACCEPTED: "Invitación aceptada",
};

export const TONE_CLASSES: Record<Tone, string> = {
  success: "bg-sage text-petrol",
  warning: "bg-warning-soft text-warning-ink",
  danger: "bg-destructive/10 text-destructive",
  neutral: "bg-subtle text-ink-soft",
};
