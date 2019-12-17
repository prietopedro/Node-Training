import { Router } from "express";
import {getAllUsers} from "../controllers/UsersController"
import {restricted} from "../controllers/AuthMiddleWare"

const route = Router();

route.get("/users",restricted, getAllUsers);

export default route;