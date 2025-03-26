import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { Loader2, Upload } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [preview, setPreview] = useState(null);

  // Initialize input state with user data, with proper null checks
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    resume: null, // Changed from 'file' to 'resume' to match backend
    profilePhoto: null,
  });

  // Set initial values when user data or modal opens
  useEffect(() => {
    if (user && open) {
      setInput({
        fullname: user.fullname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills ? user.profile.skills.join(", ") : "",
        resume: null, // Changed from 'file' to 'resume'
        profilePhoto: null,
      });
      setPreview(null);
    }
  }, [user, open]);

  // Handle input field changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle resume file selection
  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, resume: file }); // Changed from 'file' to 'resume'
      toast.info("Resume selected: " + file.name);
    }
  };

  // Handle profile photo selection
  const photoChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Only accept image files
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      setInput({ ...input, profilePhoto: file });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);

    // Convert skills from string to an array & append properly
    const skillsArray = input.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0); // Filter out empty skills

    skillsArray.forEach((skill, index) => {
      formData.append(`skills[${index}]`, skill);
    });

    // Append resume file if selected
    if (input.resume) {
      formData.append("resume", input.resume); // Changed from 'file' to 'resume'
    }

    // Append profile photo if selected
    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setLoading(true);
      console.log("Submitting form data...");

      const res = await axios.post(
        `http://localhost:5001/api/user/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // Update user data in Redux store
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated successfully");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={() => !loading && setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          {/* Profile photo section */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : user?.profile?.profilePhoto ? (
                  <img
                    src={user.profile.profilePhoto}
                    alt="Current profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-400">
                      {input.fullname?.charAt(0) || "?"}
                    </span>
                  </div>
                )}
              </div>
              <label
                htmlFor="profilePhoto"
                className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer"
              >
                <Upload size={16} />
              </label>
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/*"
                onChange={photoChangeHandler}
                className="hidden"
              />
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullname" className="text-right">
                Name
              </Label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Phone
              </Label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <textarea
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3 border border-gray-300 rounded-md p-2 min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                placeholder="e.g., JavaScript, React, Node.js"
                className="col-span-3 border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <div className="col-span-3">
                <input
                  type="file"
                  id="resume"
                  name="resume" // Changed from 'file' to 'resume'
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                {user?.profile?.resume && (
                  <div className="mt-2 text-sm text-gray-500">
                    Current resume: {user.profile.resume.split("/").pop()}
                    <a
                      href={user.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-500 hover:underline"
                    >
                      View
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
