import { Request, Response } from "express";
import { insert, get, getByUsername } from "../models/UsersModel";
import bcryptjs from "bcryptjs";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await get();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Something Wrong With My Server" });
  }
};

export const addNewUser = async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    newUser.password = bcryptjs.hashSync(newUser.password, 8);
    const resNewUser = await insert(newUser);
    res.status(200).json(resNewUser);
  } catch (error) {
    res.status(500).json({ error: "Something Wrong With My Server" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await getByUsername(req.body.username);
    req.session.user = user;
    if (user && bcryptjs.compareSync(req.body.password, user.password)) {
      res.status(200).json({ message: `Welcome ${user.username}` });
    } else {
      res.status(404).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Something Wrong With My Server" });
  }
};
