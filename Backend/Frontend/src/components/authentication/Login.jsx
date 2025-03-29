import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
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
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Navbar />
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔐 Login to Your Account
        </h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <Label className="text-gray-600">📧 Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="johndoe@gmail.com"
              className="mt-1 p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label className="text-gray-600">🔑 Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="********"
              className="mt-1 p-3 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center space-x-6">
            <label className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="Student"
                checked={input.role === "Student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <span className="text-gray-700">🎓 Student</span>
            </label>
            <label className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="Recruiter"
                checked={input.role === "Recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <span className="text-gray-700">🏢 Recruiter</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 transition rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
