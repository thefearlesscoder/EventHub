import React, { useState } from "react";

const FilterComponent = ({ options, onFilterChange }) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (e) => {
    const selectedOption = e.target.value;
    setSelected(selectedOption);
    onFilterChange(selectedOption); // Pass single selected option to parent component
  };

  return (
    <div className="w-fit pr-10">
      <select
        value={selected}
        onChange={handleSelect}
        className="w-full p-2 border rounded-lg bg-pure-greys-50 text-black text-center font-semibold
                   focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="" disabled>
          Select Genre
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="p-2">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponent;
