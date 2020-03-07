const actionsDb = require('../../../data/helpers/actionModel');
const projectDb = require('../../../data/helpers/projectModel');

module.exports = {
  validateActionId: async (req, res, next) => {
    try {
      const action = await actionsDb.get(req.params.id);
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ error: 'Did Not Find An Action With This Id' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something Wrong With The Server' });
    }
  },
  validateAction: (req, res, next) => {
    if (!req.body.description || !req.body.notes || !req.body.project_id) {
      res
        .status(401)
        .json({ error: 'Missing project_id, description, or notes' });
    } else {
      next();
    }
  },
  validateProjectId: async (req, res, next) => {
    try {
      const project = await projectDb.get(req.body.project_id);
      if (project) {
        next();
      } else {
        res.status(404).json({ error: 'Did Not Find A Project With This Id' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something Wrong With The Serverr' });
    }
  }
};
