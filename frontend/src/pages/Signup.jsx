import React from "react";
import { Link } from "react-router-dom";

function Signup() {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="signin-section">
      <div className="signin-container">
        <h1>Welcome to MyThyme</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="email">User Name</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />

          <button type="submit" className="signin-button">
            Sign Up
          </button>
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
