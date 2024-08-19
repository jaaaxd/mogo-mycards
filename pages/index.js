import { useState, useEffect, createContext } from "react";
import cardsData from "@/data/cardsData";
import StarCheckbox from "@/components/ui/StarCheckbox";
import { Toaster, toast } from "alert";
import Info from "@/components/ui/Info";
import CardAlbums from "@/components/CardAlbums";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Board } from "@/components/Board";

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
      <div className="sm:p-6 pb-10 pt-6 bg-[#FAF9F4] h-screen w-screen font-quicksand">
        <Info />
        <Toaster position="top-right" theme="dark" />
        <div className="container mx-auto flex flex-col gap-2">
          {/* <h1 className="font-topic font-bold text-3xl mb-6">
            Monopoly Go My Cards!
          </h1> */}
          <div className="w-full flex justify-center">
            <Image src={logo} alt="logo" width={200} />
          </div>

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

          <main className="flex max-lg:flex-col-reverse gap-6 w-full">
            <div className="lg:w-1/2 w-full lg:pr-4">
              <div className="filter-bar flex items-center gap-3 mb-4">
                <span>Filter:</span>
                <StarCheckbox value={4} onChange={handleCheckboxChange} />
                <StarCheckbox value={5} onChange={handleCheckboxChange} />
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
