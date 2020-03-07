const projectDb = require('../../../data/helpers/projectModel');

module.exports = {
  validateProjectId: async (req, res, next) => {
    try {
      const project = await projectDb.get(req.params.id);
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ error: 'Did Not Find A Project With This Id' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Something Wrong With The Server' });
    }
  },
  validateProject: (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      res.status(401).json({ error: 'Missing Name or Description' });
    } else {
      next();
    }
  }
};
