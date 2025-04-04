import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobSeeker.css"; // Ensure CSS is updated

function JobSeeker() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found, please log in");

        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        const { data, success } = response.data;
        if (success && data) {
          setUser(data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        console.error("API Error:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchLoggedInUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-pic">
            <img src="/default-profile.png" alt="Profile" />
          </div>
          <div className="bio">
            <h2>{user?.bio || "Your Bio Here"}</h2>
          </div>
        </div>

        <div className="profile-details">
          <h3>Personal Information</h3>
          <p><strong>Name:</strong> {user?.firstName || "N/A"}</p>
          <p><strong>Gender:</strong> {user?.gender || "N/A"}</p>
          <p><strong>Location:</strong> {user?.location || "N/A"}</p>

          <h3>Contact Information</h3>
          <p><strong>Email:</strong> {user?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {user?.number || "N/A"}</p>

          <h3>Education & Availability</h3>
          <p><strong>Education:</strong> {user?.education || "N/A"}</p>
          <p><strong>Availability:</strong> {user?.availability || "N/A"}</p>
        </div>

        <div className="profile-buttons">
          <button className="edit-btn" onClick={() => navigate("/profile")}>Edit Profile</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}

export default JobSeeker;
