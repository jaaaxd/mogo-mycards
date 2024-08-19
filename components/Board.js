import { useContext } from "react";
import { HomeContext } from "@/pages";
import Button from "./ui/Button";

export function Board() {
  const { fullTextContent, resetSelections, copyToClipboard } =
    useContext(HomeContext);
  return (
    <div className="board-bg bg-gold-500 w-full rounded-xl p-4 border-t-4 border-t-[#eedca2] shadow-sm">
      <div className="board-paper bg-white w-full rounded-lg p-3.5">
        <div className="board-content bg-gold-100 w-full rounded-lg p-5 flex flex-col gap-3 pb-8">
          <h1 className="text-center w-fit font-textarea italic font-extrabold text-[30px] -rotate-3 border-b-4 self-center mb-5 text-[#ccbfa7] border-[#d9d0bf]">
            YOUR TEXT
          </h1>
          <textarea
            id="selected-cards"
            className="font-bold text-lg text-gray-400 w-full h-96 p-2 bg-[#e1dbd097] outline-0 rounded-lg mb-4"
            value={fullTextContent}
          ></textarea>
          <div className="buttons flex gap-4 max-lg:flex-col max-lg:mt-3 max-sm:flex-row justify-center">
            <div className="w-[200px]">
              <Button
                text="COPY"
                onClick={copyToClipboard}
                type="green-button"
              />
            </div>
            <div className="w-[200px]">
              <Button
                text="RESET"
                onClick={resetSelections}
                type="orange-button"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
