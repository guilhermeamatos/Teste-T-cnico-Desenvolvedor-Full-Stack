import { prisma } from "./prisma/client";
import bcrypt from "bcryptjs";


export async function seedUsersIfNeeded() {
  const sentinelEmail = "user01@exemple.com";

  const exists = await prisma.usuario.findUnique({
    where: { email: sentinelEmail },
  });

  if (exists) {
    console.log("[seed] Usuários de seed já existentes. Pulando.");
    return;
  }

  const plainPassword = "123456";
  const senhaHash = await bcrypt.hash(plainPassword, 10);

  const data = Array.from({ length: 100 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      nome: `Usuário ${n}`,
      email: `user${n}@exemple.com`,
      senha: senhaHash, 
    };
  });

  const result = await prisma.usuario.createMany({
    data,
    skipDuplicates: true, 
  });

  console.log(`[seed] Inseridos ${result.count} usuários de teste (senha: ${plainPassword}).`);
}
