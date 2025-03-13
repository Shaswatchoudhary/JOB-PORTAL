import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Fix: Import useNavigate
import { Button } from "@mui/material";
import { Bookmark, Briefcase, MapPin, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

const Job1 = () => {
  const navigate = useNavigate(); // ✅ Fix: Define navigate function
  const jobid = "ksjks"; // ✅ Fix: Use jobid instead of undefined job._id

  return (
    <motion.div
      className="w-full max-w-3xl p-6 rounded-lg shadow-lg bg-white border border-gray-300 cursor-pointer hover:shadow-blue-300 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      style={{
        minHeight: "250px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <Clock size={16} className="text-green-600" /> 3 Days ago
        </p>
        <Button variant="outlined" className="rounded-lg px-4 py-1 text-sm">
          <Bookmark size={18} className="mr-1" /> Save
        </Button>
      </div>

      {/* Company Details */}
      <div className="flex justify-between items-center my-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Google</h1>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={16} className="text-blue-500" /> India
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Company Logo"
          className="w-14 h-14 rounded-md border shadow-md"
        />
      </div>

      {/* Job Title & Description */}
      <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Briefcase size={20} className="text-green-500" /> Software Engineer
      </h2>
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
        Join our dynamic team to build cutting-edge technology solutions. Work
        with talented engineers to innovate and create impact.
      </p>

      {/* Job Details */}
      <div className="flex flex-wrap gap-3 mt-5">
        <Badge className="text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-md text-sm">
          Open Positions
        </Badge>
        <Badge className="text-[#FA4F09] font-semibold bg-orange-100 px-3 py-1 rounded-md text-sm">
          12-18 LPA
        </Badge>
        <Badge className="text-[#6B3AC2] font-semibold bg-purple-100 px-3 py-1 rounded-md text-sm">
          Remote
        </Badge>
        <Badge className="text-black font-semibold bg-gray-100 px-3 py-1 rounded-md text-sm">
          Full Time
        </Badge>
      </div>

      {/* Apply Button */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${jobid}`)} // ✅ Fix: Use jobid
          variant="outlined"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white">Save For Later</Button>
      </div>
    </motion.div>
  );
};

export default Job1;
