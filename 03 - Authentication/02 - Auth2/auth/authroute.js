const express = require("express");
const route = express.Router();
const controller = require("./auth.controllers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

route.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const encryptedPass = bcrypt.hashSync(password, 8);
    const id = await controller.signUp({
      ...req.body,
      password: encryptedPass
    });
    res.status(200).json({ ...id[0], username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server malfunctioning" });
  }
});

route.post("/login", async (req, res) => {
  try {
    const { username, password, id } = await controller.logIn(
      req.body.username
    );
    const decrypted = bcrypt.compareSync(req.body.password, password);
    const token = jwt.sign({ username }, "SuperPrivate", {
      expiresIn: "1h"
    });
    if (decrypted) {
      res.status(200).json({ user: { username, id }, token });
    } else {
      res.status(401).json({ error: "Incorrent Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Malfunctioning" });
  }
});
module.exports = route;
