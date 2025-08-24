// src/middlewares/validate.ts
import type { ZodTypeAny } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
      headers: req.headers,
    });

    if (!parsed.success) {
      const err: any = parsed.error;
      return res.status(400).json({
        error: "ValidationError",
        details: typeof err.flatten === "function" ? err.flatten() : err,
      });
    }

    
    res.locals.validated = parsed.data; // { body?, query?, params?, headers? }
    next();
  };
