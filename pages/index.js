import { useState } from "react";
import cards from "@/data/cardsData";
import StarCheckbox from "@/components/ui/StarCheckbox";

export default function Home() {
  const [selectedCards, setSelectedCards] = useState({});
  const [textareaContent, setTextareaContent] = useState("");

  const handleCheckboxChange = (card, isChecked) => {
    setSelectedCards((prevState) => ({
      ...prevState,
      [card]: isChecked ? card : undefined,
    }));
    setTextareaContent(
      getSelectedCardsText({
        ...selectedCards,
        [card]: isChecked ? card : undefined,
      })
    );
  };

  const getSelectedCardsText = (cardsState = selectedCards) => {
    return Object.values(cardsState)
      .filter((card) => card)
      .join("\n");
  };

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
    setSelectedCards({});
    setTextareaContent("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-quicksand">
      <div className="container mx-auto flex">
        {/* Left side: card images with checkboxes */}
        <div className="w-1/2 pr-4">
          <h1 className="text-3xl font-bold mb-6 border">
            Monopoly Go Current 4 & 5 * Card Collection
          </h1>
          <div className="filter-bar flex items-center gap-3">
            <span> Cards:</span>
            <StarCheckbox label="⭐⭐⭐⭐" /> <StarCheckbox label="⭐⭐⭐⭐⭐" />
          </div>
          <div id="card-select-container" className="grid grid-cols-3 g">
            {cards.map((card) => (
              <div key={card.name} className="flex flex-col items-center">
                <label className="flex flex-col items-center space-x-2 border border-black p-3">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={!!selectedCards[card.name]}
                    onChange={(e) =>
                      handleCheckboxChange(card.name, e.target.checked)
                    }
                  />
                  <span>{card.name}</span>
                  <img
                    src={card.img}
                    alt={card.name}
                    className="w-fit h-fit object-cover mb-2"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Right side: textarea for selected cards */}
        <div className="w-1/2 pl-4">
          <textarea
            id="selected-cards"
            className="w-full h-96 p-2 border border-gray-300 rounded mb-4"
            value={textareaContent}
            onChange={(e) => setTextareaContent(e.target.value)}
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
      </div>
    </div>
  );
}
