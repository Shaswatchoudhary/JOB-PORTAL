import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Bookmark, Briefcase, MapPin, Clock } from "lucide-react";

const Description = () => {
  // Sample Static Job Data (Manually added)
  const jobData = {
    id: "job-123",
    title: "Software Engineer",
    company: "Google",
    location: "India",
    salary: "12-18 LPA",
    jobType: "Full Time",
    experienceLevel: "3+ Years",
    description:
      "Join our dynamic team to build cutting-edge technology solutions. Work with talented engineers to innovate and create impact.",
    applications: 56,
    createdAt: "2025-03-10",
  };

  // Button Disabled State for Apply
  const [isApplied, setIsApplied] = useState(false);

  return (
    <motion.div
      className="max-w-5xl mx-auto my-10 p-8 rounded-lg shadow-lg bg-white border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Job Header */}
      <motion.div
        className="flex items-center justify-between"
        whileHover={{ scale: 1.02 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{jobData.title}</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <MapPin size={18} className="text-blue-500" /> {jobData.location}
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Company Logo"
          className="w-16 h-16 rounded-md border shadow-md"
        />
      </motion.div>

      {/* Job Details */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Badge className="text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-md">
          {jobData.jobType}
        </Badge>
        <Badge className="text-[#FA4F09] font-semibold bg-orange-100 px-3 py-1 rounded-md">
          {jobData.salary}
        </Badge>
        <Badge className="text-[#6B3AC2] font-semibold bg-purple-100 px-3 py-1 rounded-md">
          {jobData.experienceLevel}
        </Badge>
        <Badge className="text-gray-600 font-semibold bg-gray-100 px-3 py-1 rounded-md">
          {jobData.applications} Applicants
        </Badge>
      </div>

      {/* Description */}
      <motion.div
        className="mt-6 p-5 border rounded-lg shadow-md bg-gray-50"
        whileHover={{ scale: 1.02 }}
      >
        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <Briefcase size={20} className="text-green-500" /> Job Description
        </h2>
        <p className="text-gray-600 mt-2 leading-relaxed">
          {jobData.description}
        </p>
      </motion.div>

      {/* Apply Section */}
      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={() => setIsApplied(true)}
          disabled={isApplied}
          className={`px-5 py-2 rounded-lg transition-all duration-300 ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#6B3AC2] hover:bg-[#552d9b]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
        <Button variant="outline">
          <Bookmark size={18} className="mr-2" /> Save Job
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-6 text-gray-500 text-sm flex items-center gap-2">
        <Clock size={16} className="text-green-600" /> Posted on:{" "}
        {jobData.createdAt}
      </div>
    </motion.div>
  );
};

export default Description;
