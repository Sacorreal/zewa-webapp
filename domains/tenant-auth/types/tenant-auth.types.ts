import type { SessionTokens } from "@/lib/auth/session-tokens";

export const LOGIN_MODES = ["administrador", "residente"] as const;
export type LoginMode = (typeof LOGIN_MODES)[number];

export interface TenantOption {
  id: string;
  name: string;
}

/** Respuesta de `POST /auth/login/administrator|resident`. */
export interface TenantLoginResponse {
  tokens: SessionTokens;
  tenant: TenantOption | null;
  tenants: TenantOption[];
}

/** Elemento de `GET /auth/memberships`. */
export interface MembershipSummary {
  tenantId: string;
  tenantName: string;
  tenantStatus: string;
  membershipStatus: string;
  roles: string[];
}

export interface SelectableTenant extends TenantOption {
  roles: string[];
}
