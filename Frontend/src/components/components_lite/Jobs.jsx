import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import Job1 from "./Job1";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Jobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            <FilterCard />
          </div>

          {/* Jobs list section as a grid */}
          {jobsArray.length <= 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <span className="text-lg text-gray-500">Job Not Found</span>
            </div>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobsArray.map((job, index) => (
                  <Job1 key={index} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
