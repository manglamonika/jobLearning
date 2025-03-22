import React from "react";
import "./JobPoster.css";
import { Link } from "react-router-dom";


const JobPoster = () => {
  return (
    <div className="job-poster">
      <header className="poster-header">
        <h1>Post a Job</h1>
        <p>Fill out the details below to post a new job.</p>
      </header>
      <form className="job-form">
        <div className="form-group">
          <label htmlFor="job-title">Job Title</label>
          <input type="text" id="job-title" placeholder="Enter job title" />
        </div>
        <div className="form-group">
          <label htmlFor="company-name">Company Name</label>
          <input type="text" id="company-name" placeholder="Enter company name" />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" id="location" placeholder="Enter job location" />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience Required</label>
          <input type="text" id="experience" placeholder="e.g., 2-5 years" />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary Range</label>
          <input type="text" id="salary" placeholder="e.g., ₹4,00,000 - ₹6,00,000" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            rows="5"
            placeholder="Describe the job responsibilities, requirements, etc."
          ></textarea>
        </div>
        
        <button type="submit" className="post-job-button">
          Post Job
        </button>
        
      </form>
    </div>
  );
};

export default JobPoster;
