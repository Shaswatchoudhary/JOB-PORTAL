import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";

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
  const [expandedSections, setExpandedSections] = useState({
    Location: true,
    Technology: false,
    Experience: false,
    Salary: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const clearFilter = () => {
    setSelectedValue("");
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-lg text-gray-800">Filter Jobs</h1>
        {selectedValue && (
          <button
            onClick={clearFilter}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            Clear filter
          </button>
        )}
      </div>

      {selectedValue && (
        <div className="mb-4">
          <Badge className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1 rounded-full">
            {selectedValue}
            <X size={14} className="cursor-pointer" onClick={clearFilter} />
          </Badge>
        </div>
      )}

      <Separator className="my-3" />

      <ScrollArea className="h-96 pr-4">
        <RadioGroup value={selectedValue} onValueChange={handleChange}>
          {filterData.map((data, index) => (
            <div key={index} className="mb-4">
              <div
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSection(data.filterType)}
              >
                <h2 className="font-semibold text-gray-700">
                  {data.filterType}
                </h2>
                {expandedSections[data.filterType] ? (
                  <ChevronUp size={18} className="text-gray-500" />
                ) : (
                  <ChevronDown size={18} className="text-gray-500" />
                )}
              </div>

              {expandedSections[data.filterType] && (
                <div className="ml-2 mt-2 grid grid-cols-2 gap-x-4">
                  {data.array.map((item, indx) => {
                    const itemId = `Id${index}-${indx}`;
                    return (
                      <div
                        key={itemId}
                        className="flex items-center space-x-2 my-1.5 hover:bg-gray-50 rounded p-1"
                      >
                        <RadioGroupItem
                          value={item}
                          id={itemId}
                          className="text-blue-600"
                        />
                        <label
                          htmlFor={itemId}
                          className="text-sm cursor-pointer text-gray-700 truncate"
                        >
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}

              {index < filterData.length - 1 && <Separator className="my-2" />}
            </div>
          ))}
        </RadioGroup>
      </ScrollArea>
    </div>
  );
};

export default Filter;
