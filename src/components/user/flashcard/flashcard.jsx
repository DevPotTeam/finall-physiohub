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

function Flashcard({ flashCardData, length, currentCard }) {
  const [showHint, setShowHint] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [questionFormat, setQuestionFormat] = useState("term");
  const [studyOptions, setStudyOptions] = useState({
    starredOnly: false,
    shuffleTerms: false,
  });

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", { questionFormat, studyOptions });
    setIsOpen(false);
  };
  const handleCopyUrl = () => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Copy to clipboard
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        setIsCopied(true);
        // Reset after 2 seconds
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
        // Optional: Show error message
      });
  };
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
          <p className="text-sm text-gray-500 font-medium uppercase">
            Card {currentCard + 1} of {length}
          </p>
          <p className="text-sm text-gray-500 font-medium uppercase">
            Topic :{" "}
            <span className="text-gray-600 font-semibold ">
              {flashCardData?.subject}
            </span>
          </p>
        </div>

        <div
          className={`flashcard-container md:h-[350px] h-[300px] ${isFlipped ? "flipped" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front relative">
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <Volume2
                  className="w-5 h-5 text-black cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(flashCardData?.frontContent);
                  }}
                />
                <div
                  className="relative inline-block"
                  onMouseEnter={() => setShowHint(true)}
                  onMouseLeave={() => setShowHint(false)}
                >
                  <button className="flex items-center gap-1 text-sm bg-white/90 px-2 py-1 rounded-full border hover:shadow cursor-pointer">
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
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/90 p-2 rounded-lg z-10">
                <Star className="w-4 h-4 text-gray-400" />
              </div>
              <div className="bg-black-50 rounded-lg md:h-[350px] h-[280px]">
                {flashCardData?.frontImage ? (
                  <img 
                    src={flashCardData.frontImage} 
                    alt="Front content"
                    className="w-full h-full rounded-lg"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50">
                  <h1 className="absolute bottom-4 left-0 right-0 text-center sm:text-lg text-base font-semibold text-white px-4">
                    {flashCardData?.frontContent}
                  </h1>
                </div>
              </div>
              {!flashCardData?.frontImage && (
                <h1 className="text-center sm:text-lg text-base font-semibold mt-4">
                  {flashCardData?.frontContent}
                </h1>
              )}
            </div>
            <div className="flashcard-back relative">
              <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                <Volume2
                  className="w-5 h-5 text-black cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(flashCardData?.backContent);
                  }}
                />
                <div
                  className="relative inline-block"
                  onMouseEnter={() => setShowHint(true)}
                  onMouseLeave={() => setShowHint(false)}
                >
                  <button className="flex items-center gap-1 text-sm bg-white/90 px-2 py-1 rounded-full border hover:shadow cursor-pointer">
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
              <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/90 p-2 rounded-lg z-10">
                <Star className="w-4 h-4 text-gray-400" />
              </div>
              <div className="bg-indigo-50 rounded-lg md:h-[350px] h-[280px]">
                {flashCardData?.backImage ? (
                  <img 
                    src={flashCardData.backImage} 
                    alt="Back content"
                    className="w-full h-full rounded-lg"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50">
                  <h1 className="absolute bottom-4 left-0 right-0 text-center sm:text-lg text-base font-semibold text-white px-4">
                    {flashCardData?.backContent}
                  </h1>
                </div>
              </div>
              {!flashCardData?.backImage && (
                <h1 className="text-center sm:text-lg text-base font-semibold mt-4">
                  {flashCardData?.backContent}
                </h1>
              )}
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
            {/* <Repeat className=" text-gray-500 cursor-pointer" />
            <Settings
              className=" text-gray-500 cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
            <Copy className=" text-gray-500 cursor-pointer" />
            {isOpen && (
              <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Flashcard Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-2">Question Format</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="questionFormat"
                            checked={questionFormat === "term"}
                            onChange={() => setQuestionFormat("term")}
                          />
                          Answer with Term
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="questionFormat"
                            checked={questionFormat === "definition"}
                            onChange={() => setQuestionFormat("definition")}
                          />
                          Answer with Definition
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Study Options</h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={studyOptions.starredOnly}
                            onChange={(e) =>
                              setStudyOptions({
                                ...studyOptions,
                                starredOnly: e.target.checked,
                              })
                            }
                          />
                          Study starred terms only
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={studyOptions.shuffleTerms}
                            onChange={(e) =>
                              setStudyOptions({
                                ...studyOptions,
                                shuffleTerms: e.target.checked,
                              })
                            }
                          />
                          Shuffle terms
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </div>
          <div className="flex items-center gap-2">
            <button className="text-sm font-medium text-gray-700 border px-3 py-1 rounded-lg hover:bg-gray-50">
              Spaced Repetition
            </button>
            <button
              onClick={handleCopyUrl}
              className="text-sm font-medium text-gray-700 border px-3 py-1 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4 text-gray-500 cursor-pointer" />
              {isCopied ? "URL Copied!" : "Share"}
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
          <span className="text-2xl font-semibold text-gray-900">
            {flashCardData.rating}
          </span>
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
