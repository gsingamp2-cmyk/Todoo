import TodoItem from "./TodoItem";

function TodoList({
  todos,
  streaks = [],
  selectedDate,
  deleteTodo,
  editTodo,
  toggleTodo,
  toggleStreak,
}) {
  return (
    <ul>
      {/* Normal Todos */}
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          toggleTodo={toggleTodo}
        />
      ))}

      {/* Streak Todos */}
      {streaks.map((streak) => {
        const completed =
          streak.completedDates?.includes(selectedDate);

        return (
          <li
            key={`streak-${streak._id}`}
            className="todo-item streak-todo"
          >
            <div className="streak-todo-left">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleStreak(streak._id)}
              />

              <span
                className={`todo-title ${
                  completed ? "completed" : ""
                }`}
              >
                {streak.title}
              </span>

              <span className="streak-badge">
                🔥 Streak
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;