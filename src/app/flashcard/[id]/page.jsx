"use client";
import React, { useEffect, useState } from "react";
import { Flag, ArrowLeft, Verified } from "lucide-react";
import ReportModal from "@/components/common/ReportModal";
import FlashCards from "@/components/user/flashcard/flashcard";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import Link from "next/link";
import { Rating } from "@mui/material";

const Flashcard = () => {
  const topic = localStorage.getItem("topic");
  const [allCards, setAllCards] = useState([]);
  const [flashcards, setFlashCards] = useState([]);
  const [filteredFlashcards, setFilteredFlashcards] = useState([]);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [progressBar, setProcessBar] = useState(0);
  const [topicName, setTopicName] = useState("");

  useEffect(() => {
    setProcessBar(((currentCard + 1) / filteredFlashcards.length) * 100);
  }, [currentCard, filteredFlashcards]);

  const fetchFlashCard = async () => {
    const { data, error, status } = await useGet(`/flashcards/grouped-by-topic`);
    if (status == 200) {
      setAllCards(data || []);
      
      // Filter flashcards by topic ID from params
      const topicGroup = data.find(group => group.topic?.name === topic);
      
      if (topicGroup) {
        setTopicName(topicGroup.topic?.name || "");
        setFilteredFlashcards(topicGroup.flashcards || []);
      } else {
        setFilteredFlashcards([]);
      }
    }
  };

  useEffect(() => {
    fetchFlashCard();
  }, [topic]); // Add id to dependency array to refetch when id changes

  const handleNext = () => {
    if (currentCard < filteredFlashcards.length - 1) {
      setCurrentCard((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentCard > 0) {
      setCurrentCard((prev) => prev - 1);
    }
  };

  if (filteredFlashcards.length === 0) {
    return (
      <div className="flex flex-col gap-3 sm:max-w-[60%] max-w-[90%] mx-auto my-5">
        <Link
          href={"/user/flashcards"}
          className="px-2 py-1 bg-gray-100 flex items-center w-fit rounded-md"
        >
          <ArrowLeft className="text-gray-600" size={18} /> &nbsp; Go to Dashboard
        </Link>
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold">
            {topicName ? `No flashcards found for ${topicName}` : "Topic not found"}
          </h3>
          <p className="text-gray-600 mt-2">
            {topicName ? "This topic doesn't have any flashcards yet." : "The requested topic doesn't exist."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3 sm:max-w-[60%] max-w-[90%] mx-auto my-5">
        <div className="flex justify-between items-center">
          <Link
            href={"/user/flashcards"}
            className="px-2 py-1 bg-gray-100 flex items-center w-fit rounded-md"
          >
            <ArrowLeft className="text-gray-600" size={18} /> &nbsp; Go to Dashboard
          </Link>
          
        </div>
        
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className={`h-full bg-[#6c4ce6] rounded-full transition-all duration-300`}
            style={{
              width: `${progressBar}%`
            }}
          ></div>
        </div>
        
        <FlashCards
          flashCardData={{ ...filteredFlashcards[currentCard] }}
          length={filteredFlashcards.length}
          currentCard={currentCard}
        />

        <div className="mt-10 flex justify-between z-50">
          <button
            onClick={() => setIsReportOpen(true)}
            className="text-gray-600 hover:underline flex items-center gap-2"
          >
            <Flag size={16} />
            Report
          </button>
          <div className="md:space-x-4 space-x-2 flex justify-end md:w-auto w-full">
            <button
              className={`md:px-4 px-2 md:text-base text-sm py-2 rounded-lg text-white bg-gray-400 ${currentCard === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handleBack}
              disabled={currentCard === 0}
            >
              Previous Card
            </button>
            <button
              className={`md:px-4 px-2 md:text-base text-sm py-2 rounded-lg text-white bg-[#6C4CE6] ${currentCard === filteredFlashcards.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handleNext}
              disabled={currentCard === filteredFlashcards.length - 1}
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