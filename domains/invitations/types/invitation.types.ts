import type { EmailLinkValidation } from "@/lib/api/email-link-validation";

export interface InvitationPreview {
  clientName: string;
  email: string;
  expiresAt: string;
  requiresPassword: boolean;
}

export interface InvitationAccepted {
  clientName: string;
  email: string;
}

export type InvitationValidation = EmailLinkValidation<InvitationPreview>;
