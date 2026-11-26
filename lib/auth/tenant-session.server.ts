import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { zewaApi } from "@/lib/api/zewa-api.server";
import { createSessionCall, fetchPrincipal, type SessionPrincipal } from "./session.server";
import { TENANT_SELECTION_PATH, TENANT_SESSION } from "./session-tokens";

/** Respuesta de `GET /tenant/current`. */
export interface TenantWorkspace {
  id: string;
  name: string;
  taxId: string;
  status: string;
  logoUrl: string | null;
  roles: string[];
}

export interface TenantSession {
  user: SessionPrincipal["user"];
  tenant: TenantWorkspace;
}

/** Ejecuta una llamada a zewa-api con la sesión de la zona del conjunto. */
export const withTenantSession = createSessionCall(TENANT_SESSION);

/** Sesión de la zona del conjunto con cualquier alcance admitido (`tenant` o `account`). */
export const requireAccountSession = cache(
  (): Promise<SessionPrincipal> => fetchPrincipal(TENANT_SESSION, withTenantSession),
);

/**
 * DAL de la zona del conjunto: exige una sesión de alcance `tenant` y devuelve
 * el conjunto resuelto por zewa-api desde la membresía. Sin conjunto elegido,
 * envía a la selección.
 */
export const requireTenantSession = cache(async (): Promise<TenantSession> => {
  const { user, scope } = await requireAccountSession();
  if (scope !== "tenant") redirect(TENANT_SELECTION_PATH);

  const tenant = await withTenantSession((config) =>
    zewaApi.get<TenantWorkspace>("/tenant/current", config).then(({ data }) => data),
  );
  return { user, tenant };
});
