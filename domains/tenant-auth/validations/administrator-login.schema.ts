import { z } from "zod";
import { passwordField } from "@/lib/validation/credentials";
import { nitField } from "@/lib/validation/nit";

export const administratorLoginSchema = z.object({
  nit: nitField("Ingresa el NIT del conjunto."),
  password: passwordField,
});

export type AdministratorLoginInput = z.infer<typeof administratorLoginSchema>;
