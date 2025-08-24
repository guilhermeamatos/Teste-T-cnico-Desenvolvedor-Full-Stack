import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export interface AuthedRequest extends Request { userId?: string } // UUID = string

export function auth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token ausente" });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string };
    req.userId = payload.id;
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido" });
  }
}
