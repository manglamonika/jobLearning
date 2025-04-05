import React from "react";
import "./JobPoster.css";
import pic from "../../assets/profile.png"; // Placeholder image path
import { useNavigate } from "react-router-dom";

function JobPoster() {
  const navigate = useNavigate();

  return (
    <div className="mainDiv job-poster-container">
      <div className="heroSection job-poster-card">
        {/* Left Side Content */}
        <div className="textContent">
          <h2>
            🚀 <span className="spark">Hire Smarter</span>, Hire Faster!
          </h2>
          <p>
            Find top talent effortlessly. Post your job and connect with the best candidates
            — faster than ever before!
          </p>

          <ul className="job-poster-info">
            <li>✅ Instant job posting</li>
            <li>✅ Verified, skilled candidates</li>
            <li>✅ Easy applicant tracking</li>
          </ul>

          <button onClick={() => navigate("/PosterMainPage")} className="btn">
            Post a Job Now
          </button>
          <button onClick={() => navigate("/JobPosterProfile")} className="btn">
            Profile
          </button>
        </div>

        {/* Right Side Image */}
        <div className="imageContainer">
          <img src={pic} alt="Hiring Team" />
        </div>
      </div>
    </div>
  );
}

export default JobPoster;