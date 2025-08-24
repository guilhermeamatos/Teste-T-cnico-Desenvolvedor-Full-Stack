import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { usersRepo } from "../repositories/users.repository";
import { env } from "../env";
import type { LoginDTO } from "../dtos/auth/LoginDTO";

export const authService = {
  async login(input: LoginDTO) {
    const user = await usersRepo.findByEmail(input.email);
    const ok = user && await bcrypt.compare(input.senha, user.senhaHash);
    if (!ok) {
      throw { status: 401, message: "Credenciais inválidas", code: "BAD_CREDENTIALS" };
    }
    const token = jwt.sign({ id: user!.id }, env.JWT_SECRET, { expiresIn: "1d" });
    return { token };
  },
};
