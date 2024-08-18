import cardsData from "@/data/cardsData";
import { HomeContext } from "@/pages";
import { useContext } from "react";

export default function CardAlbums() {
  const { cards, handleCardClick } = useContext(HomeContext);

  return (
    <div
      id="card-select-container"
      className=" bg-gold-300 p-2 h-[570px] overflow-auto inner"
    >
      <div className="grid grid-cols-3 items-end">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card-container flex flex-col w-full items-center space-x-2 p-3 $`}
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
                <div className="absolute bottom-14 left-0 rounded-[2px] text-[28px]  bg-white px-3 max-h-[40px] text-gray-300 border-[2px] w-[70px] font-bold text-center border-gray-100 justify-center items-center flex">
                  +1
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
