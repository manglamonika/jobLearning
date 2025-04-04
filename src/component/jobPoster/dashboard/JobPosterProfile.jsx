import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import {pics} from '../../../assets/profile.png'
const profilePosterProfile = () => {

//   const [jobs,setJobs] =useState([]);
//   const[error,setError]=useState(null);

 
//   useEffect(() => {
//     const fetchprofiles = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/auth/jobPoster");
//         setJobs(response.data);
// } catch (error) {
//        setError(error.response?.data?.message || error.message);
//       }
//     };
//     fetchprofiles();
//   }, []);
 
// //logout ki functionality
//   const handleLogout=()=>{
//     localStorage.removeItem('token');
//     // setProfile(null);
//     alert('logged out sucssfully')
//     window.location.href='/login';
//   }
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
    <div>


  
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-pic">
            <img src={""} alt="Profile" />
          </div>
          <div className="bio">
            <h2>Your Bio Here</h2>
          </div>
        </div>

        <div className="profile-details">
          <h3>Company Information</h3>
          <p><strong>Name:</strong> {user?.firstName || "N/A"}</p>
          {/* <p><strong>Description:</strong> {jobs.companyDescription}</p> */}

          

          <h3> Availability</h3>
          {/* <p><strong>Social Media:</strong> {jobs.socialMedia}</p> */}
        </div>

        <div>
      
    
    
        </div>

        <div className="profile-buttons">
          <button className="edit-btn">Edit Profile</button>
          <button onClick={handleLogout}className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
    {loading && <p>Loading...</p>}
    {error && <p className="error-msg">{error}</p>}
    </div>
  )
}

export default profilePosterProfile
