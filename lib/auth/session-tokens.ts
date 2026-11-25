/**
 * Contrato de la sesión del panel global: tokens emitidos por zewa-api que el
 * BFF guarda en cookies `httpOnly` (el navegador nunca los lee).
 * Compartido por `proxy.ts` y el código de servidor, por eso no usa `server-only`.
 */

export const ACCESS_TOKEN_COOKIE = "zewa_admin_at";
export const REFRESH_TOKEN_COOKIE = "zewa_admin_rt";

export const ADMIN_LOGIN_PATH = "/admin/login";
export const ADMIN_HOME_PATH = "/admin/dashboard";

export interface SessionTokens {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  scope: "global" | "account" | "tenant";
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

export function writeSessionCookies(cookies: CookieWriter, tokens: SessionTokens): void {
  cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...baseCookieOptions(),
    expires: new Date(tokens.accessTokenExpiresAt),
  });
  cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...baseCookieOptions(),
    expires: new Date(tokens.refreshTokenExpiresAt),
  });
}

export function clearSessionCookies(cookies: CookieWriter): void {
  cookies.delete(ACCESS_TOKEN_COOKIE);
  cookies.delete(REFRESH_TOKEN_COOKIE);
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
