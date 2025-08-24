// src/env.ts
import "dotenv/config";

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing env ${name}`);
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: required("JWT_SECRET", process.env.JWT_SECRET),      
  DATABASE_URL: required("DATABASE_URL", process.env.DATABASE_URL) 
} as const;
