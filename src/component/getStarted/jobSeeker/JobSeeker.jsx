import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobSeeker.css"; // Ensure the CSS file for styling

function JobSeeker() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

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

  //logout
  const handleLogout=()=>{
    localStorage.removeItem("token");
    navigate('/login')
  }

  return (
    <div className="main-bck">
      <div className="dashboard">
        <div className="profile-pic">
          <button onClick={() => navigate("/profile")}>Edit</button> {/* Navigate to Profile Page */}
        </div>
        
        <div className="name">
        {user ? <h1>Bio:{user.bio}</h1> : <h1>Bio</h1>}
          {user ? <h1>Welcome, {user.firstName}!</h1> : <h1>Welcome!</h1>}
          {user ? <h1>email:{user.email}</h1> : <h1>Email</h1>}
          {user ? <h1>Number{user.number}</h1> : <h1>Number</h1>}
          {user ? <h1>Education:{user.education}</h1> : <h1>Education</h1>}
          {user ? <h1>Gender:{user.gender}</h1> : <h1>Number</h1>}
          {user ? <h1>Location:{user.location}</h1> : <h1>Number</h1>}
          {user ? <h1>Availability{user.availability}</h1> : <h1>Number</h1>}

        </div>
        
        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
{        //logout button
}        <button  className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default JobSeeker;
