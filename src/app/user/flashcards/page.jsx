"use client";
import { Input } from "@/components/ui/input";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import { Rating } from "@mui/material";
import { AlarmClock, BadgeCheck, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Flashcard = ({ imageSrc, title, description, rating, totalRating, id, verified }) => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFlashCardJoin = async() =>{
    console.log(id)
    setLoading(true)
    const {data, error, status} = await usePost(`/flashcards/join`,{courseId : id})
    if(status == 201){
      setLoading(false)
      router.push(`/course/${id}`)
    }
    if(error){
      setLoading(false)
      showToast("Failed to Enroll in FlashCard. Try Again", "error")
    }
  }

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 sm:max-w-[320px] max-w-[300px] relative cursor-pointer">
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
        {verified&&<div className="flex items-center space-x-2 mt-4">
          <BadgeCheck size={18} color="#7240FD" />
          <span className="text-[#7240FD]"> Admin Verified</span>
        </div>}
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-2">
          <Rating
            name="simple-controlled"
            value={rating}
            readOnly
          />
        </div>
        <p className="text-sm text-gray-600">Rating {totalRating}+</p>
      </div>
      <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <button className="border border-purple-600 w-full text-purple-600 rounded-sm py-1 flex items-center justify-center font-semibold" onClick={()=>{handleFlashCardJoin()}}>{loading?<div className="w-5 h-5 border-4 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div> : "View FlashCards"}</button>
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

function Flashcards() {
  const [flashCards, setFlashCards] = useState([]);
  const fetchFlashCardsData = async() => {
    const { data, error, status } = await useGet(`/flashcards/getAllFlashcards`);
    console.log(data)
    if (status == 200) {
      setFlashCards(data);
    }
};
useEffect(()=>{
    fetchFlashCardsData()
},[])
  return (
    <>
      <div className="mt-4 w-full mx-auto md:max-w-[80%] max-w-[95%] ">
        <div className="flex flex-col">
          <h6 className="font-semibold text-3xl">All Flashcards</h6>
          <p className="my-2">A perfect tool for quick revisions and reinforcing your learning, making complex information easy to remember.</p>
            <Input className="max-w-96"placeholder="Search"/>
          <div className="w-full grid xl:grid-cols-3 sm:grid-cols-2 mt-4">

          {...flashCards?.map((flashcard) => (
            <Flashcard  
            key={flashcard._id}
            imageSrc={"/auth-activity.png"}
            title={flashcard.title}
            verified={flashcard.verifiedByAdmin}
            description={flashcard.description}
            rating={flashcard.rating}
            totalRating={flashcard.ratingCount}
            id={flashcard._id}
            />
          ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Flashcards;
