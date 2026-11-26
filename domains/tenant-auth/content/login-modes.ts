import { LOGIN_MODES, type LoginMode } from "../types/tenant-auth.types";

interface LoginModeContent {
  label: string;
  description: string;
}

export const DEFAULT_LOGIN_MODE: LoginMode = "administrador";

/** Parámetro de la URL que recuerda el tipo de acceso elegido (`?modo=`). */
export const LOGIN_MODE_QUERY_PARAM = "modo";

export function parseLoginMode(value: unknown): LoginMode {
  return LOGIN_MODES.find((mode) => mode === value) ?? DEFAULT_LOGIN_MODE;
}

export const LOGIN_MODE_CONTENT: Record<LoginMode, LoginModeContent> = {
  administrador: {
    label: "Administrador",
    description: "Ingresa con el NIT del conjunto y la contraseña que creaste al activar tu cuenta.",
  },
  residente: {
    label: "Residente o propietario",
    description: "Ingresa con tu correo electrónico y tu contraseña.",
  },
};
