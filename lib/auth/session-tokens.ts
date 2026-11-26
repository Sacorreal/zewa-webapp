/**
 * Contrato de las sesiones del BFF: tokens emitidos por zewa-api que se
 * guardan en cookies `httpOnly` (el navegador nunca los lee). Cada zona de la
 * app tiene su propio perfil y sus propias cookies, así una sesión no abre la otra.
 * Compartido por `proxy.ts` y el código de servidor, por eso no usa `server-only`.
 */

export type SessionScope = "global" | "account" | "tenant";

export interface SessionProfile {
  /** Prefijo de las rutas protegidas por esta sesión. */
  areaPath: string;
  accessCookie: string;
  refreshCookie: string;
  loginPath: string;
  homePath: string;
  /** Alcances que la zona admite; cualquier otro se trata como sin sesión. */
  acceptedScopes: readonly SessionScope[];
}

/** Panel global de ZEWA (SUPERADMIN). */
export const ADMIN_SESSION: SessionProfile = {
  areaPath: "/admin",
  accessCookie: "zewa_admin_at",
  refreshCookie: "zewa_admin_rt",
  loginPath: "/admin/login",
  homePath: "/admin/dashboard",
  acceptedScopes: ["global"],
};

/** Zona del conjunto (administrador, residentes y propietarios). */
export const TENANT_SESSION: SessionProfile = {
  areaPath: "/conjunto",
  accessCookie: "zewa_at",
  refreshCookie: "zewa_rt",
  loginPath: "/iniciar-sesion",
  homePath: "/conjunto",
  acceptedScopes: ["tenant", "account"],
};

/** Elección de conjunto para quien pertenece a varios (sesión de alcance `account`). */
export const TENANT_SELECTION_PATH = "/conjunto/seleccionar";

export const SESSION_PROFILES: readonly SessionProfile[] = [ADMIN_SESSION, TENANT_SESSION];

/** Home público de la app (landing): destino tras cerrar la sesión global. */
export const APP_HOME_PATH = "/";

export interface SessionTokens {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  scope: SessionScope;
}

interface CookieWriter {
  set(name: string, value: string, options: Record<string, unknown>): unknown;
  delete(name: string): unknown;
}

const baseCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
});

export function isInArea(pathname: string, profile: SessionProfile): boolean {
  return pathname === profile.areaPath || pathname.startsWith(`${profile.areaPath}/`);
}

export function acceptsScope(profile: SessionProfile, scope: SessionScope): boolean {
  return profile.acceptedScopes.includes(scope);
}

export function writeSessionCookies(
  cookies: CookieWriter,
  profile: SessionProfile,
  tokens: SessionTokens,
): void {
  cookies.set(profile.accessCookie, tokens.accessToken, {
    ...baseCookieOptions(),
    expires: new Date(tokens.accessTokenExpiresAt),
  });
  cookies.set(profile.refreshCookie, tokens.refreshToken, {
    ...baseCookieOptions(),
    expires: new Date(tokens.refreshTokenExpiresAt),
  });
}

export function clearSessionCookies(cookies: CookieWriter, profile: SessionProfile): void {
  cookies.delete(profile.accessCookie);
  cookies.delete(profile.refreshCookie);
}

/** Margen para renovar antes de que el token expire en tránsito. */
const EXPIRY_SKEW_MS = 30_000;

/**
 * Chequeo optimista de expiración leyendo `exp` del JWT SIN verificar la firma:
 * solo decide si conviene renovar. La verificación real la hace zewa-api.
 */
export function isAccessTokenFresh(token: string | undefined): boolean {
  const payload = token?.split(".")[1];
  if (!payload) return false;
  try {
    const { exp } = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as {
      exp?: number;
    };
    return typeof exp === "number" && exp * 1000 - EXPIRY_SKEW_MS > Date.now();
  } catch {
    return false;
  }
}
