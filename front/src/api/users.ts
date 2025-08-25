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

export type PaginatedUsers = {
  data: UserView[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export async function listUsers(params?: { page?: number; limit?: number; nome?: string }) {
  const res = await http.get<PaginatedUsers>("/users", { params });
  return res.data;
}