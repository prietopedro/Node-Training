// code away!
const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const { logger } = require('./users/middleWare');
const server = express();
server.use(logger);
server.use(express.json());
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

const port = 5000;
server.listen(port, () => console.log(`Port Is Running On Port ${port}`));
