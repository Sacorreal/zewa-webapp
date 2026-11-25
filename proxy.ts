import { type NextRequest, NextResponse } from "next/server";
import { serverEnv } from "@/lib/env/server-env";
import { versionedBaseUrl } from "@/lib/api/create-api-client";
import {
  ACCESS_TOKEN_COOKIE,
  ADMIN_LOGIN_PATH,
  REFRESH_TOKEN_COOKIE,
  type SessionTokens,
  clearSessionCookies,
  isAccessTokenFresh,
  writeSessionCookies,
} from "@/lib/auth/session-tokens";

/**
 * Comprobación optimista del panel global (no autoriza: eso lo hace la DAL y
 * zewa-api en cada petición). Renueva el access token vencido con el refresh
 * token antes de renderizar, porque los Server Components no pueden escribir cookies.
 */
export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === ADMIN_LOGIN_PATH) return NextResponse.next();
  if (isAccessTokenFresh(request.cookies.get(ACCESS_TOKEN_COOKIE)?.value)) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  const tokens = refreshToken ? await refreshSession(refreshToken, request) : null;
  if (!tokens) return redirectToLogin(request);

  // La petición en curso ya viaja con los tokens nuevos; el navegador los recibe en la respuesta.
  request.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken);
  request.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken);
  const response = NextResponse.next({ request: { headers: request.headers } });
  writeSessionCookies(response.cookies, tokens);
  return response;
}

async function refreshSession(
  refreshToken: string,
  request: NextRequest,
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
  return tokens.scope === "global" ? tokens : null;
}

function redirectToLogin(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  clearSessionCookies(response.cookies);
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
