import { z } from "zod";
import { PASSWORD_MAX_LENGTH } from "./password";

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email("Ingresa un correo electrónico válido."));

export const passwordField = z
  .string()
  .min(1, "Ingresa tu contraseña.")
  .max(PASSWORD_MAX_LENGTH);

/** Credenciales de acceso por correo (SUPERADMIN, residentes y propietarios). */
export const emailLoginSchema = z.object({ email: emailField, password: passwordField });

export type EmailLoginInput = z.infer<typeof emailLoginSchema>;
