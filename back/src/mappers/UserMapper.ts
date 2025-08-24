import type { Usuario } from "@prisma/client";
import type { User } from "../entities/User";
import type { UserViewDTO } from "../dtos/user/UserViewDTO";

export const UserMapper = {
  fromPrisma(u: Usuario): User {
    return {
      id: u.id,              
      nome: u.nome,
      email: u.email,
      senhaHash: u.senha,
      dataCriacao: u.data_criacao,
    };
  },
  toView(u: User): UserViewDTO {
    return { id: u.id, nome: u.nome, email: u.email, dataCriacao: u.dataCriacao };
  },
};
