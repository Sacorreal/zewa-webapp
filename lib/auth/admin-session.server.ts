import "server-only";
import { cache } from "react";
import { createSessionCall, fetchPrincipal, type SessionPrincipal } from "./session.server";
import { ADMIN_SESSION } from "./session-tokens";

export type AdminSession = SessionPrincipal;

/** Ejecuta una llamada a zewa-api con la sesión del SUPERADMIN. */
export const withAdminSession = createSessionCall(ADMIN_SESSION);

/**
 * DAL del panel global: verifica con zewa-api que la sesión sea de alcance
 * `global` (SUPERADMIN). Memorizada por petición con `cache`.
 */
export const requireAdminSession = cache(
  (): Promise<AdminSession> => fetchPrincipal(ADMIN_SESSION, withAdminSession),
);
