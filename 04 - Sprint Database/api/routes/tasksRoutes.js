const express = require("express");

const tasks = require("../controllers/tasksControllers");

const router = express.Router();

const err = { error: "Server Malfunctioning" };
//GET THEM ALL
router.get("/", async (req, res) => {
  try {
    const allTasks = await tasks.get();
    allTasks.forEach(task => {
      if (!task.completed) {
        task.completed = false;
      } else {
        task.completed = true;
      }
    });
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json(err);
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const task = await tasks.getById(req.params.id);
    if (!task.completed) {
      task.completed = false;
    } else {
      task.completed = true;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(err);
  }
});

// POST NEW ONE
router.post("/", async (req, res) => {
  try {
    const newTask = await tasks.insert(req.body);
    res.status(200).json(newTask);
  } catch (error) {
    res.status(500).json(err);
  }
});

// EDIT
router.put("/:id", async (req, res) => {
  try {
    const editedTask = await tasks.update(req.params.id, req.body);
    res.status(200).json(editedTask);
  } catch (error) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await tasks.remove(req.params.id);
    res.status(200).json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
