import http from "./http";

export type LoginRequest = { email: string; senha: string };
export type LoginResponse = { token: string };

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const res = await http.post<LoginResponse>("/auth/login", data);
  return res.data;
}
