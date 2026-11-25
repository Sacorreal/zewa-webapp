import { isAxiosError } from "axios";

const NETWORK_ERROR_MESSAGE = "No fue posible conectar con el servidor. Intenta de nuevo.";
const UNEXPECTED_ERROR_MESSAGE = "Ocurrió un error inesperado.";

interface NestErrorBody {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
    readonly details: string[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function fromNestBody(body: NestErrorBody | undefined, status: number): ApiError {
  const messages = Array.isArray(body?.message)
    ? body.message
    : [body?.message ?? body?.error ?? UNEXPECTED_ERROR_MESSAGE];

  return new ApiError(messages[0], status, messages);
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (isAxiosError<NestErrorBody>(error)) {
    return error.response
      ? fromNestBody(error.response.data, error.response.status)
      : new ApiError(NETWORK_ERROR_MESSAGE, null);
  }

  return new ApiError(UNEXPECTED_ERROR_MESSAGE, null);
}
