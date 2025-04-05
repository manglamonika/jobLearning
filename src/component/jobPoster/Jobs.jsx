import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/jobPoster");
        setJobs(response.data);
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div className='jobs-container'>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className='job-card'>
            <h3>{job.title}</h3>
            <p>{job.companyName}</p>
            <p>{job.location}</p>
            {/* <p>{job.description}</p> */}
            <p>{job.Hremail}</p>
            <p>{job.socialMedia}</p>
            <p>{job.companyDescription}</p>
            <button>Apply</button>
          </div>
        ))
      ) : (
        <p>No jobs available.</p>
      )}
    </div>
  );
};

export default Jobs;
