import { useEffect, useState } from "react";
import "./App.css";

import API from "./services/api";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await API.get("/");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add todo
  const addTodo = async (title) => {
    try {
      const response = await API.post("/", {
        title,
      });

      setTodos([...todos, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
  try {
    await API.delete(`/${id}`);

    setTodos(todos.filter((todo) => todo._id !== id));
  } catch (error) {
    console.log(error);
  }
};

const editTodo = async (id, title) => {
  try {
    const response = await API.put(`/${id}`, {
      title,
    });

    setTodos(
      todos.map((todo) =>
        todo._id === id ? response.data : todo
      )
    );
  } catch (error) {
    console.log(error);
  }
};

const toggleTodo = async (id) => {
  try {
    const todo = todos.find((todo) => todo._id === id);

    const response = await API.put(`/${id}`, {
      completed: !todo.completed,
    });

    setTodos(
      todos.map((todo) =>
        todo._id === id ? response.data : todo
      )
    );
  } catch (error) {
    console.log(error);
  }
};

const totalTasks = todos.length;

const completedTasks = todos.filter(
  (todo) => todo.completed
).length;

const activeTasks = todos.filter(
  (todo) => !todo.completed
).length;

const filteredTodos = todos.filter((todo) => {
  if (filter === "active") {
    return !todo.completed;
  }

  if (filter === "completed") {
    return todo.completed;
  }

  return true;
});



  useEffect(() => {
    fetchTodos();
  }, []);

  return (
  <div className="container">
    <h1>Todo App</h1>

    <TodoForm addTodo={addTodo} />

    <div className="task-summary">
      <span>Total: {totalTasks}</span>
      <span>Active: {activeTasks}</span>
      <span>Completed: {completedTasks}</span>
    </div>

    <div className="filters">
      <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "active" ? "active-filter" : ""}
        onClick={() => setFilter("active")}
      >
        Active
      </button>

      <button
        className={filter === "completed" ? "active-filter" : ""}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>

    <TodoList
      todos={filteredTodos}
      deleteTodo={deleteTodo}
      editTodo={editTodo}
      toggleTodo={toggleTodo}
    />
  </div>
);
}

export default App;