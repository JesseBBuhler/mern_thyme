import React from "react";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(userName, password);
  };

  return (
    <div className="signin-section">
      <div className="signin-container">
        <h1>Welcome Back to MyThyme</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            id="username"
            name="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            required
          />

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        <div className="signin-help">
          <p>
            Don't have an account? <Link to="/signup">Sign up now</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
