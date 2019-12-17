import { Router } from "express";
import {addNewUser, login} from "../controllers/UsersController"

const route = Router();

route.post("/register", addNewUser);

route.post("/login", login);

export default route
