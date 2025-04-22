"use client";
import { ArrowLeft, Search, Upload } from "lucide-react";



export default function QuizHeader({setShowInQuiz}) {
  return (
    <div className=" w-full mx-auto max-w-[80%] flex justify-between items-center p-4 rounded-lg">
      <div className="flex items-center gap-2">
        <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer" />
        <h2 className="text-lg font-semibold">Quiz</h2>
      </div>
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 text-gray-500 cursor-pointer" />
        <button onClick={()=>{setShowInQuiz("CreateQuiz")}} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
          + Create new
        </button>
      </div>
    </div>
  );
}
