import { useState, useEffect, createContext } from "react";
import cardsData from "@/data/cardsData";
import { Toaster, toast } from "alert";
import Info from "@/components/ui/Info";
import CardAlbums from "@/components/CardAlbums";
import logo from "@/public/logo.png";
import Image from "next/image";
import { Board } from "@/components/Board";
import readBold from "@/public/icons/read-me2.svg";
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
      <div className="h-screen w-screen max-h-screen flex flex-col items-center bg-[url('/bg.png')] bg-repeat lg:py-5 lg:px-10 lg:pt-2">
        <button className="absolute top-8 lg:top-8 sm:top-[58px] max-lg:left-[54px] lg:right-[64px] max-sm:left-[30px] w-6 h-6 rounded-full lg:text-white text-[#ccbfa7] text-sm bg-[#ebe5cdb1] lg:bg-[#105edc] transition-transform duration-100  lg:active:scale-95 lg:shadow-sm font-textarea font-extrabold">
          i
        </button>
        <button className="absolute lg:hidden top-8 sm:top-[58px] sm:right-[54px] right-[30px] w-6 h-6 rounded-full">
          <Image src={read} />
        </button>
        <button className="absolute max-lg:hidden top-[32px] right-8 w-[25px] h-[25px]  rounded-full active:scale-95 shadow-sm">
          <Image src={readBold}/>
        </button>

        {/* <Info /> */}
        <div className="max-lg:hidden w-full h-[20%] flex justify-center">
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

        <main className="flex max-lg:flex-col-reverse xl:gap-6 lg:justify-between  gap-[10px] w-full lg:h-[80%] lg:pt-3 max-w-[1200px]">
          <div className="lg:w-1/2 w-full lg:pr-4 h-full flex flex-col">
            <div className="lg:hidden sm:m-4 sm:mb-3 max-w-[697px] w-full flex self-center">
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
