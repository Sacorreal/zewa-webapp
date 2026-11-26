"use server";

import { type ActionResult, runAction } from "@/lib/actions/action-result";
import { parseInput } from "@/lib/actions/parse-input";
import { validateEmailLinkToken } from "@/lib/api/email-link-token.server";
import { postPublic } from "@/lib/api/public-request.server";
import type {
  PasswordResetCompleted,
  PasswordResetPreview,
  PasswordResetRequested,
  PasswordResetValidation,
} from "../types/password-recovery.types";
import {
  type AdministratorResetRequestInput,
  type ConfirmPasswordResetInput,
  type ResidentResetRequestInput,
  administratorResetRequestSchema,
  confirmPasswordResetSchema,
  residentResetRequestSchema,
} from "../validations/password-recovery.schema";

/** Endpoints públicos de zewa-api: el token del correo es la credencial. */
const PASSWORD_RESET_API = "/auth/password-reset";
const INVALID_LINK = "El enlace para restablecer la contraseña no es válido.";

/** Pide el enlace con el NIT del conjunto. Devuelve el mensaje genérico de zewa-api. */
export async function requestAdministratorReset(
  values: AdministratorResetRequestInput,
): Promise<ActionResult<string>> {
  return runAction(() =>
    requestReset("request/administrator", parseInput(administratorResetRequestSchema, values)),
  );
}

/** Pide el enlace con el correo del residente o propietario. */
export async function requestResidentReset(
  values: ResidentResetRequestInput,
): Promise<ActionResult<string>> {
  return runAction(() =>
    requestReset("request/resident", parseInput(residentResetRequestSchema, values)),
  );
}

export async function validateResetToken(token: string | undefined): Promise<PasswordResetValidation> {
  return validateEmailLinkToken<PasswordResetPreview>(
    `${PASSWORD_RESET_API}/validate`,
    token,
    INVALID_LINK,
  );
}

export async function confirmPasswordReset(
  values: ConfirmPasswordResetInput,
): Promise<ActionResult<PasswordResetCompleted>> {
  return runAction(async () => {
    const input = parseInput(confirmPasswordResetSchema, values);
    const { audience } = await postPublic<PasswordResetCompleted>(
      `${PASSWORD_RESET_API}/confirm`,
      input,
    );
    return { audience };
  });
}

async function requestReset(endpoint: string, body: object): Promise<string> {
  const { message } = await postPublic<PasswordResetRequested>(
    `${PASSWORD_RESET_API}/${endpoint}`,
    body,
  );
  return message;
}
