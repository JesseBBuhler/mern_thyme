import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="signin-section">
      <div className="signin-container">
        <h1>Reset Password</h1>
        <p className="form-description">
          Enter the email associated with your account and we will send you a
          link to reset your password.
        </p>
        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />

          <button type="submit" className="signin-button">
            Send Email
          </button>
        </form>
        <div className="signin-help">
          <p>
            <Link to="/login">Return to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
