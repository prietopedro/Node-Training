const express = require('express')
const taskcontroller = require('./tasks/taskcontroller')
const app = express()

app.use(express.json())

app.use("/api/tasks", taskcontroller)

module.exports = app;