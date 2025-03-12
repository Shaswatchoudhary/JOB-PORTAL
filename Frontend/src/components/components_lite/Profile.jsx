import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  const [open, setOpen] = useState(false);

  // Dummy User Data for Frontend Testing
  const user = {
    fullname: "Shaswat",
    email: "shaswat@example.com",
    phoneNumber: "+91 9876543210",
    profile: {
      profilePhoto: "https://github.com/shadcn.png",
      bio: "Software Engineer | React Developer",
      skills: ["React", "JavaScript", "Node.js", "Tailwind CSS"],
      resume: "https://example.com/resume.pdf",
      resumeOriginalName: "shaswat_Resume.pdf",
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-md hover:shadow-yellow-400 transition-all">
        {/* Profile Section */}
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="cursor-pointer h-24 w-24 border-2 border-yellow-400">
              <AvatarImage src={user.profile.profilePhoto} alt="User Avatar" />
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                {user.fullname}
              </h1>
              <p className="text-gray-600">{user.profile.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen size={20} />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail size={18} />
            <a
              href={`mailto:${user.email}`}
              className="text-blue-600 hover:underline"
            >
              {user.email}
            </a>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact size={18} />
            <a
              href={`tel:${user.phoneNumber}`}
              className="text-blue-600 hover:underline"
            >
              {user.phoneNumber}
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1 className="font-semibold text-lg text-gray-800">Skills:</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            {user.profile.skills.length > 0 ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">No Skills Added</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-5">
          <h1 className="font-semibold text-lg text-gray-800">Resume:</h1>
          <div>
            {user.profile.resume ? (
              <a
                target="_blank"
                href={user.profile.resume}
                className="text-green-600 hover:underline cursor-pointer"
              >
                Download {user.profile.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">No Resume Found</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-md mt-5">
        <h1 className="text-lg font-semibold text-gray-800 mb-4">
          Applied Jobs
        </h1>
        <AppliedJob />
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
