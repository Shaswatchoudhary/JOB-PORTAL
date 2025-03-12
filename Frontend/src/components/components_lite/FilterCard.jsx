import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "MERN",
      "React",
      "Data Science",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "Frontend",
      "Backend",
      "Mobile",
      "Desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [openFilter, setOpenFilter] = useState(null); // To toggle each filter
  const dispatch = useDispatch();

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-5">
      {/* Filter Header */}
      <h1 className="font-bold text-xl text-gray-800 mb-3">Filter Jobs</h1>
      <hr className="mb-4 border-gray-300" />

      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-4">
            {/* Filter Type Header */}
            <button
              className="w-full flex justify-between items-center font-semibold text-lg bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-all duration-300"
              onClick={() => setOpenFilter(openFilter === index ? null : index)}
            >
              {data.filterType}
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  openFilter === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Filter Options */}
            {openFilter === index && (
              <div className="mt-2 bg-gray-50 rounded-md p-3">
                {data.array.map((item, indx) => {
                  const itemId = `Id${index}-${indx}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-md transition-all duration-200"
                    >
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="w-4 h-4 text-blue-600"
                      />
                      <label
                        htmlFor={itemId}
                        className="text-gray-700 cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Filter;
