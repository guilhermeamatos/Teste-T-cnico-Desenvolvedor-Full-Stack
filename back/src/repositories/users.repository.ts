import { prisma } from "../prisma/client";
import type { User } from "../entities/User";
import { UserMapper } from "../mappers/UserMapper";

export const usersRepo = {
  
  async create(newUser: Omit<User, "id" | "dataCriacao">): Promise<User> {
    const created = await prisma.usuario.create({
      data: {
        nome: newUser.nome,
        email: newUser.email,
        senha: newUser.senhaHash, 
      },
    });
    return UserMapper.fromPrisma(created); 
  },

  async findByEmail(email: string): Promise<User | null> {
    const u = await prisma.usuario.findUnique({ where: { email } });
    return u ? UserMapper.fromPrisma(u) : null;
  },

  async list(skip: number, take: number, nome?: string): Promise<User[]> {
    const where = nome ? { nome: { contains: nome } } : {};
    const rows = await prisma.usuario.findMany({
      where,
      skip,
      take,
      orderBy: { data_criacao: "desc" },
    });
    return rows.map(UserMapper.fromPrisma);
  },

  async count(nome?: string): Promise<number> {
    const where = nome ? { nome: { contains: nome } } : {};
    return prisma.usuario.count({ where });
  },

  
  async update(
    patch: Partial<Pick<User, "nome" | "email" | "senhaHash">> & { id: string }
  ): Promise<User> {
    const data: any = {};
    if (patch.nome !== undefined) data.nome = patch.nome;
    if (patch.email !== undefined) data.email = patch.email;
    if (patch.senhaHash !== undefined) data.senha = patch.senhaHash;

    const u = await prisma.usuario.update({
      where: { id: patch.id },
      data,
    });
    return UserMapper.fromPrisma(u);
  },

  async findById(id: string): Promise<User | null> {
    const u = await prisma.usuario.findUnique({ where: { id } });
    return u ? UserMapper.fromPrisma(u) : null;
  },

  async remove(id: string): Promise<void> {
    await prisma.usuario.delete({ where: { id } });
  },
};
