import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import { IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Briefcase,
  DollarSign,
  Award,
  Calendar,
  Users,
} from "lucide-react";

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const [isApplying, setIsApplying] = useState(false);

  const applyJobHandler = async () => {
    try {
      setIsApplying(true);
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        console.log(res.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);
  console.log("single jobs", singleJob);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto my-10 text-center text-red-500">
        <h2 className="text-xl font-bold">Error loading job details:</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded w-48"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="space-y-3"
            >
              <h1 className="font-bold text-2xl text-gray-800 hover:text-purple-700 transition-colors duration-300">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge
                  className="bg-blue-100 text-blue-600 font-semibold hover:bg-blue-200 transition-colors duration-300"
                  variant="outline"
                >
                  <Briefcase className="w-4 h-4 mr-1" /> {singleJob?.position}{" "}
                  Open
                </Badge>
               <Badge
                 className="bg-orange-100 text-orange-600 font-semibold hover:bg-orange-200 transition-colors duration-300"
                 variant="outline"
               >
                 <div className="flex items-center text-gray-700">
                   <IndianRupee size={16} className="mr-2 text-green-500" />
                   {singleJob?.salary} LPA
                 </div>
               </Badge>
                
                <Badge
                  className="bg-purple-100 text-purple-600 font-semibold hover:bg-purple-200 transition-colors duration-300"
                  variant="outline"
                >
                  <MapPin className="w-4 h-4 mr-1" /> {singleJob?.location}
                </Badge>
                <Badge
                  className="bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition-colors duration-300"
                  variant="outline"
                >
                  <Clock className="w-4 h-4 mr-1" /> {singleJob?.jobType}
                </Badge>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="md:self-start"
            >
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied || isApplying}
                className={`rounded-lg text-md font-semibold px-6 py-2 transition-all duration-300 transform hover:scale-105 ${
                  isApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : isApplying
                    ? "bg-purple-500"
                    : "bg-purple-700 hover:bg-purple-800 shadow-md hover:shadow-lg"
                }`}
              >
                {isApplying ? (
                  <>
                    <span className="animate-spin inline-block h-4 w-4 border-t-2 border-white rounded-full mr-2"></span>
                    Processing...
                  </>
                ) : isApplied ? (
                  "Already Applied"
                ) : (
                  "Apply Now"
                )}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 border-t border-gray-200 pt-6"
          >
            <h2 className="font-bold text-lg text-gray-800 mb-3">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {singleJob?.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-gray-50 p-6 rounded-lg"
          >
            <div className="flex items-center space-x-3 group">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-200 transition-colors duration-300">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium">{singleJob?.position} Positions</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="p-2 bg-purple-100 rounded-full text-purple-600 group-hover:bg-purple-200 transition-colors duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{singleJob?.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
            <div className="flex items-center text-gray-700">
            <IndianRupee size={16} className="mr-2 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Salary</p>
                <p className="font-medium">{singleJob?.salary} LPA</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="p-2 bg-green-100 rounded-full text-green-600 group-hover:bg-green-200 transition-colors duration-300">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">
                  {singleJob?.experienceLevel} Year
                  {singleJob?.experienceLevel !== 1 && "s"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="p-2 bg-red-100 rounded-full text-red-600 group-hover:bg-red-200 transition-colors duration-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Applicants</p>
                <p className="font-medium">{singleJob?.applications?.length}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="p-2 bg-gray-100 rounded-full text-gray-600 group-hover:bg-gray-200 transition-colors duration-300">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="font-medium">{singleJob?.jobType}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="p-2 bg-teal-100 rounded-full text-teal-600 group-hover:bg-teal-200 transition-colors duration-300">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Post Date</p>
                <p className="font-medium">
                  {singleJob?.createdAt.split("T")[0]}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <div className="inline-block relative overflow-hidden group">
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied || isApplying}
                className={`rounded-lg px-8 py-3 text-md font-bold transition-all duration-300 ${
                  isApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-700 hover:bg-purple-800"
                }`}
              >
                {isApplied
                  ? "Application Submitted"
                  : "Apply for this Position"}
              </Button>
              {!isApplied && (
                <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
