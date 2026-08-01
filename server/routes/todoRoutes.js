const express = require("express");
const router = express.Router();

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

// All Todo routes require a valid JWT
router.get("/", protect, getTodos);
router.post("/", protect, addTodo);
router.put("/:id", protect, updateTodo);
router.delete("/:id", protect, deleteTodo);

module.exports = router;