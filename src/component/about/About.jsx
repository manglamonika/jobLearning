import React, { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", status: "Active", applicants: 12 },
    { id: 2, title: "Backend Developer", status: "Closed", applicants: 5 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({ title: "", status: "Active" });

  const handlePostJob = () => {
    if (newJob.title) {
      setJobs([...jobs, { ...newJob, id: jobs.length + 1, applicants: 0 }]);
      setShowModal(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Job Poster Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-500 text-white p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Total Jobs</h2>
          <p className="text-2xl">{jobs.length}</p>
        </div>
        <div className="bg-green-500 text-white p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Active Jobs</h2>
          <p className="text-2xl">{jobs.filter((job) => job.status === "Active").length}</p>
        </div>
        <div className="bg-yellow-500 text-white p-5 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Total Applicants</h2>
          <p className="text-2xl">{jobs.reduce((acc, job) => acc + job.applicants, 0)}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white py-2 px-4 rounded-lg">
          + Post a New Job
        </button>
        <Link to="/manage-jobs" className="bg-gray-600 text-white py-2 px-4 rounded-lg">
          Manage Jobs
        </Link>
        <Link to="/view-applicants" className="bg-green-600 text-white py-2 px-4 rounded-lg">
          View Applicants
        </Link>
      </div>

      {/* Job Listings Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Manage Jobs</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Job Title</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Applicants</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="text-center">
                <td className="border p-3">{job.title}</td>
                <td className="border p-3">{job.status}</td>
                <td className="border p-3">{job.applicants}</td>
                <td className="border p-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Job Posting Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Post a New Job</h2>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={newJob.status}
              onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
              <button onClick={handlePostJob} className="bg-blue-500 text-white px-4 py-2 rounded">
                Post Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
