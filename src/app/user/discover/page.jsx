"use client";

import { FaTrophy } from "react-icons/fa";
import { ChevronDown, AlarmClock, BadgeCheck, FileText } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useGet from "@/hooks/useGet";

const Flashcard = ({ imageSrc, title, tags, description, cards, time, id }) => {
  return (
    <Link href={`/flashcard/${id}`} className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 w-[inherit] md:w-[inherit] lg:w-[350px] relative cursor-pointer">
      <div className="relative h-45 w-full">
       {imageSrc ? (
                 <Image
                   src={"/auth-activuty.png"}
                   alt="image"
                   height={200}
                   width={240}
                   className="object-cover h-[inherit] w-full rounded-2xl"
                 />
               ) : (
                 <div className="bg-gray-300 h-full w-full rounded animate-pulse"></div>
               )}
      </div>
      <div>
        <div className="flex items-center space-x-2 mt-4">
          <BadgeCheck size={18} color="#7240FD" />
          <span className="text-[#7240FD]"> Admin Verified</span>
        </div>
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
        <div className="flex space-x-2 my-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 border text-sm rounded-sm">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <span className="flex">
            <FileText size={18} />
            &nbsp;&nbsp;{cards} cards
          </span>
          <span className="flex">
            <AlarmClock size={18} />
            &nbsp;{time} min
          </span>
        </div>
      </div>
    </Link>
  );
};

const FlashcardSet = ({flashCards}) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Flashcards</h2>
        <Link
          href={`AllFlashCards`}
          className="text-[#7240FD] cursor-pointer hover:underline"
        >
          See All
        </Link>
      </div>
      <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-4 mt-4 overflow-x-auto overflow-y-hidden">
        {flashCards.slice(0,2).map((flashcard, index)=>(
        <Flashcard
        key={index}
          imageSrc={flashcard.imageUrl}
          title="Musculoskeletal Physiology"
          tags={["Muscle", "Cardiovascular", "Ribs"]}
          description="Exercise Therapy is a treatment method that uses physical exercise to address various medical conditions."
          cards="120"
          time="20"
          id = {flashcard._id}
        />
        ))}
      </div>
    </div>
  );
};

const QuizCard2 = ({
  imageSrc,
  title,
  tags,
  description,
  questions,
  time,
  id,
}) => {
  return (
    <>
      <Link
        href={`/quiz/${id}`}
        className="flex gap-3 items-center justify-between bg-white rounded-lg border overflow-hidden  p-4 h-[fit-content] w-full hover:bg-[#fcf9fe] duration-200"
      >
        <div className="h-[150px] w-[200px]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="image"
              height={200}
              width={240}
              className="object-cover h-full w-full rounded-2xl"
            />
          ) : (
            <div className="bg-gray-300 h-full w-full rounded animate-pulse"></div>
          )}
        </div>

        <div className="flex flex-col justify-between mt-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex space-x-2 my-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white border text-sm rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <div className="flex items-center mt-2 text-gray-500 text-sm">
            <span>{questions} questions</span>
            <span className="flex ml-4 text-sm">
              <AlarmClock size={18} />
              &nbsp; {time} min
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

const SavedQuiz = () => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Saved Quiz</h2>
        <Link
          href={`AllQuizs`}
          className="text-[#7240FD] cursor-pointer hover:underline"
        >
          See All
        </Link>
      </div>
      <div className=" flex flex-col gap-4 mt-4 overflow-x-auto overflow-y-hidden">
        <QuizCard2
          imageSrc={"/lungsfull.png"}
          title="Exercise Therapy"
          tags={["Muscle", "Cardiovascular", "Ribs"]}
          description="This quiz will test your knowledge of different types of exercise therapy, its benefits, and its application methods."
          questions="140"
          time="20"
        />
        <QuizCard2
          imageSrc={"/lungsfull.png"}
          title="Exercise Therapy"
          tags={["Muscle", "Cardiovascular", "Ribs"]}
          description="This quiz will test your knowledge of different types of exercise therapy, its benefits, and its application methods."
          questions="140"
          time="20"
        />
      </div>
    </div>
  );
};

const SuggestedQuizBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-8 flex items-center justify-between mt-4">
      <div className="w-[100%] md:w-[45%] lg:w-[50%]">
        <h2 className="text-xl text-white font-bold mb-2">Suggested Quiz</h2>
        <p className="text-white">
          We offer a personalized selection of quizzes based on your previous
          activities and preferences. Dive in and challenge yourself with new
          and exciting topics.
        </p>
        <button className="mt-2 bg-white text-purple-700 font-semibold py-2 px-4 rounded-md hover:bg-purple-200 transition duration-300">
          Explore
        </button>
      </div>
      <div className="hidden md:block">
        <img src={"/bird-flying.png"} alt="Penguin" width={150} height={150} />
      </div>
    </div>
  );
};

const QuizCard = () => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 w-[inherit] md:w-[inherit] lg:w-[350px] relative cursor-pointer">
      {/* <div className='absolute z-100 top-3 left-3 text-white px-2 py-1 bg-black rounded-md'>Quiz</div> */}
      <div className="relative h-45 w-full">
        <img src={"/lungsfull.png"} alt="Lungs" className="w-100 h-[inherit]" />
      </div>
      <h5 className="text-gray-400 mt-4 text-md font-semibold">
        Quize 20 lefts
      </h5>
      <h3 className="text-xl font-bold text-gray-800 mt-1">
        Anatomy Upper Quadrant
      </h3>
      <p className="text-sm text-gray-600 mt-4">
        A comprehensive course on the anatomy of the upper quadrant, focusing on
        detailed structures and functions.
      </p>
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="h-2 w-[63%] mr-3 bg-[#E2E8F0] rounded-lg">
          <div className="h-2 w-10 bg-[#1ED28F] rounded-lg"></div>
        </div>
        <span className="text-sm font-semibold">48% completed</span>
      </div>
    </div>
  );
};

const SignalActivity = () => {
  const data = {
    M: [0, 0, 1, 2, 1, 3, 2, 1, 3],
    T: [0, 0, 1, 2, 1, 3, 2, 1, 3],
    W: [0, 0, 1, 2, 1, 3, 2, 1, 3],
    Th: [0, 0, 1, 2, 1, 3, 2, 1, 3],
    F: [0, 0, 1, 2, 1, 3, 2, 1, 3],
    Sa: [0, 0, 1, 2, 1, 3, 2, 1, 3],
    Su: [0, 0, 1, 2, 1, 3, 2, 1, 3],
  };

  const getColor = (color) => {
    switch (color) {
      case 0:
        return "bg-[#E2E8F0]";
      case 1:
        return "bg-[#0CA36B] opacity-10";
      case 2:
        return "bg-[#0CA36B] opacity-20";
      case 3:
        return "bg-[#0CA36B] opacity-50";
      case 4:
        return "bg-[#0CA36B] opacity-100";
    }
  };

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg border mt-4 w-[inherit] md:w-[inherit] lg:w-[300px]">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">Your Activity</h1>
        <div className="flex space-x-2 text-gray-600 border border-[#E3E8F1] px-2 py-1 rounded-lg cursor-pointer">
          <span className="text-xs">Last 3 Months</span>
          <ChevronDown size={15} />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        {Object.entries(data).map(([key, value], index) => (
          <div className="flex flex-row justify-between" key={index}>
            <span className="text-sm text-[#8996A9] font-semibold">{key}</span>
            <div className="flex gap-2">
              {value.map((v, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-xs ${getColor(v)}`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ActivityTracker = () => {
  const data = {
    M: {
      quiz: 10,
      flashcard: 90,
    },
    T: {
      quiz: 30,
      flashcard: 70,
    },
    W: {
      quiz: 70,
      flashcard: 30,
    },
    Th: {
      quiz: 40,
      flashcard: 60,
    },
    F: {
      quiz: 50,
      flashcard: 50,
    },
    Sa: {
      quiz: 55,
      flashcard: 65,
    },
    Su: {
      quiz: 85,
      flashcard: 15,
    },
  };

  const [pillar, setPillar] = useState("");

  return (
    <div className="flex flex-col bg-white p-6 rounded-lg border mt-4 w-[inherit] md:w-[inherit] lg:w-[300px]">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">Your Activity</h1>
        <div className="flex space-x-2 text-gray-600 border border-[#E3E8F1] px-2 py-1 rounded-lg cursor-pointer">
          <span className="text-xs">Weekly</span>
          <ChevronDown size={15} />
        </div>
      </div>
      <div className="text-sm text-gray-400 mt-4">Today</div>
      <div className="text-2xl font-bold text-gray-900 mb-4 mt-1">14h 32m</div>
      <div className="grid grid-cols-7 gap-2">
        {Object.entries(data).map(([key, value], index) => (
          <div
            className="flex flex-col items-center gap-1"
            key={index}
            onMouseEnter={() => setPillar(key)}
            onMouseLeave={() => setPillar("")}
          >
            <div className="flex flex-col w-7 h-[150px] rounded-md bg-[#F4F3F3] relative">
              <div
                className={`flex flex-col shadow-lg w-[150px] p-3 rounded-md absolute bg-white -top-[110px] right-0 ${
                  pillar === key ? "" : "hidden"
                }`}
              >
                <span className="text-gray-400 text-sm">13 jul 2024</span>
                <div className="w-full flex justify-between mt-2">
                  <span className="text-gray-500 text-sm font-medium">
                    Flashcards
                  </span>
                  <span
                    className="text-gray-500 text-sm font-medium color-[#7240FD]"
                    style={{ color: "#7240FD" }}
                  >
                    30m 2s
                  </span>
                </div>
                <div className="w-full flex justify-between mt-2">
                  <span className="text-gray-500 text-sm font-medium">
                    Quiz
                  </span>
                  <span
                    className="text-gray-500 text-sm font-medium text-[mt-4 w-[inherit] md:w-[inherit] lg:w-[300px]#4CDBC8]"
                    style={{ color: "#4CDBC8" }}
                  >
                    14m 5s
                  </span>
                </div>
              </div>
              <div
                className={`flex border-b-3 border-white hover:bg-[#4CDBC8] rounded-t-lg`}
                style={{ height: `${(150 * value.quiz) / 100}%` }}
              ></div>
              <div
                className={`flex hover:bg-[#7240FD] rounded-b-lg`}
                style={{ height: `${(150 * value.flashcard) / 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-400 font-semibold">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileCard = () => {
  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-lg border border-[#E2E8F0] p-6 w-[inherit] md:w-[inherit] lg:w-[300px]">
      <img
        src="/avatar.png"
        alt="Profile"
        className="w-30 h-30 rounded-full border-4"
      />
      <h2 className="text-lg font-semibold mt-4 text-[#232B2B]">Sarthak</h2>
      <p className="text-xs sm:text-sm  text-[#687494] mt-1">
        Joined 2 years ago
      </p>
      <div className="flex w-full bg-[#F6F9FC] rounded-lg py-3 mt-4">
        <div className="flex flex-col justify-center items-center w-1/2">
          <span className="font-semibold text-md sm:text-lg">8</span>
          <div className="flex space-x-1 sm:space-x-2 mt-1">
            <FaTrophy className="text-yellow-500" size={16} />
            <p className="text-xs sm:text-sm text-gray-500">Rank</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-1/2 border-l">
          <span className="font-semibold text-md sm:text-lg">1,627</span>
          <div className="flex space-x-1 sm:space-x-2 mt-1">
            <FaTrophy className="text-yellow-500" size={16} />
            <p className="text-xs sm:text-sm text-gray-500">Points</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Discover() {
  const [flashCards, setFlashCards] = useState([]);
  const fetchFlashCardsData = async () => {
    const { data, error, status } = await useGet(
      `/flashcards/getAllFlashcards`
    );
    console.log(data);
    if (status == 200) {
      setFlashCards(data);
    }
  };
  useEffect(() => {
    fetchFlashCardsData();
  }, []);
  return (
    <div className="flex justify-between w-[100%]">
      <div className="flex flex-col w-[100%] lg:w-[60%] md:w-[100%]">
        <span className="text-black font-bold text-xl w-[100%]">
          Continue Learning
        </span>
        <div className="flex flex-col lg:flex-row md:flex-row gap-4 mt-4 overflow-x-auto overflow-y-hidden w-[100%]">
          <QuizCard />
          <QuizCard />
        </div>
        <SuggestedQuizBanner />
        <SavedQuiz />
        <FlashcardSet flashCards={flashCards}/>
      </div>
      <div className="hidden flex-col items-end w-[40%] lg:flex p-2 pt-0">
        <ProfileCard />
        <ActivityTracker />
        <SignalActivity />
      </div>
    </div>
  );
}
