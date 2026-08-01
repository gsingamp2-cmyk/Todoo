import { useState } from "react";
import AuthAPI from "../services/authApi";

function Register({ onLogin, goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const response = await AuthAPI.post("/register", {
        name,
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

      // User is now authenticated
      onLogin(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Todo App</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            minLength="6"
          />

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <button type="submit">
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <button
            type="button"
            className="auth-link"
            onClick={goToLogin}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;