const express = require('express');
const db = require('../data/db');
const { check, validationResult } = require('express-validator');
const cors = require('cors');
const postRouter = express.Router();
postRouter.use(express.json());
postRouter.use(cors());

const postSchema = [
  check('title')
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage(
      'Title Must Be A String And Have A Minimum Of 3 Characters and Maximum of 30 Characters'
    ),
  check('contents')
    .isString()
    .isLength({ min: 10, max: 100 })
    .withMessage(
      'Contents Must Be A String And Have A Minimum Of 10 Characters and Maximum of 100 Characters'
    )
];

const commentSchema = [
  check('text')
    .isString()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      'Text Must Be A String, Have A Minimum of 1 character and maximum of 100'
    )
];

postRouter.post('/:id/comments', commentSchema, async (req, res) => {
  try {
    const postToAddComment = await db.findById(req.params.id);
    const errors = validationResult(req);
    if (postToAddComment.length === 0) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    } else if (!errors.isEmpty()) {
      res.status(422).json({ ...errors });
    } else {
      const newComment = { ...req.body, post_id: req.params.id };
      const responseId = await db.insertComment(newComment);
      res.status(200).json({ ...newComment, ...responseId });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something Wrong With The Server' });
  }
});

postRouter.delete('/:id', async (req, res) => {
  try {
    const postToDelete = await db.findById(req.params.id);
    if (postToDelete.length > 0) {
      await db.remove(req.params.id);
      res.status(200).json('Post Deleted');
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: 'Something Wrong With The Server' });
  }
});

postRouter.put('/:id', postSchema, async (req, res) => {
  try {
    const isPost = await db.findById(req.params.id);
    const errors = validationResult(req);
    if (isPost.length === 0) {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    } else if (!errors.isEmpty()) {
      return res.status(422).json({ ...errors });
    } else {
      await db.update(req.params.id, req.body);
      const newPost = await db.findById(req.params.id);
      res.status(201).json(newPost);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ errorMessage: 'Something Wrong With The Server' });
  }
});

postRouter.post('/', postSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ ...errors });
  } else {
    try {
      const newPost = req.body;
      const responseNewPost = await db.insert(newPost);
      return res.status(201).json({ ...responseNewPost, ...newPost });
    } catch (err) {
      return res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    }
  }
});

postRouter.get('/', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' });
  }
});

postRouter.get('/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

postRouter.get('/:id/comments', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post.length > 0) {
      const comments = await db.findPostComments(req.params.id);
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

module.exports = postRouter;
