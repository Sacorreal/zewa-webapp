import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";
import { toApiError } from "./api-error";

const REQUEST_TIMEOUT_MS = 15_000;

/** Prefijo de versión de zewa-api (ver `API_PREFIX` en el backend). */
export const API_VERSION_PATH = "/api/v1";

/** URL base versionada a partir del origen configurado (`API_URL`, `NEXT_PUBLIC_API_URL`). */
export function versionedBaseUrl(origin: string): string {
  return `${origin.replace(/\/+$/, "")}${API_VERSION_PATH}`;
}

export function createApiClient({ headers, ...config }: CreateAxiosDefaults): AxiosInstance {
  const client = axios.create({
    timeout: REQUEST_TIMEOUT_MS,
    ...config,
    headers: { Accept: "application/json", ...headers },
  });

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(toApiError(error)),
  );

  return client;
}
