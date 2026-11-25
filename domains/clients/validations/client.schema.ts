import { z } from "zod";
import { nitError } from "@/lib/validation/nit";
import { CLIENT_SORTS, CLIENT_STATUSES } from "../types/client.types";

export const CLIENT_NAME_MAX_LENGTH = 150;
export const LOGO_MAX_BYTES = 5 * 1024 * 1024;
export const LOGO_ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"] as const;
export const LOGO_ACCEPT_ATTRIBUTE = ".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp";

const nameSchema = z
  .string()
  .trim()
  .min(1, "El nombre del conjunto es obligatorio.")
  .max(CLIENT_NAME_MAX_LENGTH, `El nombre no puede superar ${CLIENT_NAME_MAX_LENGTH} caracteres.`);

const taxIdSchema = z
  .string()
  .trim()
  .min(1, "El NIT es obligatorio.")
  .superRefine((value, context) => {
    const error = nitError(value);
    if (error) context.addIssue({ code: "custom", message: error });
  });

/** Logo opcional: validación de cortesía; zewa-api revisa el contenido real del archivo. */
const logoSchema = z
  .instanceof(File)
  .refine((file) => file.size <= LOGO_MAX_BYTES, "El logo no puede superar 5 MB.")
  .refine(
    (file) => (LOGO_ACCEPTED_TYPES as readonly string[]).includes(file.type),
    "El logo debe ser una imagen PNG, JPG o WEBP.",
  )
  .optional();

export const createClientSchema = z.object({
  name: nameSchema,
  taxId: taxIdSchema,
  administratorEmail: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Ingresa un correo electrónico válido.")),
  logo: logoSchema,
});

export const updateClientSchema = z.object({
  name: nameSchema,
  taxId: taxIdSchema,
  logo: logoSchema,
  removeLogo: z.boolean(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;

/** Filtros del listado leídos desde la URL (valores inválidos caen al defecto). */
export const clientListQuerySchema = z.object({
  search: z.string().trim().max(CLIENT_NAME_MAX_LENGTH).optional().catch(undefined),
  status: z.enum(CLIENT_STATUSES).optional().catch(undefined),
  page: z.coerce.number().int().min(1).catch(1),
  pageSize: z.coerce.number().int().min(1).max(100).catch(10),
  sort: z.enum(CLIENT_SORTS).catch("createdAt:desc"),
});

export const changeStatusSchema = z.enum(["ACTIVE", "SUSPENDED"]);
export const clientIdSchema = z.uuid();
