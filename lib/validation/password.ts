import { z } from "zod";

/** Política de zewa-api (`password-policy.ts`): la API la vuelve a validar. */
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

const PASSWORD_POLICY_MESSAGE = `La contraseña debe tener entre ${PASSWORD_MIN_LENGTH} y ${PASSWORD_MAX_LENGTH} caracteres.`;

export const NEW_PASSWORD_HINT = `Mínimo ${PASSWORD_MIN_LENGTH} caracteres. Usa una frase fácil de recordar y difícil de adivinar.`;

/** Contraseña que el usuario define (activación o recuperación). */
export const newPasswordField = z
  .string()
  .min(PASSWORD_MIN_LENGTH, PASSWORD_POLICY_MESSAGE)
  .max(PASSWORD_MAX_LENGTH, PASSWORD_POLICY_MESSAGE);

/** Contraseña nueva con confirmación. */
export const setPasswordSchema = z
  .object({ password: newPasswordField, confirmPassword: z.string() })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export type SetPasswordInput = z.infer<typeof setPasswordSchema>;

/** Token de un enlace enviado por correo (activación o recuperación). */
export const emailLinkTokenSchema = z.string().trim().min(1).max(128);
