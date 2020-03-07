const express = require('express');
const postDb = require('./postDb');
const { validatePostId, validatePost } = require('../users/middleWare');

const router = express.Router();
const serverError = { error: 'Something Wront With The Server' };

router.get('/', async (req, res) => {
  // do your magic!
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(serverError);
  }
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    await postDb.remove(req.params.id);
    res.status(200).json({ message: 'Post Deleted' });
  } catch (error) {
    res.status(500).json(serverError);
  }
});

router.put('/:id', validatePostId, validatePost, async (req, res) => {
  try {
    const editedPost = await postDb.update(req.params.id, req.body);
    res.status(200).json(req.body);
  } catch (error) {
    res.status(500).json(serverError);
  }
});

module.exports = router;
