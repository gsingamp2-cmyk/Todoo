import { useState } from "react";

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTodo(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
    <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />

  <button type="submit">Add</button>
</form>
  );
}

export default TodoForm;