import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);
  const loading = useSelector((state) => state.jobs?.loading || false);
  const error = useSelector((state) => state.jobs?.error || null);

  console.log("Current jobs state:", {
    allJobs,
    loading,
    error,
    jobsCount: allJobs.length,
    firstJob: allJobs[0] || "No jobs"
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading jobs: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h2>

      {/* Job Cards */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No jobs available at the moment
          </div>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => (
              <JobCards key={job._id} job={job} />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;