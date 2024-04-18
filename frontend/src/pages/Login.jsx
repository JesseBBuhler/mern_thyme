import React from "react";

function Login() {
  return (
    <div className="signin-section">
      <div className="signin-container">
        <h1>Welcome Back to MyThyme</h1>
        <form className="signin-form">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        <div className="signin-help">
          <p>
            Don't have an account? <a href="/signup">Sign up now</a>
          </p>
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
