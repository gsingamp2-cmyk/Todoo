import { useEffect, useState } from "react";

function TodoForm({ addTodo, selectedDate }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(selectedDate);

  // Whenever calendar date changes,
  // update the form date automatically
  useEffect(() => {
    setDueDate(selectedDate);
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo(title, dueDate);

    // Clear only the task name
    setTitle("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">
        Add
      </button>
    </form>
  );
}

export default TodoForm;