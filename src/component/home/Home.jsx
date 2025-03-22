import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import pic from "../home/profilepic.png";

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <h1>🚀 Get Your Dream Job!</h1>
        <p>Find your perfect job match and start your career journey today.</p>
        <Link to="/login">
          <button className="btn-primary">Get Started</button>
        </Link>
      </div>
      <div className="home-image">
        <div className="image-container">
          <img src={pic} alt="Job Search" className="profile-pic" />
        </div>
      </div>
    </div>
  );
};

export default Home;
