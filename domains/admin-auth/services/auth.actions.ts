"use server";

import { redirect } from "next/navigation";
import { type ActionResult, runAction } from "@/lib/actions/action-result";
import { parseInput } from "@/lib/actions/parse-input";
import { ApiError } from "@/lib/api/api-error";
import { forwardedClientHeaders } from "@/lib/api/forwarded-headers.server";
import { zewaApi } from "@/lib/api/zewa-api.server";
import { endSession, revokeSession, startSession } from "@/lib/auth/session.server";
import { ADMIN_SESSION, APP_HOME_PATH, type SessionTokens } from "@/lib/auth/session-tokens";
import { type EmailLoginInput, emailLoginSchema } from "@/lib/validation/credentials";

const NOT_A_SUPERADMIN =
  "Esta cuenta no tiene acceso al panel de administración global de ZEWA.";

/**
 * Inicia la sesión del panel global. Solo se aceptan sesiones de alcance
 * `global`; cualquier otra se cierra de inmediato en zewa-api.
 */
export async function login(values: EmailLoginInput): Promise<ActionResult<null>> {
  return runAction(async () => {
    const credentials = parseInput(emailLoginSchema, values);
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

    await startSession(ADMIN_SESSION, data.tokens);
    return null;
  });
}

export async function logout(): Promise<void> {
  await endSession(ADMIN_SESSION);
  redirect(APP_HOME_PATH);
}
