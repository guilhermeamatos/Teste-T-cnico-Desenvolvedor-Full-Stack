import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    nome: z.string().min(1).max(100),
    email: z.string().email(),
    senha: z.string().min(6).max(100),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    nome: z.string().min(1).max(100).optional(),
    email: z.string().email().optional(),
    senha: z.string().min(6).max(100).optional(),
  }).refine(obj => Object.keys(obj).length > 0, {
    message: "Envie ao menos um campo para atualizar",
    path: ["body"],
  }),
});

export const idParamSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});

export const listUsersQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
    nome: z.string().optional(),
  }),
});
