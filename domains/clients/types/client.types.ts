/** Contratos de zewa-api para el panel global (`/admin/clients`). */

export const CLIENT_STATUSES = ["PENDING_ACTIVATION", "ACTIVE", "SUSPENDED"] as const;
export type ClientStatus = (typeof CLIENT_STATUSES)[number];

export type DeliveryStatus = "PENDING" | "SENT" | "FAILED";
export type InvitationState = "PENDING" | "ACCEPTED" | "EXPIRED" | "REVOKED";

export interface ClientSummary {
  id: string;
  name: string;
  taxId: string;
  logoUrl: string | null;
  administratorEmail: string | null;
  status: ClientStatus;
  createdAt: string;
}

export interface ClientList {
  items: ClientSummary[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ClientStats {
  total: number;
  active: number;
  pendingActivation: number;
  suspended: number;
}

export interface ClientInvitation {
  state: InvitationState;
  deliveryStatus: DeliveryStatus;
  expiresAt: string;
  acceptedAt: string | null;
  lastSentAt: string | null;
  createdAt: string;
}

export interface ClientMembership {
  id: string;
  email: string;
  status: "PENDING" | "ACTIVE" | "REVOKED";
  roles: string[];
  createdAt: string;
  activatedAt: string | null;
}

export interface ClientAuditEntry {
  id: string;
  action: string;
  actorEmail: string | null;
  previousValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  createdAt: string;
}

export interface ClientDetail extends ClientSummary {
  activatedAt: string | null;
  updatedAt: string;
  memberships: ClientMembership[];
  invitation: ClientInvitation | null;
  history: ClientAuditEntry[];
}

export interface InvitationDelivery {
  email: string;
  deliveryStatus: DeliveryStatus;
  expiresAt: string;
}

export interface ClientCreated {
  client: ClientSummary;
  invitation: InvitationDelivery;
}

export const CLIENT_SORTS = ["createdAt:desc", "createdAt:asc"] as const;
export type ClientSort = (typeof CLIENT_SORTS)[number];

export interface ClientListQuery {
  search?: string;
  status?: ClientStatus;
  page: number;
  pageSize: number;
  sort: ClientSort;
}
