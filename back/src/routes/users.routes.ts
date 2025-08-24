import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import {
  createUserSchema,
  updateUserSchema,
  idParamSchema,
  listUsersQuerySchema,
} from "../schemas/users.schemas";

const r = Router();

//  públicas
r.post("/", validate(createUserSchema), usersController.create);
r.get("/:id", validate(idParamSchema), usersController.getById);
r.put("/:id", validate(idParamSchema.merge(updateUserSchema)), usersController.update);
r.delete("/:id", validate(idParamSchema), usersController.remove);

// protegida
r.use(auth);

r.get("/", validate(listUsersQuerySchema), usersController.list);


export default r;
