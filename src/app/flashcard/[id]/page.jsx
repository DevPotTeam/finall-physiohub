"use client";
import React, { useEffect, useState } from "react";
import {
  Star,
  Volume2,
  ChevronUp,
  ChevronDown,
  Flag,
  ArrowLeft,
} from "lucide-react";
import ReportModal from "@/components/common/ReportModal";
import FlashCards from "@/components/user/flashcard/flashcard";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import run from "@/components/animations/data/Happy.json";
import cry from "@/components/animations/data/Cry.json";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import LottiePlayer from "@/components/animations/LottiePlayer";
import Link from "next/link";

// const cards = [
//   {
//     front:
//       "The musculoskeletal system weakens with age, too, increasing the risk of injuries and musculoskeletal diseases like _____________",
//     back: "Osteoarthritis",
//   },
//   {
//     front: "MVC stands for _____________",
//     back: "Model view control/controller",
//   },
// ];

// const Flashcards = ({ card }) => {
//     return (
//       <Link href={`/flashcard/${id}`} className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 w-[inherit] md:w-[inherit] lg:w-[350px] relative cursor-pointer">
//         <div className="relative h-45 w-full">
//          {imageSrc ? (
//                    <Image
//                      src={"/auth-activuty.png"}
//                      alt="image"
//                      height={200}
//                      width={240}
//                      className="object-cover h-[inherit] w-full rounded-2xl"
//                    />
//                  ) : (
//                    <div className="bg-gray-300 h-full w-full rounded animate-pulse"></div>
//                  )}
//         </div>
//         <div>
//           <div className="flex items-center space-x-2 mt-4">
//             <BadgeCheck size={18} color="#7240FD" />
//             <span className="text-[#7240FD]"> Admin Verified</span>
//           </div>
//           <h3 className="text-lg font-semibold mt-4">{card.title}</h3>
//           <div className="flex space-x-2 my-2">
//             {tags.map((tag) => (
//               <span key={tag} className="px-3 py-1 border text-sm rounded-sm">
//                 {tag}
//               </span>
//             ))}
//           </div>
//           <p className="text-sm text-gray-600">{description}</p>
//           <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
//             <span className="flex">
//               <FileText size={18} />
//               &nbsp;&nbsp;{cards} cards
//             </span>
//             <span className="flex">
//               <AlarmClock size={18} />
//               &nbsp;{time} min
//             </span>
//           </div>
//         </div>
//       </Link>
//     );
//   };

// const CardList = ({allCards}) => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-4  ">
//       {/* Header */}
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className="flex justify-between items-center cursor-pointer"
//       >
//         <h2 className="font-semibold text-gray-800 text-lg">View All Card</h2>
//         {isOpen ? <ChevronUp /> : <ChevronDown />}
//       </div>

//       {/* Collapsible Content */}
//       {isOpen && (
//         <div className="space-y-4 mt-4">
//           {allCards.map((card, index) => (
//             <FlashCards card={card} key={index}/>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

const Flashcard = ({ params }) => {
  const { id } = React.use(params);
  const [allCards, setAllCards] = useState([])
  const [flashcards, setFlashCards] = useState({});
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [answer, setAnswer] = useState("")
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isSubmited, setIsSubmited] = useState(true);

  const fetchFlashCard = async () => {
    const { data, error, status } = await useGet(
      `/flashcards/getFlashcardById/${id}`
    );
    if (status == 200) {
      setFlashCards(data);
      console.log(data)
    }
  };

  const fetchAllFlashCards = () =>{
      const {data, error, status} = useGet(``)
      if(status == 200){
          setAllCards(data)
      }
  }

useEffect(()=>{
    fetchFlashCard();
    fetchAllFlashCards();
},[])

const handleAnswerChange = (e) =>{
    setAnswer(e.target.value)
}
  const handleSubmit = async() => {
    setIsAnswered(true)
    const {data, error, status} = await usePost(`/flashcards/submit-answer/${id}`, {answer : answer})
    console.log(data)
    const {correct, correctAnswer, userAnswer} = data
    setIsCorrect(correct);
    setCorrectAnswer(correctAnswer);
    setUserAnswer(userAnswer);
    setIsSubmited(true);
  };

  return (
    <>

      <div className="flex flex-col gap-3 sm:max-w-[60%] max-w-[90%] mx-auto my-5">
      <Link
        href={"/user/dashboard"}
        className="px-2 py-1 bg-gray-100 flex items-center w-fit rounded-md"
      >
        <ArrowLeft className="text-gray-600" size={18} /> &nbsp; Go to Dashbaord
      </Link>
        <FlashCards
          flashCardData={flashcards}
          id={id}
          isCorrect={isCorrect}
          correctAnswer={correctAnswer}
          isAnswered={isAnswered}
          handleAnswerChange={handleAnswerChange}
        />
        {isAnswered && (
              <div
              className={`absolute z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 
                left-1/2 bottom-0 transform -translate-x-1/2 ${
                  isCorrect ? "bottom-[-10%]" : "bottom-[-10%]"
                }`}
              >
                <div className="mt-4 p-3 border rounded-lg bg-white shadow-md space-x-3 max-w-[300px]">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-white`}
                  >
                    {isCorrect ? (
                      <FaCircleCheck className="text-green-300 sm:size-10 size-5" />
                    ) : (
                      <RxCrossCircled className="text-red-500 sm:size-10 size-5" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-semibold sm:text-base text-sm">
                      {isCorrect
                        ? "Great job!"
                        : "Oops, that's not quite right!"}
                    </h3>
                    <p className="sm:text-sm text-xs text-gray-600">
                      {isCorrect
                        ? "You've answered correctly."
                        : "Don't worry, mistakes help you learn."}
                    </p>
                    <p className="sm:text-sm text-xs text-gray-600">
                      {isCorrect
                        ? " Keep up the good work"
                        : " Here's the correct answer and an explanation."}
                    </p>
                  </div>
                </div>
                {isCorrect ? (
                  <div className="sm:w-[100px] w-[80px] sm:h-[100px] h-[80px] justify-self-center">
                    <LottiePlayer
                      animationFile={run}
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : (
                  <div className="sm:w-[100px] w-[80px] sm:h-[100px] h-[80px]">
                    <LottiePlayer
                      animationFile={cry}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
              </div>
            )}
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
              className={`px-4 py-2 rounded-lg text-white ${isAnswered ? "bg-gray-400" :"bg-[#6C4CE6]"}  cursor-pointer`}
              onClick={handleSubmit}
              disabled={isAnswered}
            >
              Submit
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
