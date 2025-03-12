import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Bookmark } from "lucide-react";
import { Button } from "@mui/material";

const JobCard = () => {
  return (
    <motion.div
      className="p-6 rounded-2xl shadow-xl bg-white border border-gray-200 cursor-pointer hover:shadow-blue-300 transition-all duration-300"
      whileHover={{ scale: 1.03 }}
      style={{ overflow: "hidden" }} // Extra scroll हटाने के लिए
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Google</h1>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin size={16} className="text-blue-500" /> India
          </p>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Company Logo"
          className="w-10 h-10 rounded-full border"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Briefcase size={18} className="text-green-500" /> Software Engineer
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Join our dynamic team to build cutting-edge technology solutions. Work
          with talented engineers to innovate and create impact.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center mt-5">
        <Badge className="text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full">
          Open Positions
        </Badge>
        <Badge className="text-[#FA4F09] font-semibold bg-orange-100 px-3 py-1 rounded-full">
          12-18 LPA
        </Badge>
        <Badge className="text-[#6B3AC2] font-semibold bg-purple-100 px-3 py-1 rounded-full">
          Remote
        </Badge>
        <Badge className="text-black font-semibold bg-gray-100 px-3 py-1 rounded-full">
          Full Time
        </Badge>
        <Badge className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
          <Clock size={14} /> 3 Days Ago
        </Badge>
      </div>

      {/* Save for Later Button */}
      <div className="mt-4 flex justify-end">
        <Button variant="outlined" className="rounded-full" size="small">
          <Bookmark className="mr-2" size={16} /> Save for Later
        </Button>
      </div>
    </motion.div>
  );
};

export default JobCard;
