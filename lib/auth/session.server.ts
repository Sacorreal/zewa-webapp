import "server-only";
import type { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/api-error";
import { forwardedClientHeaders } from "@/lib/api/forwarded-headers.server";
import { zewaApi } from "@/lib/api/zewa-api.server";
import {
  type SessionProfile,
  type SessionScope,
  type SessionTokens,
  clearSessionCookies,
  writeSessionCookies,
} from "./session-tokens";

/** Respuesta de `GET /auth/me`. */
export interface SessionPrincipal {
  user: { id: string; email: string; platformRole: string | null };
  scope: SessionScope;
  tenantId: string | null;
}

export type SessionCall = <T>(call: (config: AxiosRequestConfig) => Promise<T>) => Promise<T>;

const UNAUTHENTICATED_STATUSES = new Set([401, 403]);

/**
 * Acceso a zewa-api con la sesión de una zona. Si la API rechaza la sesión,
 * envía al login de esa zona: la autorización real vive en el backend.
 */
export function createSessionCall(profile: SessionProfile): SessionCall {
  return async (call) => {
    const config = await authorizedConfig(profile);
    try {
      return await call(config);
    } catch (error) {
      if (
        error instanceof ApiError &&
        error.status !== null &&
        UNAUTHENTICATED_STATUSES.has(error.status)
      ) {
        redirect(profile.loginPath);
      }
      throw error;
    }
  };
}

/** Consulta la identidad de la sesión y exige uno de los alcances de la zona. */
export async function fetchPrincipal(
  profile: SessionProfile,
  withSession: SessionCall,
): Promise<SessionPrincipal> {
  const principal = await withSession((config) =>
    zewaApi.get<SessionPrincipal>("/auth/me", config).then(({ data }) => data),
  );
  if (!profile.acceptedScopes.includes(principal.scope)) redirect(profile.loginPath);
  return principal;
}

/** Guarda los tokens de una sesión nueva y revoca la anterior de la misma zona. */
export async function startSession(profile: SessionProfile, tokens: SessionTokens): Promise<void> {
  const cookieStore = await cookies();
  const previous = cookieStore.get(profile.accessCookie)?.value;
  if (previous && previous !== tokens.accessToken) await revokeSession(previous);
  writeSessionCookies(cookieStore, profile, tokens);
}

export async function endSession(profile: SessionProfile): Promise<void> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(profile.accessCookie)?.value;
  if (accessToken) await revokeSession(accessToken);
  clearSessionCookies(cookieStore, profile);
}

/** Revoca la sesión en zewa-api; si ya expiró, no hay nada que revocar. */
export async function revokeSession(accessToken: string): Promise<void> {
  await zewaApi
    .post("/auth/logout", undefined, {
      headers: { ...(await forwardedClientHeaders()), Authorization: `Bearer ${accessToken}` },
    })
    .catch(() => undefined);
}

async function authorizedConfig(profile: SessionProfile): Promise<AxiosRequestConfig> {
  const token = (await cookies()).get(profile.accessCookie)?.value;
  if (!token) redirect(profile.loginPath);

  return {
    headers: { ...(await forwardedClientHeaders()), Authorization: `Bearer ${token}` },
  };
}
