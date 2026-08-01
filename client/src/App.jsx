import Calendar from "./components/Calendar";
import { useEffect, useState } from "react";
import "./App.css";

import API from "./services/api";
import StreakAPI from "./services/streakApi";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import StreakPage from "./pages/StreakPage";

function App() {

  const [page, setPage] = useState("todo");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [streaks, setStreaks] = useState([]);

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

  // Fetch all streaks
const fetchStreaks = async () => {
  try {
    const response = await StreakAPI.get("/");
    setStreaks(response.data);
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

  const toggleStreak = async (id) => {
  try {
    const response = await StreakAPI.put(`/${id}/toggle`, {
      date: selectedDate,
    });

    setStreaks((prevStreaks) =>
      prevStreaks.map((streak) =>
        streak._id === id ? response.data : streak
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

  const streaksForSelectedDate = streaks.filter((streak) => {
  if (!streak.startDate || !streak.numberOfDays) {
    return false;
  }

  const startDate = streak.startDate.split("T")[0];

  const start = new Date(`${startDate}T00:00:00`);

  const end = new Date(start);
  end.setDate(end.getDate() + Number(streak.numberOfDays) - 1);

  const selected = new Date(`${selectedDate}T00:00:00`);

  return selected >= start && selected <= end;
});

  // Load todos when app starts
  useEffect(() => {
  fetchTodos();
  fetchStreaks();
}, []);

    return (
      <div className="container">

        <div className="module-nav">
          <button
            className={page === "todo" ? "active-module" : ""}
            onClick={() => setPage("todo")}
          >
            Todo
          </button>

          <button
            className={page === "streak" ? "active-module" : ""}
            onClick={() => setPage("streak")}
          >
            🔥 Streaks
          </button>
        </div>

        {page === "streak" ? (
          <StreakPage />
        ) : (
          <>
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
                className={filter === "completed" ? "active-filter" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>

            <TodoList
              todos={filteredTodos}
              streaks={streaksForSelectedDate}
              selectedDate={selectedDate}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleTodo={toggleTodo}
              toggleStreak={toggleStreak}
            />
          </>
        )}

      </div>
  );
}

export default App;