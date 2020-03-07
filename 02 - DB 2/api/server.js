const express = require("express");

const carController = require("./controllers/carcontroller");

const server = express();
server.use(express.json());

// ROUTERS
server.use("/api/cars", carController);

module.exports = server;
