import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { loginSchema } from "../schemas/auth.schemas";
import { auth } from "../middlewares/auth";

const r = Router();

r.post("/login", validate(loginSchema), authController.login);
r.use(auth);
r.get("/validate", (req, res) => {
  res.json({ valid: true });
});

export default r;
