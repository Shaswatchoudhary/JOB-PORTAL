import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaBriefcase,
} from "react-icons/fa";
import { motion } from "framer-motion";

const appliedJobs = [
  {
    id: 1,
    date: "2025-03-10",
    title: "Frontend Developer",
    company: "Google",
    status: "accepted",
  },
  {
    id: 2,
    date: "2025-02-25",
    title: "Backend Developer",
    company: "Amazon",
    status: "pending",
  },
  {
    id: 3,
    date: "2025-01-18",
    title: "UI/UX Designer",
    company: "Microsoft",
    status: "rejected",
  },
];

const AppliedJob = () => {
  return (
    <div className="p-10 min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-6">
          <FaBriefcase className="text-blue-600" /> Applied Jobs
        </h2>

        <Table className="border border-gray-200 rounded-lg overflow-hidden">
          <TableCaption className="text-gray-600 font-medium">
            Recent Job Applications
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-left text-gray-700">📅 Date</TableHead>
              <TableHead className="text-gray-700">💼 Job Title</TableHead>
              <TableHead className="text-gray-700">🏢 Company</TableHead>
              <TableHead className="text-right text-gray-700">
                🚀 Status
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {appliedJobs.length > 0 ? (
              appliedJobs.map((job) => (
                <motion.tr
                  key={job.id}
                  whileHover={{ scale: 1.02, backgroundColor: "#f9f9f9" }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer border-b border-gray-200 hover:shadow-md"
                >
                  <TableCell className="py-4 px-6">{job.date}</TableCell>
                  <TableCell className="font-semibold py-4 px-6">
                    {job.title}
                  </TableCell>
                  <TableCell className="text-gray-700 py-4 px-6">
                    {job.company}
                  </TableCell>
                  <TableCell className="text-right py-4 px-6">
                    <Badge
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm transition-transform duration-300 ${
                        job.status === "rejected"
                          ? "bg-red-500 hover:bg-red-600"
                          : job.status === "accepted"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      {job.status === "accepted" && <FaCheckCircle />}
                      {job.status === "pending" && <FaClock />}
                      {job.status === "rejected" && <FaTimesCircle />}
                      {job.status}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan="4"
                  className="text-center text-gray-500 py-6 text-lg"
                >
                  ❌ No jobs applied yet. Start applying now!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJob;
