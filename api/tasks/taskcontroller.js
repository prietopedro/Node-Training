const express = require("express");
const services = require("./taskservices");
const taskcontroller = express.Router();

taskcontroller.get("/", services.getAllTasks);

taskcontroller.post("/", services.postNewTask);

module.exports = taskcontroller;
