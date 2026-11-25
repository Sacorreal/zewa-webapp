import { unstable_rethrow } from "next/navigation";
import { ApiError } from "@/lib/api/api-error";

/**
 * Resultado serializable de una Server Action. En producción Next.js oculta
 * el mensaje de los errores lanzados, así que los fallos esperados se devuelven.
 */
export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; details: string[] };

const UNEXPECTED_ERROR = "Ocurrió un error inesperado. Intenta de nuevo.";

/**
 * Ejecuta la operación y convierte los errores en `ActionResult`. Las señales
 * internas de Next.js (`redirect()`, `notFound()`) se relanzan.
 */
export async function runAction<T>(operation: () => Promise<T>): Promise<ActionResult<T>> {
  try {
    return { ok: true, data: await operation() };
  } catch (error) {
    unstable_rethrow(error);
    return error instanceof ApiError
      ? { ok: false, error: error.message, details: error.details }
      : { ok: false, error: UNEXPECTED_ERROR, details: [] };
  }
}
