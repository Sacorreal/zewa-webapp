import { publicEnv } from "@/lib/env/public-env";
import { createApiClient, versionedBaseUrl } from "./create-api-client";

/**
 * Cliente de zewa-api para el navegador (`*.client.ts`): solo para lo que exige
 * APIs del navegador, como subidas con `onUploadProgress`. El resto va por `*.actions.ts`.
 */
export const zewaApiBrowser = createApiClient({
  baseURL: versionedBaseUrl(publicEnv.NEXT_PUBLIC_API_URL),
  withCredentials: true,
});
