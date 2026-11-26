/** Resultado de validar el token de un enlace enviado por correo. */
export type EmailLinkValidation<T> = { valid: true; data: T } | { valid: false; reason: string };
