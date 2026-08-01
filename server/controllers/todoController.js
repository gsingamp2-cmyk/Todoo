const Todo = require("../models/Todo");

// GET logged-in user's todos
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD todo for logged-in user
const addTodo = async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({
        message: "Title and due date are required",
      });
    }

    const todo = await Todo.create({
      user: req.user._id,
      title,
      dueDate,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE logged-in user's todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    if (title !== undefined) {
      todo.title = title;
    }

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

// DELETE logged-in user's todo
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    await todo.deleteOne();

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};