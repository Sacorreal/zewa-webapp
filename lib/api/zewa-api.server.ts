import "server-only";
import { serverEnv } from "@/lib/env/server-env";
import { createApiClient } from "./create-api-client";

/** Cliente de zewa-api para Server Actions y Server Components (`*.actions.ts`). */
export const zewaApi = createApiClient({ baseURL: serverEnv.API_URL });
