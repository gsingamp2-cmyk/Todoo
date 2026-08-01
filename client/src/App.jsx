import Calendar from "./components/Calendar";
import { useEffect, useState } from "react";
import "./App.css";

import API from "./services/api";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  // Default selected date = today
  const [selectedDate, setSelectedDate] = useState(() => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
});

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
  const addTodo = async (title, dueDate) => {
    try {
      const response = await API.post("/", {
        title,
        dueDate,
      });

      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await API.delete(`/${id}`);

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Edit todo
  const editTodo = async (id, title) => {
    try {
      const response = await API.put(`/${id}`, {
        title,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? response.data : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Complete / uncomplete todo
  const toggleTodo = async (id) => {
    try {
      const todo = todos.find((todo) => todo._id === id);

      if (!todo) return;

      const response = await API.put(`/${id}`, {
        completed: !todo.completed,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? response.data : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Todos belonging to selected calendar date
  const dateTodos = todos.filter((todo) => {
    if (!todo.dueDate) return false;

    const todoDate = todo.dueDate.split("T")[0];

    return todoDate === selectedDate;
  });

  // Summary for selected date
  const totalTasks = dateTodos.length;

  const completedTasks = dateTodos.filter(
    (todo) => todo.completed
  ).length;

  const activeTasks = dateTodos.filter(
    (todo) => !todo.completed
  ).length;

  // All / Active / Completed
  const filteredTodos = dateTodos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  // Load todos when app starts
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>Todo App</h1>

      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <TodoForm
        addTodo={addTodo}
        selectedDate={selectedDate}
      />

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
          className={
            filter === "completed" ? "active-filter" : ""
          }
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