import { useState, useEffect, createContext } from "react";
import cardsData from "@/data/cardsData";
import { Toaster, toast } from "alert";
import Info from "@/components/ui/Info";
import CardAlbums from "@/components/CardAlbums";
import logo from "@/public/logo.png";
import Image from "next/image";
import Board from "@/components/Board";
import Filter from "@/components/Filter";
import InfoButtons from "@/components/InfoButtons";

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
      <div className="h-screen w-screen flex flex-col items-center bg-[url('/bg.png')] bg-repeat lg:py-5 lg:px-10 lg:pt-2">
        <Toaster position="top-right" theme="dark" />
        <InfoButtons />

        {/* <Info /> */}
        <header className="max-lg:hidden w-full h-[20%] max-h-[153px] flex justify-center">
          <Image src={logo} alt="logo" width={230} height={153} />
        </header>
        <main className="flex max-lg:flex-col-reverse xl:gap-6 lg:justify-between  gap-[10px] w-full lg:h-[80%] 2xl:h-[87%] lg:pt-3 max-w-[1200px]">
          <div className="lg:w-1/2 w-full lg:pr-4 h-full flex flex-col">
            <div className="lg:hidden sm:m-4 sm:mb-3 max-w-[578px] w-full flex self-center">
              <Filter />
            </div>
            <CardAlbums />
          </div>
          <div className="lg:w-1/2 w-full h-full lg:pl-4 max-lg:flex max-lg:gap-3 max-sm:gap-6">
            <Board />
          </div>
        </main>
      </div>
    </HomeContext.Provider>
  );
}
