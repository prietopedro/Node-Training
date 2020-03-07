const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username && password) {
      let hashing = await bcrypt.hash(password, 8);
      const newUser = await db("users").insert({ username, password: hashing });
      res.status(200).json({ id: newUser[0], username });
    } else {
      res.status(418).json({ error: "Wrong Body" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Malfunctioning" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ error: "Wrong Info" });
    return;
  }
  try {
    const user = await db("users")
      .where({ username })
      .first();
    const checkPass = bcrypt.compareSync(password, user.password);
    if (!checkPass) {
      res.status(500).json({ error: "Wrong username or password" });
      return;
    } else {
      const token = jwt.sign({ id: user.id, username }, "secret-sauce", {
        expiresIn: "100000000h"
      });
      res.status(200).json({ token, user: { id: user.id, username } });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "Server Malfunctioning" });
    return;
  }
});

module.exports = router;
