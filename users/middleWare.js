const userDb = require('./userDb');
const postDb = require('../posts/postDb');
module.exports = {
  validateUser: function(req, res, next) {
    console.log(req.body);
    if (Object.keys(req.body).length !== 0) {
      if (!req.body.name) {
        res.status(400).json({ message: 'missing required name field' });
      }
    } else {
      res.status(400).json({ message: 'missing post data' });
    }
    next();
  },
  validateUserId: async function(req, res, next) {
    const id = req.params.id;
    try {
      const user = await userDb.getById(id);
      if (!user) {
        res.status(401).json({ message: 'invalid user id' });
      } else {
        req.user = user;
        next();
      }
    } catch (err) {
      res.status(500).json({ error: 'Server Error' });
    }
  },
  logger: function(req, res, next) {
    console.log(`${req.method} ${req.baseUrl} ${new Date()}`);
    next();
  },
  validatePost: function(req, res, next) {
    if (Object.keys(req.body).length !== 0) {
      if (!req.body.text) {
        res.status(400).json({ message: 'missing required text field' });
      }
    } else {
      res.status(400).json({ message: 'missing post data' });
    }
    next();
  },
  validatePostId: async function(req, res, next) {
    const id = req.params.id;
    try {
      const post = await postDb.getById(id);
      if (!post) {
        res.status(401).json({ message: 'invalid post id' });
      } else {
        req.post = post;
        next();
      }
    } catch (err) {
      res.status(500).json({ error: 'Server Error' });
    }
  }
};
