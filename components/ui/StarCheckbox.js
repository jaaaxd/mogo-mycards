import React, { useState } from "react";

export default function StarCheckbox({ label, value, onChange }) {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    onChange(value, newCheckedState);
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        value={value}
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
