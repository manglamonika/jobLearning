import React, { useState } from "react";
import axios from "axios";
import "./PosterMainPage.css";
import { useNavigate } from "react-router-dom";
const PosterMainPage = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    Hremail: "",
    location: "",
    socialMedia: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
 const Navigate = useNavigate();
  // ✅ Input field update karna
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Profile update API call using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    // ✅ Email validation BEFORE making API call
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.Hremail)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/jobPoster", {
        companyName: form.name,  // ✅ Match backend expected fields
        companyDescription: form.description,
        hrEmail: form.Hremail,  // ✅ Case-sensitive fix
        companyLocation: form.location,
        socialMedia: form.socialMedia,
      });
        
      localStorage.setItem("token", response.data.token);
      setSuccess("Profile updated successfully");
      setForm({
        name: "",
        description: "",
        Hremail: "",
        location: "",
        socialMedia: "",
      });
      alert("Profile updated successfully"); // ✅ Alert for success

      setTimeout(()=>{
         Navigate('/JobPosterProfile');
      },1000)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="poster-main-page">
      <h1>Job Poster Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>Company Name</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />

        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          placeholder="Enter a brief description about your company"
        ></textarea>

        <label>HR Email</label>
        <input type="email" name="Hremail" value={form.Hremail} onChange={handleChange} required />

        <label>Location</label>
        <input type="text" name="location" value={form.location} onChange={handleChange} required />

        <label>Social Media</label>
        <input type="text" name="socialMedia" value={form.socialMedia} onChange={handleChange} placeholder="Enter your company's social media link" />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Post Job"}
        </button>
      </form>

      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PosterMainPage;
