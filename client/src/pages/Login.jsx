import { useState } from "react";
import AuthAPI from "../services/authApi";

function Login({ onLogin, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await AuthAPI.post("/login", {
        email,
        password,
      });

      // Save JWT
      localStorage.setItem("token", response.data.token);

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      onLogin(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Todo App</h1>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <button type="submit">
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <button
            type="button"
            className="auth-link"
            onClick={goToRegister}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;