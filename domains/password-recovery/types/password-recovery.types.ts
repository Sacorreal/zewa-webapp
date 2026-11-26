import type { EmailLinkValidation } from "@/lib/api/email-link-validation";

/** Acceso desde el que se pidió el enlace (`password_reset_audience` en zewa-api). */
export type PasswordResetAudience = "ADMINISTRATOR" | "RESIDENT";

/** Respuesta de `POST /auth/password-reset/request/*`: siempre genérica. */
export interface PasswordResetRequested {
  message: string;
}

/** Respuesta de `POST /auth/password-reset/validate`. */
export interface PasswordResetPreview {
  /** Correo del destinatario, enmascarado por zewa-api. */
  email: string;
  expiresAt: string;
  audience: PasswordResetAudience;
}

/** Respuesta de `POST /auth/password-reset/confirm`. */
export interface PasswordResetCompleted {
  audience: PasswordResetAudience;
}

export type PasswordResetValidation = EmailLinkValidation<PasswordResetPreview>;
