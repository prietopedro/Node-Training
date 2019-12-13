const express = require('express')
const projectRoute = require('./routes/projectsRoutes')
const server = express()

// global middleware
server.use(express.json())

// routes
server.use('/api/projects',projectRoute)


module.exports = server