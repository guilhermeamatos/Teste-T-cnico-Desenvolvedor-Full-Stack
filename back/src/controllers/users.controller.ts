import type { Request, Response } from "express";
import { usersService } from "../services/users.service";
import type { CreateUserDTO } from "../dtos/user/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/user/UpdateUserDTO";

export const usersController = {
  async create(req: Request<{}, any, CreateUserDTO>, res: Response) {
    const dto = await usersService.create(req.body);
    return res.status(201).json(dto);
  },

  async list(
    req: Request<{}, any, any, { page?: string; limit?: string; nome?: string }>,
    res: Response
  ) {
    const { page = "1", limit = "10", nome = "" } = req.query;
    const result = await usersService.list(Number(page), Number(limit), nome || undefined);
    return res.json(result);
  },

  async getById(req: Request<{ id: string }>, res: Response) {
    const dto = await usersService.getById(req.params.id);
    if (!dto) return res.status(404).json({ error: "Usuário não encontrado" });
    return res.json(dto);
  },

  async update(req: Request<{ id: string }, any, UpdateUserDTO>, res: Response) {
    const dto = await usersService.update(req.params.id, req.body);
    return res.json(dto);
  },

  async remove(req: Request<{ id: string }>, res: Response) {
    await usersService.remove(req.params.id);
    return res.status(204).send();
  },
};
