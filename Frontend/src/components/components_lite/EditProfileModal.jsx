import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: "John Doe",
    email: "johndoe@gmail.com",
    phoneNumber: "+1234567890",
    bio: "A passionate software developer.",
    skills: "React, JavaScript, Node.js",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const FileChangehandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log(input);
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[500px] bg-white rounded-lg shadow-2xl"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle className="text-gray-800 text-xl font-bold">
            ✨ Edit Profile
          </DialogTitle>
        </DialogHeader>

        {/* Form for Editing Profile */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid gap-4 py-4">
            {/* Name */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="name" className="text-right font-medium">
                Name
              </Label>
              <input
                type="text"
                id="name"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="email" className="text-right font-medium">
                Email
              </Label>
              <input
                type="email"
                id="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </motion.div>

            {/* Phone */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="phone" className="text-right font-medium">
                Phone
              </Label>
              <input
                type="tel"
                id="phone"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="bio" className="text-right font-medium">
                Bio
              </Label>
              <input
                type="text"
                id="bio"
                value={input.bio}
                name="bio"
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </motion.div>

            {/* Skills */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="skills" className="text-right font-medium">
                Skills
              </Label>
              <input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </motion.div>

            {/* Resume Upload */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="file" className="text-right font-medium">
                Resume
              </Label>
              <input
                type="file"
                id="file"
                name="file"
                accept="application/pdf"
                onChange={FileChangehandler}
                className="col-span-3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400 transition-all"
              />
            </motion.div>
          </div>

          {/* Footer Buttons */}
          <DialogFooter>
            {loading ? (
              <Button
                disabled
                className="w-full my-4 flex items-center justify-center"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
              </Button>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Button type="submit" className="w-full my-4">
                  Save Changes
                </Button>
              </motion.div>
            )}
          </DialogFooter>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
