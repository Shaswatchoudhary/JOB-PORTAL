import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { motion } from "framer-motion"; // Motion for Animations

const floatingLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    alt: "Google",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    alt: "Facebook",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    alt: "Amazon",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    alt: "Twitter",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/LinkedIn_Logo.svg",
    alt: "LinkedIn",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    alt: "Microsoft",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg",
    alt: "Instagram",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/6/64/YouTube_icon_dark.svg",
    alt: "YouTube",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Netflix-Logo-PMS.png",
    alt: "Netflix",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Apple_logo_black.svg",
    alt: "Apple",
  },
];

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
    <div className="relative bg-gray-100 min-h-screen overflow-hidden">
      <Navbar />

      {/* Floating Background Logos */}
      {floatingLogos.map((logo, index) => (
        <motion.img
          key={index}
          src={logo.src}
          alt={logo.alt}
          className="absolute opacity-10 w-16 h-16"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: [
              Math.random() * -300,
              Math.random() * 300,
              Math.random() * -300,
            ],
            y: [
              Math.random() * -300,
              Math.random() * 300,
              Math.random() * -300,
            ],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4, // Faster animation (4-10 sec)
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Profile Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-md hover:shadow-yellow-400 transition-all z-10"
      >
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
            className="text-right bg-yellow-500 hover:bg-yellow-600 text-white shadow-md"
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
          <motion.div
            className="flex flex-wrap gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
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
          </motion.div>
        </div>

        {/* Resume Section */}
        <div className="my-5">
          <h1 className="font-semibold text-lg text-gray-800">Resume:</h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
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
          </motion.div>
        </div>
      </motion.div>

      {/* Applied Jobs Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 shadow-md mt-5 z-10"
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
