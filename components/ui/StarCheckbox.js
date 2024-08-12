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
        className={`px-4 py-1 rounded-lg transition-colors duration-300 flex items-center justify-center ${
          checked
            ? "border-primary border-2 bg-[#f2e7c6]"
            : "border-gray-light border"
        }`}
      >
        {label}
      </div>
    </label>
  );
}
