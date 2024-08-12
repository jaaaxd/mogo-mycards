import { useState, useEffect } from "react";
import cardsData from "@/data/cardsData";
import StarCheckbox from "@/components/ui/StarCheckbox";

export default function Home() {
  const [textareaContent, setTextareaContent] = useState("");
  const [selectedStars, setSelectedStars] = useState([4, 5]);

  const filterCards = (cardsData, selectedStars) => {
    return cardsData.filter((card) => selectedStars.includes(card.stars));
  };

  const filteredCards = filterCards(cardsData, selectedStars);

  const [cards, setCards] = useState(
    filteredCards.map((card) => ({ ...card, status: 1 }))
  );

  useEffect(() => {
    setCards(filteredCards.map((card) => ({ ...card, status: 1 })));
  }, [selectedStars, cardsData]);

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
    setCards(filteredCards.map((card) => ({ ...card, status: 1 })));
    setTextareaContent("");
  };

  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      setSelectedStars([...selectedStars, value]);
    } else {
      setSelectedStars(selectedStars.filter((v) => v !== value));
    }
  };

  return (
    <div className="p-6 bg-[#FAF9F4] min-h-screen font-quicksand">
      <div className="container mx-auto flex flex-col gap-2">
        <h1 className="font-josefin-sans text-3xl mb-6">
          Monopoly Go My Cards!
        </h1>
        <p>
          We&apos;ve made it super easy to trade your cards on Discord or any
          other community. Use our text preset to make your message searchable!
        </p>
        <p>
          Just click on the card you want and the card you have duplicated
          (it&apos;s set to neutral by default).
        </p>
        <p className="py-4">* Available for 4-5 star cards!</p>

        <main className="flex">
          <div className="w-1/2 pr-4">
            <div className="filter-bar flex items-center gap-3 mb-4">
              <span>Filter:</span>
              <StarCheckbox
                label="⭐⭐⭐⭐"
                value={4}
                onChange={handleCheckboxChange}
              />
              <StarCheckbox
                label="⭐⭐⭐⭐⭐"
                value={5}
                onChange={handleCheckboxChange}
              />
            </div>
            <div id="card-select-container" className="grid grid-cols-3">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`card-container flex flex-col w-full items-center space-x-2 border-2 p-3 ${
                    card.status === 1
                      ? "border-gray"
                      : card.status === 2
                      ? "border-primary"
                      : "border-gray"
                  }`}
                  onClick={() => handleClick(index)}
                >
                  <span className="text-lg font-semibold">{card.name}</span>
                  <div className="card-image relative">
                    <img
                      src={card.img}
                      alt={card.name}
                      className={`w-full h-full object-cover mb-2 ${
                        card.status === 3 ? "grayscale" : ""
                      }`}
                    />

                    {card.status === 2 && (
                      <div className="absolute bottom-4 right-2 rounded-full text-lg  bg-white py-1 px-2 text-[#00aeff]">
                        +1
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <textarea
              id="selected-cards"
              className="font-textarea w-full h-96 p-2 border border-gray-300 rounded mb-4"
              value={fullTextContent}
              readOnly
            ></textarea>
            <button
              onClick={copyToClipboard}
              className="bg-primary text-white px-4 py-2 rounded mr-2"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={resetSelections}
              className="bg-gray text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
