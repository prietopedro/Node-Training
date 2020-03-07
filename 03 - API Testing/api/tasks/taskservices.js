const taskModel = require("./task.model");
const uuid = require("uuid");

const getAllTasks = (req, res) => {
  try {
    res.status(200).json(taskModel.tasks);
  } catch (error) {
    res.status(500).json({ error: "Server Malfunctioning" });
  }
};

const postNewTask = (req, res) => {
  const { description } = req.body;
  if (description) {
    const newTask = new taskModel.Task(uuid(), description, false);
    tasks.push(newTask);
    res.status(200).json(newTask);
  } else {
    res.status(403).json({ error: "Enter Description Please" });
  }
};

module.exports = { getAllTasks, postNewTask };
