const express = require('express');
const postRouter = require('../routers/postRouter');

const app = express();
app.use('/api/posts', postRouter);
module.exports = app;
