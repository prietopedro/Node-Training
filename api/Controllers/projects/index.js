const express = require('express');

const projectDb = require('../../../data/helpers/projectModel');
const { validateProjectId, validateProject } = require('./projectsMiddleware');

const projectRouter = express.Router();
projectRouter.get('/', async (req, res) => {
  try {
    const allProjects = await projectDb.get();
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(500).json({ error: 'Something Wrong With The Server' });
  }
});

projectRouter.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

projectRouter.put(
  '/:id',
  validateProject,
  validateProjectId,
  async (req, res) => {
    try {
      const updatedProject = await projectDb.update(req.params.id, req.body);
      res.status(200).json(updatedProject);
    } catch (err) {
      res.status(500).json({ error: 'Something Wrong With The Server' });
    }
  }
);

projectRouter.post('/', validateProject, async (req, res) => {
  try {
    const newProject = await projectDb.insert(req.body);
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json({ error: 'Something Wrong With The Server' });
  }
});

projectRouter.delete('/:id', validateProjectId, async (req, res) => {
  try {
    await projectDb.remove(req.params.id);
    res.status(200).json({ message: 'Project Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Something Wrong With The Server' });
  }
});

projectRouter.get('/:id/actions', validateProjectId, async (req, res) => {
  try {
    const projectActions = await projectDb.getProjectActions(req.params.id);
    res.status(200).json(projectActions);
  } catch (error) {
    res.status(500).json({ error: 'Something Wrong With The Server' });
  }
});

module.exports = projectRouter;
