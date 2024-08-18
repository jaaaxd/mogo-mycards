import { useState, useEffect, createContext } from "react";
import cardsData from "@/data/cardsData";
import StarCheckbox from "@/components/ui/StarCheckbox";
import { Toaster, toast } from "alert";
import Info from "@/components/ui/Info";
import CardAlbums from "@/components/CardAlbums";

export const HomeContext = createContext();

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
      .map((card) => `✅ ${card.name}`) // Add checkbox emoji
      .join("\n");
    const cardsInStatus3 = cards
      .filter((card) => card.status === 3)
      .map((card) => `• ${card.name}`) // Add related emoji
      .join("\n");

    setTextareaContent(
      `What I have ⭐️\n${cardsInStatus2}\n\nWhat I need ⭐️\n${cardsInStatus3}`
    );
  }, [cards]);

  const handleCardClick = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, status: (card.status % 3) + 1 } : card
      )
    );
  };

  const fullTextContent =
    "LF Trade 1:1\n\n" + textareaContent + "\n\nDM ME FOR TRADE!✨";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(textareaContent)
      .then(() => {
        toast.success("Copied to clipboard!");
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
    <HomeContext.Provider
      value={{
        cards,
        handleCardClick
      }}
    >
      <div className="p-6 bg-[#FAF9F4] min-h-screen font-quicksand">
        <Info />
        <div className="container mx-auto flex flex-col gap-2">
          <h1 className="font-topic font-bold text-3xl mb-6">
            Monopoly Go My Cards!
          </h1>
          <p className="text-lg">
            We&apos;ve made it super easy to trade your cards on Discord or any
            other community. Use our text preset to make your message
            searchable!
          </p>
          <p>
            Just click on the card you need and the card you have duplicated
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
              <CardAlbums />
            </div>
            <div className="w-1/2 pl-4">
              <textarea
                id="selected-cards"
                className="font-textarea w-full h-96 p-2 border border-gray-300 rounded mb-4"
                value={fullTextContent}
                readOnly
              ></textarea>
              <Toaster position="top-right" theme="dark" />
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
    </HomeContext.Provider>
  );
}
