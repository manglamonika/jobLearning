import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css"; 
import {jwtDecode} from "jwt-decode"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);  // 🔹 Added
  const [err, setErr] = useState("");  // 🔹 Added
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");

    if (!email || !password) {
      setErr("Email and Password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token); // Save token for authentication

        // Decode token to get user role
        const { role } = jwtDecode(token);
        console.log("User Role:", role);

        // Redirect based on role
        if (role === "seeker") {
          navigate("/jobseeker");
        } else if (role === "poster") {
          navigate("/jobPoster");
        }
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="welcome">
        <h1>WELCOME</h1>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        {err && <p style={{ color: "red" }}>{err}</p>} {/* 🔹 Show Error Message */}
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

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
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


