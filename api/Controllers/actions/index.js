const express = require('express');

const actionsDb = require('../../../data/helpers/actionModel');
const projectDb = require('../../../data/helpers/projectModel');
const {
  validateActionId,
  validateAction,
  validateProjectId
} = require('./actionsMiddleware');

const actionRouter = express.Router();

actionRouter.get('/', async (req, res) => {
  try {
    const allActions = await actionsDb.get();
    res.status(200).json(allActions);
  } catch (err) {
    res.status(500).json({ error: 'Something Wrong With The Server' });
  }
});

actionRouter.get('/:id', validateActionId, async (req, res) => {
  res.status(200).json(req.action);
});

actionRouter.put(
  '/:id',
  validateActionId,
  validateProjectId,
  async (req, res) => {
    try {
      const editedAction = await actionsDb.update(req.params.id, req.body);
      res.status(200).json(editedAction);
    } catch (error) {
      res.status(500).json({ error: 'Something Wrong With The Serverr' });
    }
  }
);

actionRouter.post('/', validateAction, validateProjectId, async (req, res) => {
  try {
    const newAction = await actionsDb.insert(req.body);
    res.status(200).json(newAction);
  } catch (error) {
    res.status(500).json({ error: 'Something Wrong With The Serverr' });
  }
});

actionRouter.delete('/:id', validateActionId, async (req, res) => {
  try {
    await actionsDb.remove(req.params.id);
    res.status(200).json({ message: 'Action Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Something Wrong With The Serverr' });
  }
});

module.exports = actionRouter;
