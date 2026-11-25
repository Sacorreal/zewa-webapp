"use server";

import { type ActionResult, runAction } from "@/lib/actions/action-result";
import { parseInput } from "@/lib/actions/parse-input";
import { ApiError } from "@/lib/api/api-error";
import { forwardedClientHeaders } from "@/lib/api/forwarded-headers.server";
import { zewaApi } from "@/lib/api/zewa-api.server";
import type {
  InvitationAccepted,
  InvitationPreview,
  InvitationValidation,
} from "../types/invitation.types";
import {
  type AcceptInvitationInput,
  acceptInvitationSchema,
  invitationTokenSchema,
} from "../validations/activation.schema";

const INVALID_LINK = "El enlace de activación no es válido.";

/** Endpoints públicos de zewa-api: el token del correo es la credencial. */

export async function validateInvitation(token: string | undefined): Promise<InvitationValidation> {
  const parsed = invitationTokenSchema.safeParse(token);
  if (!parsed.success) return { valid: false, reason: INVALID_LINK };

  try {
    const { data } = await zewaApi.post<InvitationPreview>(
      "/auth/invitations/validate",
      { token: parsed.data },
      { headers: await forwardedClientHeaders() },
    );
    return { valid: true, invitation: data };
  } catch (error) {
    if (error instanceof ApiError && error.status !== null && error.status < 500) {
      return { valid: false, reason: error.message };
    }
    throw error;
  }
}

export async function acceptInvitation(
  values: AcceptInvitationInput,
): Promise<ActionResult<InvitationAccepted>> {
  return runAction(async () => {
    const input = parseInput(acceptInvitationSchema, values);
    const { data } = await zewaApi.post<InvitationAccepted>("/auth/invitations/accept", input, {
      headers: await forwardedClientHeaders(),
    });
    return { clientName: data.clientName, email: data.email };
  });
}
