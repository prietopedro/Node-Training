const express = require('express');

const projectRouter = require('./Controllers/projects');
const actionRouter = require('./Controllers/actions');
const server = express();

server.use(express.json());

// ROUTERS
server.use('/projects', projectRouter);
server.use('/actions', actionRouter);

server.get('/', (req, res) => {
  res.send("It's Working");
});

module.exports = server;
