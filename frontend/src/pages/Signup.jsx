import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import useAuthContext from "../hooks/useAuthContext";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(userName, email, password);
    setPassword("");
  };

  return (
    <div className="signin-section">
      {user && <Navigate to="/" replace={true} />}
      <div className="signin-container">
        <h1>Welcome to MyThyme</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            id="userName"
            name="userName"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            name="email"
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

          <button type="submit" className="signin-button" disabled={isLoading}>
            Sign Up
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        <div className="signin-help">
          <p>
            Already have an account? <Link to="/login">Log in now</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
