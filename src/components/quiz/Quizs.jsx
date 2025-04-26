"use client";
import Image from "next/image.js";
import { Button } from "@/components/ui/button.jsx";
import { Trash2, Edit, MessageSquareText, Clock } from "lucide-react";
import QuizHeader from "@/components/quiz/QuizHeader";
import { useEffect, useState } from "react";
import useGet from "@/hooks/useGet";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useDelete from "@/hooks/useDelete";
import axios from "axios";
const api_url = process.env.NEXT_PUBLIC_API_BASE_URL

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

export default function Quizs({ setShowInQuiz }) {
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  const [articles, setArticles] = useState([]);
  const fetchTeacherQuizs = async () => {
    const { data, error, status } = await useGet(`/quizzes/my-quizzes`);
    if (status == 200) {
      setArticles(data);
    }
  };
  useEffect(() => {
    fetchTeacherQuizs();
  }, []);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };


  const handleQuizDelete = async (id) => {
    try {
      const { data, error, status } = await useDelete(`/quizzes/${id}`);
      console.log(data)
      if(status == 200){
        showToast("Quiz Deleted Successfully", "success")
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      showToast("Failed to Delete Quiz", "error")
    }
   
  };
  return (
    <>
      <QuizHeader setShowInQuiz={setShowInQuiz} />
      <div className="md:p-6 sm:p-5 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%] ">
        <div className="mt-4 space-y-6">
          {articles?.map((article, index) => (
            <div
              key={index}
              className="border-t pt-4 first:border-t-0 first:pt-0 last:pb-5"
            >
              <div className="flex md:flex-row flex-col justify-between items-center ">
                <div className="flex sm:flex-row flex-col items-center gap-5 w-full">
                  <div className="h-[180px] max-w-[230px]">
                    <Image
                      src={"/auth-activity.png" || article.banner}
                      alt="image"
                      height={200}
                      width={240}
                      className="object-cover h-full w-full rounded-2xl"
                    />
                  </div>
                  <div className="md:w-[44%]  text-start">
                    {/* <p className="text-sm text-blue-600 font-medium mb-2">
                      {article.category}
                    </p> */}
                    <h3 className="text-lg md:text-base font-semibold text-gray-900 leading-relaxed">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 flex items-center">
                      <MessageSquareText size={14} />
                      &nbsp;{article.questions.length}&nbsp; Questions &nbsp;
                      {article.time}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    onClick={() => {
                      handleQuizDelete(article._id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Link href={`/teacher/quiz/update/${article._id}`}>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
    </>
  );
}
