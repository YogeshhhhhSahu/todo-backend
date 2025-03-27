const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// ✅ Get all todos
router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// ✅ Add a new todo
router.post("/todos", async (req, res) => {
    try {
        const newTodo = new Todo({ text: req.body.text, completed: false });
        await newTodo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(500).json({ error: "Error adding task" });
    }
});

// ✅ Delete a todo
router.delete("/todos/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting task" });
    }
});

// ✅ Update todo completion
router.put("/todos/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: "Error updating task" });
    }
});

module.exports = router;
  