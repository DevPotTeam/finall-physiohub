"use client";
import Image from "next/image.js";
import { Button } from "@/components/ui/button.jsx";
import {
  Trash2,
  Edit,
  MessageSquareText,
  Clock,
  BadgeCheck,
} from "lucide-react";
import UserQuizHeader from "@/components/user/quiz/UserQuizHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import useGet from "@/hooks/useGet";
import { FaQuestion } from "react-icons/fa";
import { Input } from "@/components/ui/input";

import usePost from "@/hooks/usePost";
import { useRouter } from "next/navigation";

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

const QuizCard = ({ imageSrc, title, questions, cards, time, id }) => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const hanleQuizJoin = async () => {
    setLoading(true);
    const { data, error, status } = await usePost(`/quizzes/join/${id}`);
    if (status == 201) {
      setLoading(false);
      router.push(`/quiz/${id}`);
    }
    if (error) {
      setError(error);
      showToast(error, "error")
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 max-w-[350px] relative ">
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
        <div className="flex items-center space-x-2 mt-4"></div>
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
        <p className="text-sm text-gray-600">
          Questions <span className="font-semibold">{questions}</span>
        </p>
        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <button
            className="border border-purple-600 w-full text-purple-600 rounded-sm py-1 flex items-center justify-center font-semibold"
            onClick={hanleQuizJoin}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
            ) : (
              "Join Quiz"
            )}
          </button>
        </div>
      </div>
      {notification && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
              notification.type === "error" ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {notification.message}
            <button onClick={() => setNotification(null)} className="ml-4 text-xl">
              ×
            </button>
          </div>
        )}
    </div>
  );
};

export default function Quizs() {
  
  const [articles, setArticles] = useState([]);
  const fetchQuizs = async () => {
    const { data, error, status } = await useGet(`/quizzes`);
    setArticles(data);
  };
  useEffect(() => {
    fetchQuizs();
  }, []);
  return (
    <>
      <div className="mt-4 w-full mx-auto md:max-w-[80%] max-w-[95%]">
        <div className="flex flex-col">
          <h6 className="font-semibold text-3xl">All Quiz</h6>
          <p className="my-2">Checkout our quiz, and test your skills.</p>
          <Input className="max-w-96" placeholder="Search" />
          <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 mt-4 ">
            {articles?.map((quiz) => (
              <QuizCard
                key={quiz._id}
                imageSrc={"/auth-activity.png"}
                title={quiz.title}
                questions={quiz.questions.length}
                id={quiz._id}
              />
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
}
