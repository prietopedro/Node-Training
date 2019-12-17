import { Router } from "express";
import {getAllUsers, addNewUser, login} from "../controllers/UsersController"

const route = Router();

route.get("/users", getAllUsers);

route.post("/register", addNewUser);

route.post("/login", login);

export default route;
