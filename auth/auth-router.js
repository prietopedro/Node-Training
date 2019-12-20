const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../database/dbConfig");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let hashing;
  if (username && password) {
    hashing = await bcrypt.hash(password, 8);
  } else {
    res.status(401).json({ error: "Wrong Info" });
  }
  try {
    const newUser = await db("users").insert({ username, password: hashing });
    res.status(200).json({ id: newUser[0], username });
  } catch (error) {
    res.status(500).json({ error: "Server Malfunctioning" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ error: "Wrong Info" });
  }
  try {
    const user = await db("users")
      .where({ username })
      .first();
    const checkPass = bcrypt.compareSync(password, user.password);
    if (!checkPass) {
      res.status(500).json({ error: "Wrong username or password" });
    } else {
      const token = jwt.sign({ id: user.id, username }, "secret-sauce", {
        expiresIn: "100000000h"
      });
      res.status(500).json({ token, user: { id: user.id, username } });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Malfunctioning" });
  }
});

module.exports = router;
