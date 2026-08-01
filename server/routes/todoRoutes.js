const express = require("express");
const router = express.Router();

const {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getTodos);
router.put("/:id", updateTodo);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);







module.exports = router;