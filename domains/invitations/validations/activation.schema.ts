import { z } from "zod";
import { emailLinkTokenSchema, newPasswordField } from "@/lib/validation/password";

export const acceptInvitationSchema = z.object({
  token: emailLinkTokenSchema,
  password: newPasswordField.optional(),
});

export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>;
