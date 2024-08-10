import React, { useState } from "react";

export default function StarCheckbox({ label }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={handleChange}
      />
      <div
        className={`px-4 py-2 border-2 rounded transition-colors duration-300 flex items-center justify-center ${
          checked
            ? "bg-blue-500 border-blue-500 text-white"
            : "bg-white border-gray-300 text-gray-800"
        }`}
      >
        {label}
      </div>
    </label>
  );
}
