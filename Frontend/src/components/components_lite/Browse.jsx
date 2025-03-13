import React, { useState } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";

const jobList = [
  { id: 1, title: "Software Engineer", company: "Google" },
  { id: 2, title: "Data Scientist", company: "Amazon" },
  { id: 3, title: "Frontend Developer", company: "Facebook" },
  { id: 4, title: "Backend Developer", company: "Netflix" },
  { id: 5, title: "UI/UX Designer", company: "Microsoft" },
  { id: 6, title: "Marketing Manager", company: "Apple" },
];

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Job Search Logic
  const filteredJobs = jobList.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Browse Jobs</h1>

        {/* Search Bar */}
        <div className="mb-6 flex items-center bg-gray-100 rounded-lg p-3 shadow-md">
          <input
            type="text"
            placeholder="Search Jobs (e.g. Developer, Google)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 bg-transparent outline-none text-gray-800"
          />
        </div>

        {/* Job Results */}
        <div>
          <h2 className="text-lg font-semibold my-2">
            Search Results: {filteredJobs.length}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <Job1 key={job.id} job={job} />)
            ) : (
              <p className="text-gray-500">No jobs found!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
