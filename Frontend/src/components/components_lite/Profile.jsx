import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen, Download } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";
import { motion } from "framer-motion";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const profile = user?.profile ?? {};

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <Navbar />

      {/* Profile Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-2xl my-5 p-8 shadow-lg hover:shadow-yellow-500 transition-all transform hover:-translate-y-1"
      >
        {/* Profile Header */}
        <div className="flex justify-between items-center">
          <motion.div
            className="flex items-center gap-5"
            whileHover={{ scale: 1.02 }}
          >
            <Avatar className="cursor-pointer h-24 w-24 border-2 border-yellow-400 shadow-md">
              <AvatarImage
                src={profile.profilePhoto ?? "/default-avatar.png"}
                alt="User Avatar"
              />
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {user?.fullname ?? "No Name Available"}
              </h1>
              <p className="text-gray-600">{profile.bio ?? "No bio added"}</p>
            </div>
          </motion.div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right bg-yellow-500 hover:bg-yellow-600 text-white shadow-md transition-all"
          >
            <Pen size={20} />
          </Button>
        </div>

        {/* Contact Details */}
        <div className="my-5 space-y-3">
          <motion.div
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 shadow-md hover:shadow-yellow-400 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <Mail className="text-blue-500" />
            <a
              href={`mailto:${user?.email ?? ""}`}
              className="text-blue-600 hover:underline"
            >
              {user?.email ?? "Email not available"}
            </a>
          </motion.div>
          <motion.div
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-100 shadow-md hover:shadow-yellow-400 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <Contact className="text-green-500" />
            <a
              href={`tel:${user?.phoneNumber ?? ""}`}
              className="text-blue-600 hover:underline"
            >
              {user?.phoneNumber ?? "Phone number not available"}
            </a>
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1 className="font-semibold text-lg text-gray-800">Skills:</h1>
          <motion.div
            className="flex flex-wrap gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {profile.skills?.length > 0 ? (
              profile.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No Skills Added</span>
            )}
          </motion.div>
        </div>

        {/* Resume Section */}
        <div className="my-5">
          <h1 className="font-semibold text-lg text-gray-800">Resume:</h1>
          <motion.div
            className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-md hover:shadow-yellow-400 transition-all"
            whileHover={{ scale: 1.02 }}
          >
            {profile.resume ? (
              <a
                href={profile.resume}
                download={profile.resumeOriginalName ?? "Resume.pdf"}
                className="text-green-600 hover:underline flex items-center gap-2"
              >
                <Download size={18} /> {profile.resumeOriginalName ?? "Resume"}
              </a>
            ) : (
              <span className="text-gray-500">No Resume Found</span>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Applied Jobs Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-2xl p-8 shadow-lg mt-5 hover:shadow-yellow-500 transition-all transform hover:-translate-y-1"
      >
        <h1 className="text-lg font-semibold text-gray-800 mb-4">
          Applied Jobs
        </h1>
        <AppliedJob />
      </motion.div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
