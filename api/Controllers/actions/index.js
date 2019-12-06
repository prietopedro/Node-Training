const express = require('express');

const actionsDb = require('../../../data/helpers/actionModel');

const actionRouter = express.Router();

actionRouter.get('/', async (req, res) => {
  try {
    const allActions = await actionsDb.get();
    res.status(200).json(allActions);
  } catch (err) {
    res.status(500).json({ error: 'Something Wrong With The Server' });
  }
});

module.exports = actionRouter;
