import type { LoginMode } from "@/domains/tenant-auth/types/tenant-auth.types";
import type { PasswordResetAudience } from "../types/password-recovery.types";

/** Pestaña del login a la que vuelve cada acceso tras restablecer la contraseña. */
export const AUDIENCE_LOGIN_MODE: Record<PasswordResetAudience, LoginMode> = {
  ADMINISTRATOR: "administrador",
  RESIDENT: "residente",
};

/** Ayuda de la página donde se define la contraseña nueva. */
export const RESET_DESCRIPTIONS: Record<PasswordResetAudience, string> = {
  ADMINISTRATOR: "La usarás junto con el NIT del conjunto para ingresar como administrador.",
  RESIDENT: "La usarás junto con tu correo para ingresar como residente o propietario.",
};

export const RECOVERY_DESCRIPTIONS: Record<LoginMode, string> = {
  administrador:
    "Escribe el NIT del conjunto. Enviaremos un enlace para restablecer la contraseña al correo del administrador registrado.",
  residente:
    "Escribe el correo con el que ingresas. Te enviaremos un enlace para restablecer tu contraseña.",
};
