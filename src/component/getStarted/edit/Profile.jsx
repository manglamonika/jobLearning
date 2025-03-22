import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Profile.css';
const Profile = () => {
  const [formData, setFormData] = useState({
    bio: "",
    education: "",
    location: "",
    mobile: "",
    // email: "",
    gender: "",
    availability: "",
  });
 
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const  navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.name === "resume") {
      setResume(e.target.files[0]);
    } else if (e.target.name === "profilePhoto") {
      setProfilePhoto(e.target.files[0]);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formDataToSend = new FormData();

  //   Object.keys(formData).forEach((key) => {
  //     formDataToSend.append(key, formData[key]);
  //   });

  //   if (resume) formDataToSend.append("resume", resume);
  //   if (profilePhoto) formDataToSend.append("profilePhoto", profilePhoto);

  //   try {
  //     const response = await axios.post("http://localhost:5000/api/auth/profile", formDataToSend, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     console.log("Profile Updated Successfully", response.data);
  //   } catch (error) {
  //     console.error("Error updating profile", error);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔹 Form submit hone par page refresh na ho isliye

    const formDataToSend = new FormData(); // 🛑 File upload ke liye FormData use karna zaroori hai

    Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
    });

    if (resume) formDataToSend.append("resume", resume); // 🔹 Agar resume hai to add karo
    if (profilePhoto) formDataToSend.append("profilePhoto", profilePhoto); // 🔹 Agar profile photo hai to add karo

    try {
        const token = localStorage.getItem("token"); // 🛑 Authentication token lena zaroori hai

        const response = await axios.put("http://localhost:5000/api/auth/profile", formDataToSend, {
            headers: { 
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}` // 🛑 Backend me authentication ke liye token bhejna zaroori hai
            },
        });

        console.log("Profile Updated Successfully", response.data);
        alert("Profile Updated Successfully");
    } catch (error) {
        console.error("Error updating profile", error);
        alert("Error updating profile");
    }
};

  return (
    <div className="profile-form">
      <h2>Basic Details</h2>
      <form onSubmit={handleSubmit}>
        <label>bio</label>
        <input type="text" name="bio" value={formData.bio} onChange={handleChange} />

        <label>Education</label>
        <input type="text" name="education" value={formData.education} onChange={handleChange} />

        <label>Current Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} />

        <label>Mobile Number</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />

        {/* <label>Email Address</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} /> */}

        <label>Availability to Join</label>
        <select name="availability" value={formData.availability} onChange={handleChange}>
          <option value="15 Days or less">15 Days or less</option>
          <option value="1 Month">1 Month</option>
          <option value="2 Months">2 Months</option>
          <option value="3 Months">3 Months</option>
          <option value="More than 3 Months">More than 3 Months</option>
        </select>

        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <label>Resume</label>
        <input type="file" name="resume" onChange={handleFileChange} />
        
        <label>Profile Photo</label>
        <input type="file" name="profilePhoto" onChange={handleFileChange} />

        <div className="form-actions">
          
          <button type="button" onClick={()=>{navigate("/jobSeeker")}}>Back to Profile</button>
          <button type="submit">Save</button>

        </div>
      </form>
    </div>
  );
};

export default Profile;

