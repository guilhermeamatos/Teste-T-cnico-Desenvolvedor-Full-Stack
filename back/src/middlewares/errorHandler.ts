import type { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err?.status) return res.status(err.status).json({ error: err.message, code: err.code });
  console.error(err);
  return res.status(500).json({ error: "Erro interno" });
}
