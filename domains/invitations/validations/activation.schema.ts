import { z } from "zod";

/** Política de zewa-api (`password-policy.ts`): la API la vuelve a validar. */
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;
const PASSWORD_POLICY_MESSAGE = `La contraseña debe tener entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres.`;

export const invitationTokenSchema = z.string().trim().min(1).max(128);

const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, PASSWORD_POLICY_MESSAGE)
  .max(PASSWORD_MAX_LENGTH, PASSWORD_POLICY_MESSAGE);

export const setPasswordSchema = z
  .object({ password: passwordSchema, confirmPassword: z.string() })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export type SetPasswordInput = z.infer<typeof setPasswordSchema>;

export const acceptInvitationSchema = z.object({
  token: invitationTokenSchema,
  password: passwordSchema.optional(),
});

export type AcceptInvitationInput = z.infer<typeof acceptInvitationSchema>;
