"use client";
import Image from "next/image.js";
import { Button } from "@/components/ui/button.jsx";
import { Trash2, Edit, MessageSquareText, Clock, BadgeCheck } from "lucide-react";
import UserQuizHeader from "@/components/user/quiz/UserQuizHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import useGet from "@/hooks/useGet";
import { FaQuestion } from "react-icons/fa";
import { Input } from "@/components/ui/input";

// const articles = [
//   {
//     category: "Geriatric",
//     title: "Biomechanics",
//     questions: "25 Questions",
//     time: "20 min",
//   },
//   {
//     category: "Geriatric",
//     title: "Medicine",
//     questions: "25 Questions",
//     time: "20 min",
//   },
// ];

const QuizCard = ({ imageSrc, title, tags, description, cards, time, id }) => {
  return (
    <Link href={`/quiz/${id}`} className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 max-w-[350px] relative cursor-pointer">
      <div className="h-[180px] w-[100%]">
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
          {/* <span className="flex">
            <FileText size={18} />
            &nbsp;&nbsp;{cards} cards
          </span> */}
          {/* <span className="flex">
            <AlarmClock size={18} />
            &nbsp;{time} min
          </span> */}
        </div>
      </div>
    </Link>
  );
};

export default function Quizs() {
    const [articles, setArticles] = useState([])
  const fetchQuizs = async () => {
    const { data, error, status } = await useGet(`/quizzes`);
    console.log(data);
    setArticles(data)
  };
  useEffect(() => {
    fetchQuizs();
  }, []);
  return (
    <>
      <div className="mt-4 w-full mx-auto max-w-[80%] ">
        <div className="flex flex-col">
          <h6 className="font-semibold text-3xl">All Quiz</h6>
          <p className="my-2">Checkout our quiz, and test your skills.</p>
            <Input className="max-w-96"placeholder="Search"/>
          <div className="flex flex-row gap-4 mt-4 overflow-x-scroll overflow-y-hidden">

          {articles?.map((flashcard) => (
            <QuizCard
            key={flashcard._id}
            imageSrc={"/auth-activity.png"}
            title="Musculoskeletal Physiology"
            tags={["Muscle", "Cardiovascular", "Ribs"]}
            description="Exercise Therapy is a treatment method that uses physical exercise to address various medical conditions."
            cards="120"
            time="20"
            id={flashcard._id}
            />
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
