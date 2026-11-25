import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url({
    error: "NEXT_PUBLIC_API_URL debe ser la URL base de zewa-api.",
  }),
});

// Cada variable se referencia de forma estática para que Next.js la incruste en el bundle del navegador.
export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
