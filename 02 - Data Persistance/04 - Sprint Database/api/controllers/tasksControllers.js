const db = require("../../data/dbConfig");

const insert = data => {
  return db("tasks").insert(data);
};
const get = async () => {
  return db("tasks")
    .join("projects", "tasks.project_id", "=", "projects.id")
    .select(
      "tasks.id as taskId",
      "projects.name as projectName",
      "projects.description as projectDescription",
      "tasks.description",
      "tasks.notes",
      "tasks.completed"
    );
};

const getById = id => {
  return db("tasks")
    .join("projects", "tasks.project_id", "=", "projects.id")
    .select(
      "tasks.id as taskId",
      "projects.name as projectName",
      "projects.description as projectDescription",
      "tasks.description",
      "tasks.notes",
      "tasks.completed"
    )
    .where("tasks.id", "=", id);
};

const update = (id, data) => {
  return db("tasks")
    .where({ id })
    .update(data);
};

const remove = id => {
  return db("tasks")
    .where({ id })
    .del();
};

module.exports = {
  insert,
  get,
  getById,
  update,
  remove
};
