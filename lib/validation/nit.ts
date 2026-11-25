/**
 * Validación de NIT colombiano para la UI (DV módulo 11 DIAN). Refleja la
 * regla de zewa-api (`src/utils/nit.ts`), que es la autoritativa.
 */

const DIAN_WEIGHTS = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
const NIT_PATTERN = /^(\d{8,10})(?:-(\d))?$/;

function checkDigit(base: string): number {
  const sum = [...base]
    .reverse()
    .reduce((total, digit, index) => total + Number(digit) * DIAN_WEIGHTS[index], 0);
  const remainder = sum % 11;
  return remainder > 1 ? 11 - remainder : remainder;
}

/** Mensaje de error, o `null` si el NIT es válido. */
export function nitError(raw: string): string | null {
  const match = NIT_PATTERN.exec(raw.replace(/[\s.,]/g, ""));
  if (!match) {
    return "Usa entre 8 y 10 dígitos y, si quieres, el dígito de verificación tras un guion (900.123.456-8).";
  }
  const [, base, provided] = match;
  if (provided !== undefined && Number(provided) !== checkDigit(base)) {
    return "El dígito de verificación del NIT no es válido.";
  }
  return null;
}
