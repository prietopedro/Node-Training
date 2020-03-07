const db = require("../database/dbConfig");

const signUp = body => {
  return db("users").insert(body);
};

const logIn = username => {
  return db("users")
    .where({ username })
    .first();
};

module.exports = { signUp, logIn };
