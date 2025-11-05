import React, { useEffect, useState } from "react";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { motion } from "framer-motion";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: null,
  });
  
  const [errors, setErrors] = useState({});

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate all steps before submission
    const isStep1Valid = validateStep(1);
    const isStep2Valid = validateStep(2);
    const isStep3Valid = validateStep(3);
    
    if (!isStep1Valid || !isStep2Valid || !isStep3Valid) {
      toast.error('Please fill in all required fields correctly');
      return;
    }
    
    const formData = new FormData();
    formData.append("fullname", input.fullname.trim());
    formData.append("email", input.email.trim());
    formData.append("password", input.password);
    formData.append("pancard", input.pancard.trim());
    formData.append("adharcard", input.adharcard.trim());
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber.trim());
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!input.fullname.trim()) newErrors.fullname = 'Full name is required';
      if (!input.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!input.password) {
        newErrors.password = 'Password is required';
      } else if (input.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
    } else if (step === 2) {
      if (!input.pancard.trim()) newErrors.pancard = 'PAN card number is required';
      if (!input.adharcard.trim()) newErrors.adharcard = 'Aadhar card number is required';
      if (!input.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required';
      } else if (!/^[0-9]{10}$/.test(input.phoneNumber.trim())) {
        newErrors.phoneNumber = 'Invalid phone number';
      }
    } else if (step === 3) {
      if (!input.role) newErrors.role = 'Please select a role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const progressBarStyles = {
    width: `${(currentStep / totalSteps) * 100}%`,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center max-w-5xl mx-auto p-4"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-xl rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
            <h1 className="font-bold text-2xl text-center">
              Create Your Account
            </h1>
            <p className="text-center text-blue-100 mt-2">
              Complete the form to join our platform
            </p>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div
                className="bg-blue-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span className={currentStep >= 1 ? "text-blue-600" : ""}>
                Basic Info
              </span>
              <span className={currentStep >= 2 ? "text-blue-600" : ""}>
                Identification
              </span>
              <span className={currentStep >= 3 ? "text-blue-600" : ""}>
                Final Details
              </span>
            </div>
          </div>

          <form onSubmit={submitHandler} className="p-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={childVariants} className="mb-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-gray-700 block mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    {errors.fullname && <span className="text-red-500 text-xs">{errors.fullname}</span>}
                  </div>
                  <Input
                    type="text"
                    value={input.fullname}
                    name="fullname"
                    onChange={changeEventHandler}
                    placeholder="John Doe"
                    className={`${errors.fullname ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                  />
                </motion.div>

                <motion.div variants={childVariants} className="mb-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-gray-700 block mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                  </div>
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="johndoe@example.com"
                    className={`${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                  />
                </motion.div>

                <motion.div variants={childVariants} className="mb-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-gray-700 block mb-1.5">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
                  </div>
                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    autoComplete="new-password"
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className={`${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Step 2: Identification */}
            {currentStep === 2 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={childVariants} className="mb-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-gray-700 block mb-1.5">
                      PAN Card Number <span className="text-red-500">*</span>
                    </Label>
                    {errors.pancard && <span className="text-red-500 text-xs">{errors.pancard}</span>}
                  </div>
                  <Input
                    type="text"
                    value={input.pancard}
                    name="pancard"
                    onChange={changeEventHandler}
                    placeholder="ABCDE1234F"
                    className={`${errors.pancard ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                  />
                </motion.div>

                <motion.div variants={childVariants} className="mb-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-gray-700 block mb-1.5">
                      Aadhar Card Number <span className="text-red-500">*</span>
                    </Label>
                    {errors.adharcard && <span className="text-red-500 text-xs">{errors.adharcard}</span>}
                  </div>
                  <Input
                    type="text"
                    value={input.adharcard}
                    name="adharcard"
                    onChange={changeEventHandler}
                    placeholder="1234 5678 9012"
                    className={`${errors.adharcard ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                  />
                </motion.div>

                <motion.div variants={childVariants} className="mb-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-gray-700 block mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    {errors.phoneNumber && <span className="text-red-500 text-xs">{errors.phoneNumber}</span>}
                  </div>
                  <Input
                    type="tel"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    placeholder="9876543210"
                    className={`${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200`}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Step 3: Final Details */}
            {currentStep === 3 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={childVariants} className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-gray-700 block">
                      I am registering as a: <span className="text-red-500">*</span>
                    </Label>
                    {errors.role && <span className="text-red-500 text-xs">{errors.role}</span>}
                  </div>
                  <div className="flex gap-6 mt-2">
                    <div className="flex-1">
                      <div
                        className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
                          input.role === "Student"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => setInput({ ...input, role: "Student" })}
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                            />
                          </svg>
                        </div>
                        <div className="font-medium">Student</div>
                        <Input
                          type="radio"
                          name="role"
                          value="Student"
                          checked={input.role === "Student"}
                          onChange={changeEventHandler}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div
                        className={`border-2 rounded-lg p-4 text-center cursor-pointer transition-all duration-200 ${
                          input.role === "Recruiter"
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() =>
                          setInput({ ...input, role: "Recruiter" })
                        }
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="font-medium">Recruiter</div>
                        <Input
                          type="radio"
                          name="role"
                          value="Recruiter"
                          checked={input.role === "Recruiter"}
                          onChange={changeEventHandler}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={childVariants} className="mb-6">
                  <Label className="text-gray-700 block mb-2">
                    Profile Photo (Optional)
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <div className="text-sm text-gray-600 mb-2">
                      Drag and drop or click to upload (Optional)
                    </div>
                    <div className="text-xs text-gray-500">
                      (Max file size: 5MB, Optional)
                    </div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={ChangeFilehandler}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                  {input.file && (
                    <div className="text-sm text-gray-600 mt-2">
                      Selected file: {input.file.name}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-2.5 px-5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
                >
                  Back
                </motion.button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-2.5 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Continue
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-2.5 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Complete Registration"
                  )}
                </motion.button>
              )}
            </div>
          </form>

          <div className="p-6 bg-gray-50 border-t">
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
