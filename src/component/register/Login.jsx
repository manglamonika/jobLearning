import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"; // Import the CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: email.trim(),
        password,
      });
  
      const { message, token } = res.data;
  
      if (token) {
        localStorage.setItem("token", token); // 🔥 Save token to localStorage
        alert(message);
        navigate("/jobSeeker");
      } else {
        alert("Login successful, but no token received");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
  };
  
  return (
    <div className="login-container">
      <div className="welcome">
        <h1>WELCOME</h1>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Enter your Mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Enter your Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>Don't have an account?</p>
        <Link to="/register">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;