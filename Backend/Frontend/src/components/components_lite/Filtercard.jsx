import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "frontend",
      "backend",
      "mobile",
      "desktop",
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
  const [openSections, setOpenSections] = useState({
    Location: true,
    Technology: false,
    Experience: false,
    Salary: false,
  });

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white rounded-md shadow-md p-6">
      <h1 className="font-bold text-xl text-blue-800 mb-4">Filter Jobs</h1>
      <hr className="mb-5 border-blue-100" />

      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <div
              className="flex justify-between items-center cursor-pointer bg-blue-50 p-3 rounded-md hover:bg-blue-100 transition-colors"
              onClick={() => toggleSection(data.filterType)}
            >
              <h2 className="font-bold text-lg text-blue-700">
                {data.filterType}
              </h2>
              {openSections[data.filterType] ? (
                <ChevronUp className="h-5 w-5 text-blue-700" />
              ) : (
                <ChevronDown className="h-5 w-5 text-blue-700" />
              )}
            </div>

            {openSections[data.filterType] && (
              <div className="mt-2 pl-2 grid grid-cols-2 gap-1">
                {data.array.map((item, indx) => {
                  const itemId = `Id${index}-${indx}`;
                  return (
                    <div
                      key={itemId}
                      className="flex items-center space-x-2 my-2 p-2 hover:bg-gray-50 rounded-md"
                    >
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="text-blue-600"
                      />
                      <label
                        htmlFor={itemId}
                        className={`cursor-pointer ${
                          selectedValue === item
                            ? "text-blue-700 font-medium"
                            : "text-gray-700"
                        }`}
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

      {selectedValue && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="font-medium">
            Selected: <span className="text-blue-700">{selectedValue}</span>
          </p>
          <button
            onClick={() => setSelectedValue("")}
            className="text-sm text-red-600 hover:text-red-800 underline mt-1"
          >
            Clear selection
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
