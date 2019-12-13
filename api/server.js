const express = require('express')
const projectRoute = require('./routes/projectsRoutes')
const tasksRoute = require('./routes/tasksRoutes')
const resourcesRoute = require('./routes/resourcesRoutes')
const server = express()

// global middleware
server.use(express.json())

// routes
server.use('/api/projects',projectRoute)
server.use('/api/tasks',tasksRoute)
server.use('/api/resources',resourcesRoute)


module.exports = server