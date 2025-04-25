"use client";
import React, { useEffect, useState } from "react";
import {
  Star,
  Volume2,
  WandSparkles,
  Repeat,
  Share2,
  Settings,
  Copy,
  Verified,
} from "lucide-react";
import { Rating } from "@mui/material";

function Flashcard({flashCardData, length, currentCard}) {
  const [showHint, setShowHint] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [flashCardData, currentCard]);

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };
  return (
    <>
      <div className=" bg-white rounded-xl shadow border border-gray-200 p-4 space-y-3">
        {/* Top Label */}
        <div className="flex items-center justify-baseline gap-5 w-full">
        <p className="text-sm text-gray-500 font-medium uppercase">Card {currentCard + 1} of {length}</p>
        <p className="text-sm text-gray-500 font-medium uppercase">
          Topic :{" "}
          <span className="text-gray-600 font-semibold ">
            {flashCardData?.subject}
          </span>
        </p>
        </div>

        <div
          className={`flashcard-container ${isFlipped ? "flipped" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front relative">
              {/* Your existing front content */}
              <div className="bg-indigo-50 rounded-lg p-6 min-h-[350px] ">
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-gray-500 cursor-pointer"  onClick={(e) => {
    e.stopPropagation(); // prevent flip
    speakText(flashCardData?.frontContent); // or backContent
  }}/>
                  <div
                    className="relative inline-block"
                    onMouseEnter={() => setShowHint(true)}
                    onMouseLeave={() => setShowHint(false)}
                  >
                    <button className="flex items-center gap-1 text-sm bg-white px-2 py-1 rounded-full border hover:shadow cursor-pointer">
                      <WandSparkles className="w-4 h-4 text-purple-600 " />
                      <span className="text-purple-600 font-medium">
                        Get a hint
                      </span>
                    </button>

                    {showHint && (
                      <div className="absolute top-full left-16 transform -translate-x-1/2 mt-2 px-3 py-2 bg-white text-gray-800 rounded-lg shadow-lg w-48 text-sm">
                        {flashCardData.hint}
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-white p-2 rounded-lg">
                  <Star className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <h1 className="text-center sm:text-lg text-base font-semibold">
                {flashCardData?.frontContent}
              </h1>
            </div>
            <div className="flashcard-back relative">
              {/* Back side content */}
              <div className="bg-indigo-50 rounded-lg p-6 min-h-[350px] ">
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-gray-500 cursor-pointer"  onClick={(e) => {
    e.stopPropagation(); // prevent flip
    speakText(flashCardData?.backContent); // or backContent
  }}/>
                  <div
                    className="relative inline-block"
                    onMouseEnter={() => setShowHint(true)}
                    onMouseLeave={() => setShowHint(false)}
                  >
                    <button className="flex items-center gap-1 text-sm bg-white px-2 py-1 rounded-full border hover:shadow cursor-pointer">
                      <WandSparkles className="w-4 h-4 text-purple-600 " />
                      <span className="text-purple-600 font-medium">
                        Get a hint
                      </span>
                    </button>

                    {showHint && (
                      <div className="absolute top-full left-16 transform -translate-x-1/2 mt-2 px-3 py-2 bg-white text-gray-800 rounded-lg shadow-lg w-48 text-sm">
                        {flashCardData.hint}
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-white p-2 rounded-lg">
                  <Star className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              <h1 className="text-center sm:text-lg text-base font-semibold">
                {flashCardData?.backContent}
              </h1>
            </div>
          </div>
        </div>

        {/* Flashcard Content Area */}

        {/* <div className="text-center my-5 py-2">
          <h1 className="sm:text-lg text-base font-semibold">
            {flashCardData.frontContent}
          </h1>
        </div> */}
        {/* Controls Below Text */}
        <div className="flex md:flex-row flex-col justify-between items-center gap-2 ">
          <div className="flex items-center gap-2">
            <Repeat className=" text-gray-500 cursor-pointer" />
            <Settings className=" text-gray-500 cursor-pointer" />
            <Copy className=" text-gray-500 cursor-pointer" />
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm font-medium text-gray-700 border px-3 py-1 rounded-lg hover:bg-gray-50">
              Spaced Repetition
            </button>
            <button className="text-sm font-medium text-gray-700 border px-3 py-1 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-gray-500 cursor-pointer" /> Share
            </button>
          </div>
        </div>

        {/* Confidence Level */}
      </div>

      {/* {confidence level} */}
      <div className=" bg-white rounded-xl shadow border border-gray-200 p-4 space-y-4 flex md:flex-row flex-col items-center justify-between">
          <p className="text-lg font-medium text-gray-700">Confidence Level</p>
          <div className="flex gap-3">
            {[
              { text: "Low", bg: "bg-[#FF4D4D]" },
              { text: "Medium", bg: "bg-[#FFBF1B]" },
              { text: "High", bg: "bg-[#4CDBC8]" },
            ].map((level, index) => (
              <button
                key={index}
                className={`px-4 py-1.5 rounded-lg border text-sm font-medium  ${
                  flashCardData?.confidenceLevel == level.text.toLowerCase()
                    ? `${level.bg} text-white`
                    : "bg-transparent text-black"
                }`}
              >
                {level.text}
              </button>
            ))}
          </div>
        </div>

        {/* {rating card} */}
        <div className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-4 flex md:flex-row flex-col items-center justify-between   ">
          {/* Left: Verified */}
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <Verified className="text-blue-500" />
            Verified by Admin
          </div>

          {/* Right: Rating */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900">{flashCardData.rating}</span>
            <div className="flex text-orange-400">
              <Rating
                name="simple-controlled"
                value={flashCardData.rating ?? 0}
                readOnly
              />
            </div>
            <span className="text-sm text-gray-500">
              {flashCardData?.ratingCount} Ratings
            </span>
            <span className="text-gray-400 text-sm ml-2">›</span>
          </div>
        </div>
    </>
  );
}

export default Flashcard;
