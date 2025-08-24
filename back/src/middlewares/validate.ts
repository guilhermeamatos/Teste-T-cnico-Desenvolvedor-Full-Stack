import type { ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
    });

    if (!parsed.success) {
      // no Zod v4, error.flatten() continua disponível
      return res.status(400).json({
        error: "ValidationError",
        details: parsed.error.flatten ? parsed.error.flatten() : parsed.error,
      });
    }

    const data = parsed.data as any;
    if (data?.body)   req.body = data.body;
    if (data?.query)  req.query = data.query;
    if (data?.params) req.params = data.params;
    next();
  };
