import StarCheckbox from "@/components/ui/StarCheckbox";
import { useContext } from "react";
import { HomeContext } from "@/pages";

export default function Filter() {
  const { handleCheckboxChange, setQuery } = useContext(HomeContext);

  return (
    <div className="filter-bar w-full flex items-center justify-between sm:gap-3 gap-2 max-sm:mb-[10px] self-center max-md:px-4">
      <div className="flex gap-2">
        <StarCheckbox text="4-star" value={4} onChange={handleCheckboxChange} />
        <StarCheckbox text="5-star" value={5} onChange={handleCheckboxChange} />
      </div>

      <label className="sm:h-9 h-7 bg-white border-2 border-gold-500 sm:px-4 px-2 py-1 rounded-full max-sm:text-sm flex items-center justify-center">
        <input
          type="text"
          className="w-full lg:text-base text-sm placeholder:text-gray-200 outline-none mx-1 text-gray-400"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="#a88d35"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
    </div>
  );
}
