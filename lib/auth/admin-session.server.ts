import "server-only";
import type { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { ApiError } from "@/lib/api/api-error";
import { forwardedClientHeaders } from "@/lib/api/forwarded-headers.server";
import { zewaApi } from "@/lib/api/zewa-api.server";
import { ACCESS_TOKEN_COOKIE, ADMIN_LOGIN_PATH } from "./session-tokens";

export interface AdminSession {
  user: { id: string; email: string; platformRole: string | null };
  scope: string;
}

const UNAUTHENTICATED_STATUSES = new Set([401, 403]);

/** Configuración de axios con el token de la sesión y las cabeceras del usuario. */
async function authorizedConfig(): Promise<AxiosRequestConfig> {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) redirect(ADMIN_LOGIN_PATH);

  return {
    headers: { ...(await forwardedClientHeaders()), Authorization: `Bearer ${token}` },
  };
}

/**
 * Ejecuta una llamada a zewa-api con la sesión del SUPERADMIN. Si la API
 * rechaza la sesión, envía al login: la autorización real vive en el backend.
 */
export async function withAdminSession<T>(
  call: (config: AxiosRequestConfig) => Promise<T>,
): Promise<T> {
  const config = await authorizedConfig();
  try {
    return await call(config);
  } catch (error) {
    if (error instanceof ApiError && error.status !== null && UNAUTHENTICATED_STATUSES.has(error.status)) {
      redirect(ADMIN_LOGIN_PATH);
    }
    throw error;
  }
}

/**
 * DAL del panel global: verifica con zewa-api que la sesión sea de alcance
 * `global` (SUPERADMIN). Memorizada por petición con `cache`.
 */
export const requireAdminSession = cache(async (): Promise<AdminSession> => {
  const session = await withAdminSession((config) =>
    zewaApi.get<AdminSession>("/auth/me", config).then(({ data }) => data),
  );
  if (session.scope !== "global") redirect(ADMIN_LOGIN_PATH);
  return session;
});
