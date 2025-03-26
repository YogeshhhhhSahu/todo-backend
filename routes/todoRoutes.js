const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// Get all tasks
router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a new task
router.post("/todos", async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  await newTodo.save();
  res.json(newTodo);
});

// Delete a task
router.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

// Update task completion
router.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

module.exports = router;
