import { type NextRequest, NextResponse } from "next/server";
import { serverEnv } from "@/lib/env/server-env";
import { versionedBaseUrl } from "@/lib/api/create-api-client";
import {
  SESSION_PROFILES,
  type SessionProfile,
  type SessionTokens,
  acceptsScope,
  clearSessionCookies,
  isAccessTokenFresh,
  isInArea,
  writeSessionCookies,
} from "@/lib/auth/session-tokens";

/**
 * Comprobación optimista de las zonas con sesión (no autoriza: eso lo hacen la
 * DAL y zewa-api en cada petición). Renueva el access token vencido con el
 * refresh token antes de renderizar, porque los Server Components no pueden escribir cookies.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const profile = SESSION_PROFILES.find((candidate) => isInArea(pathname, candidate));
  if (!profile || pathname === profile.loginPath) return NextResponse.next();
  if (isAccessTokenFresh(request.cookies.get(profile.accessCookie)?.value)) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get(profile.refreshCookie)?.value;
  const tokens = refreshToken ? await refreshSession(refreshToken, request, profile) : null;
  if (!tokens) return redirectToLogin(request, profile);

  // La petición en curso ya viaja con los tokens nuevos; el navegador los recibe en la respuesta.
  request.cookies.set(profile.accessCookie, tokens.accessToken);
  request.cookies.set(profile.refreshCookie, tokens.refreshToken);
  const response = NextResponse.next({ request: { headers: request.headers } });
  writeSessionCookies(response.cookies, profile, tokens);
  return response;
}

async function refreshSession(
  refreshToken: string,
  request: NextRequest,
  profile: SessionProfile,
): Promise<SessionTokens | null> {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const response = await fetch(`${versionedBaseUrl(serverEnv.API_URL)}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": request.headers.get("user-agent") ?? "",
      ...(forwardedFor ? { "X-Forwarded-For": forwardedFor } : {}),
    },
    body: JSON.stringify({ refreshToken }),
    cache: "no-store",
  }).catch(() => null);

  if (!response?.ok) return null;
  const tokens = (await response.json()) as SessionTokens;
  return acceptsScope(profile, tokens.scope) ? tokens : null;
}

function redirectToLogin(request: NextRequest, profile: SessionProfile): NextResponse {
  const response = NextResponse.redirect(new URL(profile.loginPath, request.url));
  clearSessionCookies(response.cookies, profile);
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/conjunto/:path*"],
};
