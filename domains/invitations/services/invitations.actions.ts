"use server";

import { type ActionResult, runAction } from "@/lib/actions/action-result";
import { parseInput } from "@/lib/actions/parse-input";
import { validateEmailLinkToken } from "@/lib/api/email-link-token.server";
import { postPublic } from "@/lib/api/public-request.server";
import type {
  InvitationAccepted,
  InvitationPreview,
  InvitationValidation,
} from "../types/invitation.types";
import { type AcceptInvitationInput, acceptInvitationSchema } from "../validations/activation.schema";

const INVALID_LINK = "El enlace de activación no es válido.";

/** Endpoints públicos de zewa-api: el token del correo es la credencial. */

export async function validateInvitation(token: string | undefined): Promise<InvitationValidation> {
  return validateEmailLinkToken<InvitationPreview>("/auth/invitations/validate", token, INVALID_LINK);
}

export async function acceptInvitation(
  values: AcceptInvitationInput,
): Promise<ActionResult<InvitationAccepted>> {
  return runAction(async () => {
    const input = parseInput(acceptInvitationSchema, values);
    const data = await postPublic<InvitationAccepted>("/auth/invitations/accept", input);
    return { clientName: data.clientName, email: data.email };
  });
}
