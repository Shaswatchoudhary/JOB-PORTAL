import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  if (!job || !job._id) {
    return <p className="text-center text-gray-500">Loading job details...</p>;
  }

  console.log("Rendering job:", {
    id: job._id,
    title: job.title,
    company: job.company?.name
  });

  return (
    <div 
      onClick={() => navigate(`/description/${job._id}`)} 
      className="p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300"
    >
      <div>
        <h1 className="text-lg font-medium">{job.company?.name || "Unknown Company"}</h1>
        <p className="text-sm text-gray-600">{job.location || "Unknown Location"}</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">{job.title || "No Title"}</h2>
        <p className="text-sm text-gray-600">
          {job.description || "No Description Available"}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 items-center mt-4">
        {job.position && (
          <Badge className="text-blue-600 font-bold" variant="ghost">
            {job.position} Open Positions
          </Badge>
        )}
        {job.salary && (
          <Badge className="text-[#FA4F09] font-bold" variant="ghost">
            {job.salary} LPA
          </Badge>
        )}
        {job.location && (
          <Badge className="text-[#6B3AC2] font-bold" variant="ghost">
            {job.location}
          </Badge>
        )}
        {job.jobType && (
          <Badge className="text-black font-bold" variant="ghost">
            {job.jobType}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default JobCards;