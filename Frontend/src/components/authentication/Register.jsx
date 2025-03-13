import React, { useState, useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/data";
import { Sun, Moon, Upload } from "lucide-react";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    file: null,
  });

  const [darkMode, setDarkMode] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setInput({ ...input, file });
      setFileName(file.name);
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(USER_API_ENDPOINT + "/register", formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(
          res.data.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);

      let errorMessage = "An unexpected error occurred.";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message.includes("Network Error")) {
        errorMessage = "Network Error: Please check your internet connection.";
      }

      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-10">
        <div
          className={`w-full max-w-lg ${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl shadow-xl overflow-hidden`}
        >
          {/* Theme Toggle */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode
                  ? "bg-gray-700 text-yellow-300"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="px-6 pb-8">
            <div className="text-center mb-8">
              <h1
                className={`font-bold text-2xl ${
                  darkMode ? "text-indigo-400" : "text-indigo-600"
                }`}
              >
                Create Account
              </h1>
              <p
                className={`mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Join our platform today
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Full Name */}
              <div>
                <Label className="block mb-2">Full Name</Label>
                <Input
                  type="text"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  placeholder="John Doe"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Email */}
              <div>
                <Label className="block mb-2">Email Address</Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="yourname@example.com"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Phone Number */}
              <div>
                <Label className="block mb-2">Phone Number</Label>
                <Input
                  type="tel"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  placeholder="Enter your phone number"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Password */}
              <div>
                <Label className="block mb-2">Password</Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Profile Photo Upload */}
              <div>
                <Label className="block mb-2">Profile Photo</Label>
                <div className="relative flex items-center border rounded-lg p-2 bg-white dark:bg-gray-800">
                  {/* File Input */}
                  <Input
                    type="file"
                    accept="image/*"
                    name="profilePhoto"
                    onChange={changeFileHandler}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />

                  {/* File Name Display */}
                  <span className="flex-grow text-gray-500 dark:text-gray-300 pl-2 truncate">
                    {fileName}
                  </span>

                  {/* Upload Button */}
                  <button
                    type="button"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Upload size={18} />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <Label className="block mb-2">I am a:</Label>
                <select
                  name="role"
                  value={input.role}
                  onChange={changeEventHandler}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Select Role</option>
                  <option value="Student">Student</option>
                  <option value="Recruiter">Recruiter</option>
                </select>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>

            {/* Already Have an Account? */}
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
