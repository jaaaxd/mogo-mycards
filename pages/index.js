import { useState, useEffect, createContext } from "react";
import cardsData from "@/data/cardsData";
import StarCheckbox from "@/components/ui/StarCheckbox";
import { Toaster, toast } from "alert";
import Info from "@/components/ui/Info";
import CardAlbums from "@/components/CardAlbums";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Board } from "@/components/Board";
import read from "@/public/icons/read-me3.svg";

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
      .map((card) => `✅ ${card.name}`)
      .join("\n");
    const cardsInStatus3 = cards
      .filter((card) => card.status === 3)
      .map((card) => `• ${card.name}`)
      .join("\n");

    setTextareaContent(
      `LF Trade 1:1\n\nWhat I have ⭐️\n${cardsInStatus2}\n\nWhat I need ⭐️\n${cardsInStatus3} \n\nDM ME FOR TRADE!✨`
    );
  }, [cards]);

  const handleCardClick = (index) => {
    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, status: (card.status % 3) + 1 } : card
      )
    );
  };

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
        handleCardClick,
        resetSelections,
        copyToClipboard,
        textareaContent,
        setTextareaContent,
      }}
    >
      <Toaster position="top-right" theme="dark" />
      <div className="h-screen w-screen max-h-screen flex max-sm:flex-col bg-[url('/bg.png')] bg-repeat">
        <button className="absolute top-8 left-7 w-6 h-6 rounded-full text-[#ccbfa7] text-sm bg-[#ebe5cdb1] font-textarea font-extrabold">
          i
        </button>
        <button className="absolute top-8 right-7 w-6 h-6 rounded-full">
          <Image src={read} />
        </button>
        <div className="sm:p-6 sm:pb-10 sm:mx-auto flex flex-col sm:gap-2 flex-grow">
          {/* <Info /> */}
          <div className="max-sm:hidden w-full flex justify-center">
            <Image src={logo} alt="logo" width={230} />
          </div>

          {/* <p className="text-lg">
            We&apos;ve made it super easy to trade your cards on Discord or any
            other community. Use our text preset to make your message
            searchable!
          </p>
          <p>
            Just click on the card you need and the card you have duplicated
            (it&apos;s set to neutral by default).
          </p>
          <p className="py-4">* Available for 4-5 star cards!</p> */}

          <main className="flex max-lg:flex-col-reverse sm:gap-6 gap-[10px] w-full flex-grow-1 flex-grow">
            <div className="lg:w-1/2 w-full lg:pr-4 flex-grow flex flex-col">
              <div className="filter-bar w-full flex items-center justify-between sm:gap-3 gap-2 mb-[10px] self-center max-sm:px-3">
                <div className="flex gap-2">
                <StarCheckbox
                  text="4-star"
                  value={4}
                  onChange={handleCheckboxChange}
                />
                <StarCheckbox
                  text="5-star"
                  value={5}
                  onChange={handleCheckboxChange}
                />
                </div>

                <label className="h-7 bg-white border-2 border-gold-500 sm:px-4 px-2 py-1 rounded-full max-sm:text-sm flex items-center justify-center">
                  <input
                    type="text"
                    className="w-full text-sm placeholder:text-gray-200 outline-none mx-1"
                    placeholder="Search"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="#a88d35"
                    className="h-4 w-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>
              <CardAlbums />
            </div>
            <div className="lg:w-1/2 lg:pl-4 max-lg:flex max-lg:gap-3 max-sm:flex-col-reverse max-sm:gap-6">
              <Board />
            </div>
          </main>
        </div>
      </div>
    </HomeContext.Provider>
  );
}
