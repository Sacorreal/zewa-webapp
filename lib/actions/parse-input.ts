import type { z } from "zod";
import { ApiError } from "@/lib/api/api-error";

/**
 * Valida la entrada de una Server Action con el mismo esquema del formulario.
 * Lanza `ApiError` (400) para que `runAction` lo devuelva como resultado.
 */
export function parseInput<S extends z.ZodType>(schema: S, value: unknown): z.output<S> {
  const result = schema.safeParse(value);
  if (!result.success) {
    const messages = result.error.issues.map(({ message }) => message);
    throw new ApiError(messages[0], 400, messages);
  }
  return result.data;
}

/** Un `<input type="file">` vacío llega como `File` de tamaño 0. */
export function optionalFile(value: FormDataEntryValue | null): File | undefined {
  return value instanceof File && value.size > 0 ? value : undefined;
}
