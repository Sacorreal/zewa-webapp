import "server-only";
import { emailLinkTokenSchema } from "@/lib/validation/password";
import { ApiError } from "./api-error";
import type { EmailLinkValidation } from "./email-link-validation";
import { postPublic } from "./public-request.server";

/**
 * Valida en zewa-api el token de un enlace enviado por correo (endpoint
 * público). Un rechazo de la API (4xx) se devuelve como enlace inválido con
 * su motivo; los fallos del servidor se propagan.
 */
export async function validateEmailLinkToken<T>(
  path: string,
  token: unknown,
  invalidMessage: string,
): Promise<EmailLinkValidation<T>> {
  const parsed = emailLinkTokenSchema.safeParse(token);
  if (!parsed.success) return { valid: false, reason: invalidMessage };

  try {
    return { valid: true, data: await postPublic<T>(path, { token: parsed.data }) };
  } catch (error) {
    if (error instanceof ApiError && error.status !== null && error.status < 500) {
      return { valid: false, reason: error.message };
    }
    throw error;
  }
}
