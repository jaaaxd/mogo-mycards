import cardsData from "@/data/cardsData";
import { HomeContext } from "@/pages";
import { useContext } from "react";
import Filter from "./Filter";

export default function CardAlbums() {
  const { cards, handleCardClick } = useContext(HomeContext);

  return (
    <div className="white-frame lg:p-5 rounded-2xl bg-white h-full">
      <div className="inner-bg bg-gold-200 rounded-xl h-full flex flex-col">
        <div className="max-lg:hidden px-4 py-3">
          <Filter />
        </div>
        <div
          id="card-select-container"
          className=" bg-gold-300 p-2 sm:h-full h-full fl max-sm:h-fit overflow-y-auto inner max-sm:border-t-2 max-sm:border-t-[#8dc9eb] flex justify-center"
        >
          <div className="grid grid-cols-3 max-lg:grid-cols-4 max-sm:grid-cols-3 ">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card-container flex flex-col w-full max-w-[180px] items-center justify-end space-x-2 sm:p-3 px-[7px] py-[2px]  $`}
                onClick={() => handleCardClick(index)}
              >
                <div className="card-image relative">
                  <img
                    src={card.img}
                    alt={card.name}
                    className={`w-full h-full object-cover mb-2 ${
                      card.status === 3 ? "grayscale" : ""
                    }`}
                  />

                  {card.status === 2 && (
                    <div className="absolute bottom-11 left-0 rounded-[2px] text-[22px]  bg-white pl-2 pr-3 max-h-[32px] text-gray-300 border-[2px] w-[60px] font-bold text-center border-gray-100 justify-center items-center flex">
                      +1
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
