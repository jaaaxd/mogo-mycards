import { useState, useEffect, createContext } from "react";
import cardsData from "@/data/cardsData";
import { Toaster, toast } from "alert";
import Info from "@/components/ui/Info";
import CardAlbums from "@/components/CardAlbums";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Board } from "@/components/Board";
import read from "@/public/icons/read-me3.svg";
import Filter from "@/components/Filter";

export const HomeContext = createContext();

export default function Home() {
  const [cards, setCards] = useState(cardsData);
  const [textareaContent, setTextareaContent] = useState("");
  const [selectedStars, setSelectedStars] = useState([4, 5]);
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let filteredCards = cardsData.filter((card) =>
      selectedStars.includes(card.stars)
    );
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filteredCards = filteredCards.filter((card) =>
        card.name.toLowerCase().includes(lowerCaseQuery)
      );
    }
    setCards(filteredCards);
  }, [refresh, selectedStars, query]);

  //-- Change card status when click
  const handleCardClick = (index) => {
    cardsData[index].status = (cardsData[index].status % 3) + 1;
    setRefresh(!refresh);
  };

  //-- Star filter change
  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked) {
      setSelectedStars([...selectedStars, value]);
    } else {
      setSelectedStars(selectedStars.filter((v) => v !== value));
    }
  };

  //-- Set text --
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

  //-- Button funtions
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
    cardsData.map((card) => (card.status = 1));
    setRefresh(!refresh);
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
        handleCheckboxChange,
        setQuery,
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
              <Filter />
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
