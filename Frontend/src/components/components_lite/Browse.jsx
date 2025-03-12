import React from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-4">Browse Jobs</h1>

        {/* Job Cards */}
        <div>
          <h2 className="text-lg font-semibold my-2">
            Search Results: {randomJobs.length}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {randomJobs.map((item, index) => (
              <Job1 key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
