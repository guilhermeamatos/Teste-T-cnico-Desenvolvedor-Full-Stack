import http from "./http";

export type CreateUserDTO = {
  nome: string;
  email: string;
  senha: string;
};

export type UserView = {
  id: string;
  nome: string;
  email: string;
  dataCriacao: string; // ISO
};

export async function createUser(data: CreateUserDTO): Promise<UserView> {
  const res = await http.post<UserView>("/users", data);
  return res.data;
}
