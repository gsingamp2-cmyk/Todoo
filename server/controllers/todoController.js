const Todo = require("../models/Todo");

// GET all todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD todo
const addTodo = async (req, res) => {
  try {
    const { title } = req.body;

    const todo = await Todo.create({
      title,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Update title only if frontend sends title
    if (title !== undefined) {
      todo.title = title;
    }

    // Update completed only if frontend sends completed
    if (completed !== undefined) {
      todo.completed = completed;
    }

    const updatedTodo = await todo.save();

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};