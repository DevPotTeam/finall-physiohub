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
import useGet from "@/hooks/useGet";

const cards = [
  {
    front:
      "The musculoskeletal system weakens with age, too, increasing the risk of injuries and musculoskeletal diseases like _____________",
    back: "Osteoarthritis",
  },
  {
    front: "MVC stands for _____________",
    back: "Model view control/controller",
  },
];

const Flashcards = ({ card }) => {
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
          <h3 className="text-lg font-semibold mt-4">{card.title}</h3>
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

const CardList = ({allCards}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-4 space-y-4  ">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center cursor-pointer"
      >
        <h2 className="font-semibold text-gray-800 text-lg">View All Card</h2>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="space-y-4 mt-4">
          {allCards.map((card, index) => (
            <FlashCards card={card} key={index}/>
          ))}
        </div>
      )}
    </div>
  );
};

const Flashcard = ({ params }) => {
  const { id } = React.use(params);
  const [allCards, setAllCards] = useState([])
  const [flashcards, setFlashCards] = useState({});
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [answer, setAnswer] = useState("")
  const [isAnswered, setIsAnswered] = useState(false);
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
  const handleSubmit = () => {
    setIsSubmited(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3 max-w-[60%] mx-auto my-5">

        <FlashCards
          flashCardData={flashcards}
          id={id}
          handleAnswerChange={handleAnswerChange}
        />
        {/* <CardList allCards={allCards}/> */}
        <div className="mt-10 flex justify-between z-50">
          <button
            onClick={() => setIsReportOpen(true)}
            className="text-gray-600 hover:underline sm:flex hidden items-center gap-2"
          >
            <Flag size={16} />
            Report
          </button>
          <div className="space-x-4 flex sm:justify-end justify-between md:w-auto w-full">
            <button
              className={`px-4 py-2 rounded-lg text-white bg-[#6C4CE6] cursor-pointer`}
              onClick={handleSubmit}
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
