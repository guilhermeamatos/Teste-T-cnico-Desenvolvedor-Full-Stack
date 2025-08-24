import { Router } from "express";
import auth from "./auth.routes";
import users from "./users.routes";

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", users);

export default routes;
