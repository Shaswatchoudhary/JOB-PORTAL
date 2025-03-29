import { setAllJobs, setLoading, setError } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [errorLocal, setErrorLocal] = useState(null);
  const [jobsLocal, setJobsLocal] = useState([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoadingLocal(true);
      setErrorLocal(null);
      setJobsLocal([]);
      dispatch(setLoading(true));
      try {
        const res = await axios.get("http://localhost:5001/api/job/get", {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        
        // Check if we got the jobs array
        if (res.data?.status && Array.isArray(res.data?.jobs)) {
          setJobsLocal(res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        } else {
          const errorMessage = "Failed to fetch jobs. Invalid response format.";
          setErrorLocal(errorMessage);
          dispatch(setError(errorMessage));
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
        setErrorLocal(errorMessage);
        dispatch(setError(errorMessage));
      } finally {
        setLoadingLocal(false);
        dispatch(setLoading(false));
      }
    };

    fetchAllJobs();
  }, [dispatch]);

  return { loading: loadingLocal, error: errorLocal, jobs: jobsLocal };
};

export default useGetAllJobs;
