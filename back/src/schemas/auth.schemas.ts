import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    senha: z.string().min(6).max(100),
  }),
});
