const express = require("express");
const restricted = require("../auth/RestictedMiddleWare");

// ROUTES
const authroute = require("../auth/authroute");
const usersroute = require("../restrictedroutes/users/users.routes");

const app = express();
app.use(express.json());

app.use("/api", authroute);

//RESTRICTED
app.use(restricted);
app.use("/api/restricted/users", usersroute);

module.exports = app;
