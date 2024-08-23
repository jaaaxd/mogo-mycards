import { useContext } from "react";
import { HomeContext } from "@/pages";
import Button from "./ui/Button";
import logo from "@/public/logo.png";
import Image from "next/image";

export default function Board() {
  const {
    resetSelections,
    copyToClipboard,
    setTextareaContent,
    textareaContent,
  } = useContext(HomeContext);

  return (
    <div className="sm:m-4 lg:m-0 board-bg h-full bg-gold-500 w-full  sm:rounded-xl sm:p-4 p-3 border-y-2 sm:border-t-4 border-y-[#eedca2] shadow-sm max-sm:pb-4">
      <div className="board-paper bg-white h-full w-full sm:rounded-lg rounded-xl sm:p-3.5 p-2.5">
        <div className="board-content bg-gold-100 h-full w-full rounded-lg lg:p-5 px-3 flex flex-col lg:gap-3 ">
          <h1 className="max-lg:hidden text-center w-fit font-textarea italic font-extrabold text-[30px] -rotate-3 border-b-4 self-center mb-5 text-[#ccbfa7] border-[#d9d0bf]">
            YOUR TEXT
          </h1>
          <div className="lg:hidden w-[160px] pb-[2px] self-center flex justify-center">
            <Image src={logo} alt="logo" />
          </div>
          <div className="sm:h-full max-lg:max-w-[578px] w-full self-center min-h-32 flex max-sm:flex-col max-lg:flex-row flex-col max-lg:mb-3 max-lg:gap-3">
            <textarea
              id="selected-cards"
              className="font-bold lg:text-base text-sm text-gray-400 w-full sm:h-full h-32 p-2 bg-[#e1dbd097] outline-0 rounded-lg"
              value={textareaContent}
              onChange={(e) => setTextareaContent(e.target.value)}
            ></textarea>
            <div className="buttons flex lg:gap-6 gap-3 max-sm:flex-row max-lg:flex-col lg:justify-center max-sm:justify-center lg:mt-3 lg:mb-1">
              <div className="lg:w-[170px] w-[110px] max-sm:w-[140px]">
                <Button
                  text="COPY"
                  onClick={copyToClipboard}
                  type="green-button"
                />
              </div>
              <div className="lg:w-[170px] w-[110px] max-sm:w-[140px]">
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
    </div>
  );
}
