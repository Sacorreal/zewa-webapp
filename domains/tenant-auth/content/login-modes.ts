import { TENANT_SESSION } from "@/lib/auth/session-tokens";
import { LOGIN_MODES, type LoginMode } from "../types/tenant-auth.types";

export const DEFAULT_LOGIN_MODE: LoginMode = "administrador";

/** Parámetro de la URL que recuerda el tipo de acceso elegido (`?modo=`). */
export const LOGIN_MODE_QUERY_PARAM = "modo";

export function parseLoginMode(value: unknown): LoginMode {
  return LOGIN_MODES.find((mode) => mode === value) ?? DEFAULT_LOGIN_MODE;
}

/** Ruta con el tipo de acceso preseleccionado (p. ej. `/iniciar-sesion?modo=residente`). */
export function withLoginMode(path: string, mode: LoginMode): string {
  return `${path}?${new URLSearchParams({ [LOGIN_MODE_QUERY_PARAM]: mode })}`;
}

/** Página para pedir el enlace de recuperación de contraseña. */
export const PASSWORD_RECOVERY_PATH = "/recuperar-contrasena";

export const loginHref = (mode: LoginMode) => withLoginMode(TENANT_SESSION.loginPath, mode);

export const passwordRecoveryHref = (mode: LoginMode) => withLoginMode(PASSWORD_RECOVERY_PATH, mode);

export const LOGIN_MODE_LABELS: Record<LoginMode, string> = {
  administrador: "Administrador",
  residente: "Residente o propietario",
};

export const LOGIN_MODE_DESCRIPTIONS: Record<LoginMode, string> = {
  administrador:
    "Ingresa con el NIT del conjunto y la contraseña que creaste al activar tu cuenta.",
  residente: "Ingresa con tu correo electrónico y tu contraseña.",
};
