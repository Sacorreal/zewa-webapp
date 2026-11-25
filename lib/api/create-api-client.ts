import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";
import { toApiError } from "./api-error";

const REQUEST_TIMEOUT_MS = 15_000;

export function createApiClient(config: CreateAxiosDefaults): AxiosInstance {
  const client = axios.create({
    timeout: REQUEST_TIMEOUT_MS,
    headers: { Accept: "application/json" },
    ...config,
  });

  client.interceptors.response.use(
    (response) => response,
    (error: unknown) => Promise.reject(toApiError(error)),
  );

  return client;
}
