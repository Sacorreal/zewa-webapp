import "server-only";
import { z } from "zod";

const serverEnvSchema = z.object({
  API_URL: z.url({ error: "API_URL debe ser la URL base de zewa-api." }),
});

export const serverEnv = serverEnvSchema.parse({
  API_URL: process.env.API_URL,
});
