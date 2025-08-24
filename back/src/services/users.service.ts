import * as bcrypt from "bcryptjs";
import { usersRepo } from "../repositories/users.repository";
import type { CreateUserDTO } from "../dtos/user/CreateUserDTO";
import type { UpdateUserDTO } from "../dtos/user/UpdateUserDTO";
import type { User } from "../entities/User";
import { UserMapper } from "../mappers/UserMapper";

export const usersService = {
  async create(input: CreateUserDTO) {
    const exists = await usersRepo.findByEmail(input.email);
    if (exists) throw { status: 409, message: "Email já cadastrado", code: "EMAIL_TAKEN" };

    const senhaHash = await bcrypt.hash(input.senha, 10);

    const newUser: Omit<User, "id" | "dataCriacao"> = {
      nome: input.nome,
      email: input.email,
      senhaHash,
    };

    const entity = await usersRepo.create(newUser);
    return UserMapper.toView(entity); 
  },

  async list(page = 1, limit = 10, nome?: string) {
    const take = Math.min(Math.max(+limit, 1), 100);
    const skip = (Math.max(+page, 1) - 1) * take;

    const [entities, total] = await Promise.all([
      usersRepo.list(skip, take, nome),
      usersRepo.count(nome),
    ]);

    return {
      data: entities.map(UserMapper.toView),
      page: +page,
      limit: take,
      total,
      totalPages: Math.ceil(total / take),
    };
  },

  async getById(id: string) {
    const u = await usersRepo.findById(id);
    return u ? UserMapper.toView(u) : null;
  },

  async update(id: string, patch: UpdateUserDTO) {
    const patchEntity: Partial<Pick<User, "nome" | "email" | "senhaHash">> & { id: string } = {
      id,
    };

    if (patch.nome !== undefined) patchEntity.nome = patch.nome;
    if (patch.email !== undefined) patchEntity.email = patch.email;
    if (patch.senha) patchEntity.senhaHash = await bcrypt.hash(patch.senha, 10);

    try {
      const entity = await usersRepo.update(patchEntity);
      return UserMapper.toView(entity);
    } catch {
      throw { status: 404, message: "Usuário não encontrado", code: "USER_NOT_FOUND" };
    }
  },

  async remove(id: string): Promise<void> {
    try {
      await usersRepo.remove(id);
    } catch {
      throw { status: 404, message: "Usuário não encontrado", code: "USER_NOT_FOUND" };
    }
  },
};
