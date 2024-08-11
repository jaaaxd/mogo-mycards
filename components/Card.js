import cardsData from "@/data/cardsData";
import { useState } from "react";
import need from "@/public/icons/icon-need.png";
import Image from "next/image";

export default function Card() {
  const [cards, setCards] = useState(
    cardsData.map((card) => ({ ...card, status: 1 }))
  );

  const handleClick = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, status: (card.status % 3) + 1 } : card
      )
    );
  };

  const cardsInStatus2 = cards.filter((card) => card.status === 2);
  const cardsInStatus3 = cards.filter((card) => card.status === 3);

  return (
    <div>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card-container flex flex-col w-fit items-center space-x-2 border-2 p-3 ${
            card.status === 1
              ? "border-black"
              : card.status === 2
              ? "border-green-400"
              : "border-red-500"
          }`}
          onClick={() => handleClick(index)}
        >
          <span>{card.name}</span>
          <div className="card-image relative">
            <img
              src={card.img}
              alt={card.name}
              className="w-fit h-fit object-cover mb-2"
            />

            {card.status === 2 && (
              <div className="absolute bottom-1 right-0 rounded-lg text-lg font-bold bg-white py-1 px-2">
                +1
              </div>
            )}
            {card.status === 3 && (
              <div className="absolute bottom-1 right-0 rounded-lg text-lg font-bold bg-white p-1 w-8 h-8">
                <Image src={need} alt="need" className="object-cover" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
