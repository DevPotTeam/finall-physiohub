"use client";
import React, { useEffect, useState } from "react";
import { Flag, ArrowLeft, Verified } from "lucide-react";
import ReportModal from "@/components/common/ReportModal";
import FlashCards from "@/components/user/flashcard/flashcard";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import Link from "next/link";
import { Rating } from "@mui/material";


const Flashcard = ({ params }) => {
  const { id } = React.use(params);
  const [allCards, setAllCards] = useState([]);
  const [flashcards, setFlashCards] = useState([]);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [progressBar, setProcessBar] = useState(0)

  useEffect(()=>{
    setProcessBar(((currentCard + 1) / flashcards.length) * 100)
  },[currentCard, flashcards])

  const fetchFlashCard = async () => {
    const { data, error, status } = await useGet(
      `/flashcards/getAllFlashcards`
    );
    console.log(data);
    if (status == 200) {
      setFlashCards(data);
    }
  };

  const fetchAllFlashCards = () => {
    const { data, error, status } = useGet(``);
    if (status == 200) {
      setAllCards(data);
    }
  };

  useEffect(() => {
    fetchFlashCard();
    fetchAllFlashCards();
  }, []);

  const handleNext = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard((prev) => prev + 1);
      console.log("clicked");
    }
  };
  const handleBack = () => {
    if (currentCard > 0) {
      setCurrentCard((prev) => prev - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:max-w-[60%] max-w-[90%] mx-auto my-5">
        <Link
          href={"/user/flashcards"}
          className="px-2 py-1 bg-gray-100 flex items-center w-fit rounded-md"
        >
          <ArrowLeft className="text-gray-600" size={18} /> &nbsp; Go to
          Dashbaord
        </Link>
        <div className="w-full h-2 bg-gray-200 rounded-full mx-4">
          <div
            className={`h-full bg-[#6c4ce6] rounded-full transition-all duration-300 `}
            style={{
              width : `${progressBar}%`
            }}
          ></div>
        </div>
        <FlashCards
          flashCardData={{ ...flashcards[currentCard] }}
          length={flashcards.length}
          currentCard={currentCard}
        />

        {/* <CardList allCards={allCards}/> */}
        <div className="mt-10 flex justify-between z-50">
          <button
            onClick={() => setIsReportOpen(true)}
            className="text-gray-600 hover:underline flex items-center gap-2"
          >
            <Flag size={16} />
            Report
          </button>
          <div className="space-x-4 flex sm:justify-end justify-between md:w-auto w-full">
            <button
              className={`px-4 py-2 rounded-lg text-white bg-gray-400  cursor-pointer`}
              onClick={handleBack}
            >
              Previous Card
            </button>
            <button
              className={`px-4 py-2 rounded-lg text-white bg-[#6C4CE6] cursor-pointer`}
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        </div>
        <ReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
        />
      </div>
    </>
  );
};

export default Flashcard;
