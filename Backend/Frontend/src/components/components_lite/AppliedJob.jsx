import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, BriefcaseIcon, BuildingIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Status badge styling
  const getBadgeStyles = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "pending":
      default:
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
    }
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-800">
          Applied Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {allAppliedJobs.length <= 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <BriefcaseIcon className="w-12 h-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">
              No applications yet
            </h3>
            <p className="text-gray-500 mt-2 max-w-md">
              You haven't applied to any jobs yet. Start exploring opportunities
              and submit your applications.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-32">Date</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allAppliedJobs.map((appliedJob) => (
                  <TableRow
                    key={appliedJob._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center text-gray-600">
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {appliedJob?.createdAt ? (
                          formatDate(appliedJob.createdAt)
                        ) : (
                          <Skeleton className="h-4 w-20" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-700">
                      {appliedJob.job?.title || (
                        <Skeleton className="h-4 w-32" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-gray-600">
                        <BuildingIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {appliedJob.job?.company?.name || (
                          <Skeleton className="h-4 w-24" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        className={`capitalize px-2 py-1 ${getBadgeStyles(
                          appliedJob?.status
                        )}`}
                      >
                        {appliedJob?.status || "pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppliedJob;
