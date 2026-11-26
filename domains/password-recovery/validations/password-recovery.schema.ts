import { z } from "zod";
import { emailField } from "@/lib/validation/credentials";
import { nitField } from "@/lib/validation/nit";
import { emailLinkTokenSchema, newPasswordField } from "@/lib/validation/password";

export const administratorResetRequestSchema = z.object({
  nit: nitField("Ingresa el NIT del conjunto."),
});

export type AdministratorResetRequestInput = z.infer<typeof administratorResetRequestSchema>;

export const residentResetRequestSchema = z.object({ email: emailField });

export type ResidentResetRequestInput = z.infer<typeof residentResetRequestSchema>;

export const confirmPasswordResetSchema = z.object({
  token: emailLinkTokenSchema,
  password: newPasswordField,
});

export type ConfirmPasswordResetInput = z.infer<typeof confirmPasswordResetSchema>;
