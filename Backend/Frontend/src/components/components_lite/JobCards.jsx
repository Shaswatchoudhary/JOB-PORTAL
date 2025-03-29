import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin, Briefcase, DollarSign, Users } from "lucide-react";
import { IndianRupee } from "lucide-react";

const JobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-lg shadow-md bg-white border border-gray-100 cursor-pointer 
                transition-all duration-300 hover:shadow-lg hover:border-blue-200 
                transform hover:-translate-y-1 group"
    >
      {/* Header section with company name and location */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {job.name}
          </h3>
          <div className="flex items-center text-gray-500 text-sm mt-1">
            <Building2 size={14} className="mr-1" />
            <span>India</span>
          </div>
        </div>

        {/* Job type badge */}
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none">
          {job.jobType}
        </Badge>
      </div>

      {/* Job title with larger font */}
      <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">
        {job.title}
      </h2>

      {/* Job description with limited height */}
      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
        {job.descriptionz}
      </p>

      {/* Job details with icons */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        <div className="flex items-center text-gray-700">
          <Users size={16} className="mr-2 text-blue-500" />
          <span>{job.position} Open Positions</span>
        </div>

        <div className="flex items-center text-gray-700">
          <IndianRupee size={16} className="mr-2 text-green-500" />
          <span>{job.salary} LPA</span>
        </div>

        <div className="flex items-center text-gray-700">
          <MapPin size={16} className="mr-2 text-red-500" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center text-gray-700">
          <Briefcase size={16} className="mr-2 text-purple-500" />
          <span>{job.jobType}</span>
        </div>
      </div>

      {/* Apply button that appears on hover */}
      <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors w-full">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCards;
