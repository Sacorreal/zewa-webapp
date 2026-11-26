import "server-only";
import { forwardedClientHeaders } from "./forwarded-headers.server";
import { zewaApi } from "./zewa-api.server";

/**
 * POST a un endpoint público de zewa-api (sin sesión), reenviando las
 * cabeceras del usuario para que el rate limiting y la auditoría vean su IP.
 */
export async function postPublic<T>(path: string, body: object): Promise<T> {
  const { data } = await zewaApi.post<T>(path, body, { headers: await forwardedClientHeaders() });
  return data;
}
