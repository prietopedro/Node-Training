const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const { validateUserId, validateUser, validatePost } = require('./middleWare');
const router = express.Router();

const serverError = { error: 'Something Wront With The Server' };

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await userDb.insert(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(serverError);
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await postDb.insert({
      ...req.body,
      user_id: req.params.id
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(serverError);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(serverError);
  }
});

router.get('/:id', validateUserId, async (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await userDb.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(serverError);
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    await userDb.remove(req.params.id);
    res.status(201).json({ message: 'User Removed' });
  } catch (err) {
    res.status(500).json(serverError);
  }
});

router.put('/:id', validateUser, validateUserId, async (req, res) => {
  try {
    await userDb.update(req.params.id, req.body);
    res.status(201).json({ id: req.user.id, name: req.body.name });
  } catch (err) {
    res.status(500).json(serverError);
  }
});

//custom middleware

module.exports = router;
