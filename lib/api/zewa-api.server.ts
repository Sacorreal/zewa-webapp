import "server-only";
import { serverEnv } from "@/lib/env/server-env";
import { createApiClient, versionedBaseUrl } from "./create-api-client";

/** Cliente de zewa-api para Server Actions y Server Components (`*.actions.ts`). */
export const zewaApi = createApiClient({ baseURL: versionedBaseUrl(serverEnv.API_URL) });
