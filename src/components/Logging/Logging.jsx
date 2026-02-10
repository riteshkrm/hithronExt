import React, { useState } from 'react';
import './LoggingStyle.css';
import { googleLogin, logout } from "../../utils/chromeAuth";

const Logging = () => {
  const [email, setEmail] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign in with email:', email);
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <i className="fas fa-truck truck-icon"></i>
          <h1 className="logo">Load</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <h2 className="title">
          Please enter your credentials to<br />sign in!
        </h2>

        {/* Google Sign In */}
        <button className="social-button" onClick={googleLogin}>
          <i className="fab fa-google google-icon"></i>
          <span className="button-text">Sign in with Google</span>
        </button>

        {/* Outlook Sign In */}
        <button className="social-button">
          <i className="fab fa-microsoft microsoft-icon"></i>
          <span className="button-text">Sign in with Outlook</span>
        </button>

        {/* Divider */}
        <div className="divider">
          <div className="divider-line"></div>
          <span className="divider-text">or</span>
          <div className="divider-line"></div>
        </div>

        {/* Email Input */}
        <form onSubmit={handleSignIn}>
          <label className="label">Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          {/* Sign In Button */}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logging;
