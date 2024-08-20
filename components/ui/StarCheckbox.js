import React, { useState } from "react";
import Image from "next/image";
import star from "@/public/icons/star.png";

export default function StarCheckbox({ text, value, onChange }) {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    onChange(value, newCheckedState);
  };

  return (
    <label className="sm:min-w-[80px] sm:w-[80px] min-w-[65px] w-[65px] cursor-pointer">
      <input
        type="checkbox"
        className="hidden"
        checked={checked}
        value={value}
        onChange={handleChange}
      />
      <div
        className={`sm:px-4 px-1 sm:py-1 py-[2px] rounded-full transition-colors duration-300 max-sm:text-sm flex items-center justify-center text-nowrap filter${
          checked ? "-checked" : ""
        }`}
      >
        {text}
      </div>
    </label>
  );
}
