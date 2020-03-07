class Task {
  constructor(id, description, completed) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }
}

const task1 = new Task(1, "Do Project", false);
const task2 = new Task(2, "Work on DevDesk", false);
const task3 = new Task(3, "Learn NestJS", false);
const tasks = [task1, task2, task3];

module.exports = { tasks, Task };
