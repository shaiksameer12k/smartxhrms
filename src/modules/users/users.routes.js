import { Router } from "express";
import { getusers, getusers_id , postuser} from "./users.controllers.js";

const routes = new Router();

routes.get("/users", getusers);
routes.get("/users/:user_id", getusers_id);
routes.post("/users", postuser);

export default routes;
