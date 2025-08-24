import "dotenv/config";

const required = ["DATABASE_URL", "JWT_SECRET", "PORT"] as const;
for (const key of required) if (!process.env[key]) throw new Error(`Env faltando: ${key}`);

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  PORT: Number(process.env.PORT || 3000),
};
