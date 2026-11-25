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

export type InvitationValidation =
  | { valid: true; invitation: InvitationPreview }
  | { valid: false; reason: string };
