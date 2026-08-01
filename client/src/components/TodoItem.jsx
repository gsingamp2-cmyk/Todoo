import { useState } from "react";

function TodoItem({ todo, deleteTodo, editTodo, toggleTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleSave = () => {
    editTodo(todo._id, title);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <input
          className="edit-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (

        <div className="todo-content">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id)}
            />

            <span
                className={`todo-title ${
                todo.completed ? "completed" : ""
                }`}
            >
                {todo.title}
            </span>
        </div>

      )}

      <div className="todo-buttons">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setTitle(todo.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTodo(todo._id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;