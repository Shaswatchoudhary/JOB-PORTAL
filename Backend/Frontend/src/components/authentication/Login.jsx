import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Navigate, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true)); // Start loading
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      dispatch(setLoading(false)); // End loading
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar></Navbar>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-600 py-6">
            <h1 className="font-bold text-2xl text-center text-white">
              Welcome Back
            </h1>
            <p className="text-blue-100 text-center text-sm mt-1">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={submitHandler} className="px-8 py-6 space-y-6">
            <div>
              <Label className="text-gray-700 font-medium block mb-2">
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="you@example.com"
                  className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm rounded-md"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-700 font-medium block mb-2">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="••••••••"
                  className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm rounded-md"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-700 font-medium block mb-3">
                I am a:
              </Label>
              <div className="flex items-center justify-center space-x-6 bg-gray-50 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="Student"
                    checked={input.role === "Student"}
                    onChange={changeEventHandler}
                    className="w-4 h-4 cursor-pointer text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="r1" className="text-gray-700">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="Recruiter"
                    checked={input.role === "Recruiter"}
                    onChange={changeEventHandler}
                    className="w-4 h-4 cursor-pointer text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="r2" className="text-gray-700">
                    Recruiter
                  </Label>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            )}
          </form>

          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?
            </p>
            <Link to="/register" className="block mt-2">
              <button className="w-full py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300">
                Create an account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
