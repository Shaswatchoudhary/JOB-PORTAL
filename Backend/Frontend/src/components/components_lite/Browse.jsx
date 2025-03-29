import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 md:px-8">
        <h1 className="font-bold text-3xl my-10 text-gray-800 text-center">
          <span className="text-[#6A38C2]">Search Results:</span>{" "}
          {allJobs.length} Jobs Found
        </h1>

        {/* Job Cards */}
        {allJobs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg font-medium">No Jobs Available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer border border-gray-200"
              >
                <Job1 job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
