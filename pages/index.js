import { useState, useEffect } from "react";
import cardsData from "@/data/cardsData";
import StarCheckbox from "@/components/ui/StarCheckbox";
import Image from "next/image";

export default function Home() {
  const [textareaContent, setTextareaContent] = useState("");
  const [cards, setCards] = useState(
    cardsData.map((card) => ({ ...card, status: 1 }))
  );

  useEffect(() => {
    const cardsInStatus2 = cards
      .filter((card) => card.status === 2)
      .map((card) => card.name)
      .join("\n");
    const cardsInStatus3 = cards
      .filter((card) => card.status === 3)
      .map((card) => card.name)
      .join("\n");

    setTextareaContent(
      `What I have:\n${cardsInStatus2}\n\nWhat I want:\n${cardsInStatus3}`
    );
  }, [cards]);

  const handleClick = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, status: (card.status % 3) + 1 } : card
      )
    );
  };

  const fullTextContent = "LF 1:1\n\n" + textareaContent;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textareaContent)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  const resetSelections = () => {
    setCards(cardsData.map((card) => ({ ...card, status: 1 })));
    setTextareaContent("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-quicksand">
      <div className="container mx-auto flex flex-col">
        <h1 className="text-3xl font-bold mb-6 border">
          Monopoly Go My Cards!
        </h1>
        <p>
          We made an easy text preset for copying to trade on your discord
          server ot other community to make it be able to find your message when
          search.
        </p>
    
        <p>
          {" "}
          Just click on the card you want and the card you have duplicated (it
          set to nautual on default)
        </p>
        <p> Available for 4-5 stars card</p>
        {/* Left side: card images with checkboxes */}
        <main className="flex">
          <div className="w-1/2 pr-4">
            <div className="filter-bar flex items-center gap-3">
              <span> Filter:</span>
              <StarCheckbox label="⭐⭐⭐⭐" />{" "}
              <StarCheckbox label="⭐⭐⭐⭐⭐" />
            </div>
            <div id="card-select-container" className="grid grid-cols-3 gap-3">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`card-container flex flex-col w-fit items-center space-x-2 border-2 p-3 ${
                    card.status === 1
                      ? "border-green-500"
                      : card.status === 2
                      ? "border-red-500"
                      : "border-black"
                  }`}
                  onClick={() => handleClick(index)}
                >
                  <span>{card.name}</span>
                  <div className="card-image relative">
                    <img
                      src={card.img}
                      alt={card.name}
                      className={`w-fit h-fit object-cover mb-2 ${
                        card.status === 3 ? "grayscale" : ""
                      }`}
                    />

                    {card.status === 2 && (
                      <div className="absolute bottom-1 right-0 rounded-lg text-lg font-bold bg-white py-1 px-2">
                        +1
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right side: textarea for selected cards */}
          <div className="w-1/2 pl-4">
            <textarea
              id="selected-cards"
              className="w-full h-96 p-2 border border-gray-300 rounded mb-4"
              value={fullTextContent}
              readOnly
            ></textarea>
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={resetSelections}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
