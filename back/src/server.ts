import { app } from "./app";
import { env } from "./env";
import { seedUsersIfNeeded } from "./seedUsers"; 

app.listen(env.PORT, async () => {
  console.log(`API on http://localhost:${env.PORT}`);
  try {
    await seedUsersIfNeeded();
  } catch (err) {
    console.error("[seed] Falha ao executar seed:", err);
  }
});
