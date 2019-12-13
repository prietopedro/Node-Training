const express = require("express");

const projects = require("../controllers/projectsController");

const router = express.Router();

const err = { error: "Server Malfunctioning" };
//GET THEM ALL
router.get("/", async (req, res) => {
  try {
    const allProjects = await projects.get();
    allProjects.forEach(project => {
      if(!project.completed){
        project.completed = false
      }else{
        project.completed = true
      }
    })
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
    try {
        const project = await projects.getById(req.params.id)
        if(!project.completed){
          project.completed = false
        }else{
          project.completed = true
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json(err);
    }
});

// POST NEW ONE
router.post("/", async (req, res) => {
  try {
    const newProject = await projects.insert(req.body);
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json(err);
  }
});

// EDIT
router.put("/:id", async (req, res) => {
    try {
        const editedProject = await projects.update(req.params.id,req.body)
        res.status(200).json(editedProject);
    } catch (error) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete("/:id", async (req, res) => {
    try {
        await projects.remove(req.params.id)
        res.status(200).json({message: "Project Deleted"});
    } catch (error) {
        res.status(500).json(err);
    }
});


module.exports = router;
