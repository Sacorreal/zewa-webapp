"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type ActionResult, runAction } from "@/lib/actions/action-result";
import { parseInput } from "@/lib/actions/parse-input";
import { ApiError } from "@/lib/api/api-error";
import { forwardedClientHeaders } from "@/lib/api/forwarded-headers.server";
import { zewaApi } from "@/lib/api/zewa-api.server";
import {
  ACCESS_TOKEN_COOKIE,
  APP_HOME_PATH,
  clearSessionCookies,
  type SessionTokens,
  writeSessionCookies,
} from "@/lib/auth/session-tokens";
import { type LoginInput, loginSchema } from "../validations/login.schema";

const NOT_A_SUPERADMIN =
  "Esta cuenta no tiene acceso al panel de administración global de ZEWA.";

/**
 * Inicia la sesión del panel global. Solo se aceptan sesiones de alcance
 * `global`; cualquier otra se cierra de inmediato en zewa-api.
 */
export async function login(values: LoginInput): Promise<ActionResult<null>> {
  return runAction(async () => {
    const credentials = parseInput(loginSchema, values);
    const config = { headers: await forwardedClientHeaders() };
    const { data } = await zewaApi.post<{ tokens: SessionTokens }>(
      "/auth/login",
      credentials,
      config,
    );

    if (data.tokens.scope !== "global") {
      await revokeSession(data.tokens.accessToken);
      throw new ApiError(NOT_A_SUPERADMIN, 403, [NOT_A_SUPERADMIN]);
    }

    writeSessionCookies(await cookies(), data.tokens);
    return null;
  });
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  if (accessToken) await revokeSession(accessToken);
  clearSessionCookies(cookieStore);
  redirect(APP_HOME_PATH);
}

/** Revoca la sesión en zewa-api; si ya expiró, no hay nada que revocar. */
async function revokeSession(accessToken: string): Promise<void> {
  await zewaApi
    .post("/auth/logout", undefined, {
      headers: { ...(await forwardedClientHeaders()), Authorization: `Bearer ${accessToken}` },
    })
    .catch(() => undefined);
}
