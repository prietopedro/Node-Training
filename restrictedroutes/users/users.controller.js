const db = require("../../database/dbConfig");

const getAllUsers = () => {
  return db("users").select("id", "username");
};

module.exports = { getAllUsers };
