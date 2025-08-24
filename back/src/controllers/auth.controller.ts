import type { Request, Response } from "express";
import { authService } from "../services/auth.service";
import type { LoginDTO } from "../dtos/auth/LoginDTO";

export const authController = {
  async login(req: Request<{}, any, LoginDTO>, res: Response) {
    const result = await authService.login(req.body);
    return res.json(result);
  },
};
