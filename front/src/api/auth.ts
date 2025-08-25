import http from "./http";

export type LoginRequest = { email: string; senha: string };
export type LoginResponse = { token: string };

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const res = await http.post<LoginResponse>("/auth/login", data);
  return res.data;
}

export async function validateToken(): Promise<boolean> {
  try {
    const res = await http.get<{ valid: boolean }>("/auth/validate");
    return res.data?.valid === true;
  } catch {
    return false;
  }
}