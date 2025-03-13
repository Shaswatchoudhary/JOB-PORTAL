import React, { useState, useEffect } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Sun, Moon, Mail, Lock, User, Building } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  useEffect(() => {
    // Apply dark mode class to document body
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5001/api/user/login`,
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message); //notification purpose
      }
    } catch (error) {
      console.error("Error:", error);

      const errorMessage = error.response
        ? error.response.data.message || "An unexpected error occurred."
        : "Network Error: Please check your internet connection.";

      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <Navbar></Navbar>
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 py-10">
        <div
          className={`w-full max-w-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-2xl shadow-xl overflow-hidden`}
        >
          {/* Theme Toggle */}
          <div className="flex justify-end p-4">
            <button
              onClick={toggleDarkMode}
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
                Welcome Back
              </h1>
              <p
                className={`mt-2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Sign in to your account
              </p>
            </div>

            <form onSubmit={submitHandler}>
              <div className="space-y-5">
                <div>
                  <Label
                    className={`block mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email Address
                  </Label>
                  <div
                    className={`relative rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail
                        size={18}
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <Input
                      type="email"
                      value={input.email}
                      name="email"
                      onChange={changeEventHandler}
                      placeholder="yourname@example.com"
                      className={`pl-10 border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-gray-50 border-gray-300"
                      } focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-lg`}
                    />
                  </div>
                </div>

                <div>
                  <Label
                    className={`block mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Password
                  </Label>
                  <div
                    className={`relative rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock
                        size={18}
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    </div>
                    <Input
                      type="password"
                      value={input.password}
                      name="password"
                      onChange={changeEventHandler}
                      placeholder="••••••••"
                      className={`pl-10 border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-gray-50 border-gray-300"
                      } focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-lg`}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <Label
                    className={`block mb-3 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    I am a:
                  </Label>
                  <div
                    className={`grid grid-cols-2 gap-4 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer ${
                        input.role === "Student"
                          ? darkMode
                            ? "bg-indigo-900 border-indigo-500"
                            : "bg-indigo-50 border-indigo-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      } border`}
                      onClick={() => setInput({ ...input, role: "Student" })}
                    >
                      <div
                        className={`flex justify-center items-center w-6 h-6 rounded-full ${
                          input.role === "Student"
                            ? darkMode
                              ? "bg-indigo-500"
                              : "bg-indigo-600"
                            : darkMode
                            ? "bg-gray-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <User
                          size={14}
                          className={
                            input.role === "Student"
                              ? "text-white"
                              : darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="radio"
                          name="role"
                          value="Student"
                          checked={input.role === "Student"}
                          onChange={changeEventHandler}
                          className="hidden"
                        />
                        <span>Student</span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer ${
                        input.role === "Recruiter"
                          ? darkMode
                            ? "bg-indigo-900 border-indigo-500"
                            : "bg-indigo-50 border-indigo-500"
                          : darkMode
                          ? "bg-gray-700 border-gray-600"
                          : "bg-gray-50 border-gray-200"
                      } border`}
                      onClick={() => setInput({ ...input, role: "Recruiter" })}
                    >
                      <div
                        className={`flex justify-center items-center w-6 h-6 rounded-full ${
                          input.role === "Recruiter"
                            ? darkMode
                              ? "bg-indigo-500"
                              : "bg-indigo-600"
                            : darkMode
                            ? "bg-gray-600"
                            : "bg-gray-200"
                        }`}
                      >
                        <Building
                          size={14}
                          className={
                            input.role === "Recruiter"
                              ? "text-white"
                              : darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="radio"
                          name="role"
                          value="Recruiter"
                          checked={input.role === "Recruiter"}
                          onChange={changeEventHandler}
                          className="hidden"
                        />
                        <span>Recruiter</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {loading ? (
                    <button
                      disabled
                      className={`w-full py-3 flex items-center justify-center rounded-lg ${
                        darkMode ? "bg-indigo-700" : "bg-indigo-600"
                      } text-white font-medium`}
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={`w-full py-3 rounded-lg ${
                        darkMode
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } text-white font-medium transition-colors`}
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </form>

            <div
              className={`mt-8 pt-6 text-center border-t ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Don't have an account?
              </p>
              <Link to="/register" className="inline-block w-full mt-3">
                <button
                  className={`w-full py-3 rounded-lg ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white font-medium transition-colors`}
                >
                  Create Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
