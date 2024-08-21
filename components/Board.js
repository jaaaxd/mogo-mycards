import { useContext } from "react";
import { HomeContext } from "@/pages";
import Button from "./ui/Button";
import logo from "@/public/logo.png";
import Image from "next/image";

export function Board() {
  const {
    resetSelections,
    copyToClipboard,
    setTextareaContent,
    textareaContent,
  } = useContext(HomeContext);

  return (
    <div className="board-bg bg-gold-500 w-full sm:rounded-xl sm:p-4 p-3 border-y-2 sm:border-t-4 border-y-[#eedca2] shadow-sm max-sm:pb-4">
      <div className="board-paper bg-white w-full sm:rounded-lg rounded-xl sm:p-3.5 p-2.5">
        <div className="board-content bg-gold-100 w-full rounded-lg sm:p-5 px-3 flex flex-col sm:gap-3 sm:pb-8">
          <h1 className="max-sm:hidden text-center w-fit font-textarea italic font-extrabold text-[30px] -rotate-3 border-b-4 self-center mb-5 text-[#ccbfa7] border-[#d9d0bf]">
            YOUR TEXT
          </h1>
          <div className="sm:hidden sm:w-full w-[190px] pb-[2px] self-center flex justify-center">
            <Image src={logo} alt="logo" />
          </div>
          <textarea
            id="selected-cards"
            className="font-bold sm:text-lg text-sm text-gray-400 w-full sm:h-96 h-32 p-2 bg-[#e1dbd097] outline-0 rounded-lg sm:mb-4"
            value={textareaContent}
            onChange={(e) => setTextareaContent(e.target.value)}
          ></textarea>
          <div className="buttons flex gap-4 max-lg:flex-col max-sm:flex-row justify-center max-sm:my-3">
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
