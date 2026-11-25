import type { ActionResult } from "./action-result";

/** Error de una Server Action con el detalle devuelto por zewa-api. */
export class ActionError extends Error {
  constructor(
    message: string,
    readonly details: string[],
  ) {
    super(message);
    this.name = "ActionError";
  }
}

/** Para `useMutation`: convierte un `ActionResult` fallido en excepción. */
export async function unwrapAction<T>(result: Promise<ActionResult<T>>): Promise<T> {
  const settled = await result;
  if (!settled.ok) throw new ActionError(settled.error, settled.details);
  return settled.data;
}
