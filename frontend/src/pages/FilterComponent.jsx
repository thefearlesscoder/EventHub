import React, { useState } from "react";

const FilterComponent = ({ options, onFilterChange }) => {
  const [selected, setSelected] = useState("");
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const handleSelect = (option) => {
    setSelected(option);
    onFilterChange(option); // Pass the selected option to the parent component
    setIsOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <div className="relative w-full sm:w-[180px]">
      {/* Button to toggle dropdown */}
      <button
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
        className="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full"
      >
        <span style={{ pointerEvents: "none" }}>
          {selected || "All Categories"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down h-4 w-4 opacity-50"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterComponent;
