import "server-only";
import { headers } from "next/headers";

/**
 * Cabeceras del usuario original que el BFF reenvía a zewa-api para que la
 * auditoría y el rate limiting usen su IP y navegador, no los de Next.js.
 */
export async function forwardedClientHeaders(): Promise<Record<string, string>> {
  const incoming = await headers();
  const forwarded: Record<string, string> = {};

  const forwardedFor = incoming.get("x-forwarded-for") ?? incoming.get("x-real-ip");
  if (forwardedFor) forwarded["X-Forwarded-For"] = forwardedFor;

  const userAgent = incoming.get("user-agent");
  if (userAgent) forwarded["User-Agent"] = userAgent;

  return forwarded;
}
