"use client";
import { Input } from "@/components/ui/input";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";
import { Rating } from "@mui/material";
import { AlarmClock, BadgeCheck, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Flashcard = ({ imageSrc, title, description, rating, totalRating, id, verified, topicName }) => {
  const router = useRouter()
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const randomRating = Math.random() * (5 - 3) + 2; // Generates random number between 2 and 5

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleFlashCardJoin = async(topic) => {
    setLoading(true)
    const {data, error, status} = await usePost(`/flashcards/join/${id}`)
    if(status == 201){
      setLoading(false)
      router.push(`/flashcard/1`)
      localStorage.setItem("topic" , topic)
    }
    if(error){
      setLoading(false)
      showToast("Failed to Enroll in FlashCard. Try Again", "error")
    }
  }

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 sm:max-w-[320px] max-w-[300px] relative cursor-pointer">
      {/* Topic Badge */}
      {topicName && (
        <div className="absolute top-3 left-3 bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium">
          {topicName}
        </div>
      )}
      
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
        {verified && (
          <div className="flex items-center space-x-2 mt-4">
            <BadgeCheck size={18} color="#7240FD" />
            <span className="text-[#7240FD]"> Admin Verified</span>
          </div>
        )}
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-2">
          <Rating
            name="simple-controlled"
            value={randomRating}
            readOnly
          />
        </div>
        <p className="text-sm text-gray-600">Rating {Math.floor(randomRating * 10)}+</p>
      </div>
      <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
        <button 
          className="border border-purple-600 w-full text-purple-600 rounded-sm py-1 flex items-center justify-center font-semibold" 
          onClick={()=>{handleFlashCardJoin(topicName)}}
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
          ) : "View FlashCards"}
        </button>
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
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchFlashCardsData = async () => {
    try {
      setLoading(true);
      const { data, error, status } = await useGet(`/flashcards/grouped-by-topic`);
      if (status === 200) {
        setTopics(data || []);
        setFilteredTopics(data || []); // Initialize filtered topics
      }
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashCardsData();
  }, []);

  // Filter topics based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      setFilteredTopics(topics);
    } else {
      setIsSearching(true);
      const filtered = topics.filter(topic => {
        const topicName = topic.topic?.name?.toLowerCase() || '';
        const flashcardTitle = topic.flashcards[0]?.title?.toLowerCase() || '';
        const flashcardDesc = topic.flashcards[0]?.description?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        
        return (
          topicName.includes(search) || 
          flashcardTitle.includes(search) ||
          flashcardDesc.includes(search)
        );
      });
      setFilteredTopics(filtered);
    }
  }, [searchTerm, topics]);

  return (
    <div className="mt-4 w-full mx-auto md:max-w-[80%] max-w-[95%]">
      <div className="flex flex-col">
        <h6 className="font-semibold text-3xl">All Flashcards</h6>
        <p className="my-2">A perfect tool for quick revisions and reinforcing your learning, making complex information easy to remember.</p>
        <Input 
          className="max-w-96" 
          placeholder="Search by topic or flashcard"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {loading ? (
          <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 sm:max-w-[320px] max-w-[300px] relative">
                <div className="h-[180px] w-[100%] bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="mt-4">
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded mt-2 animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded mt-4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="w-full grid xl:grid-cols-3 sm:grid-cols-2 mt-4 gap-4">
              {(isSearching ? filteredTopics : topics).map((topicGroup) => {
                if (topicGroup.flashcards.length === 0) return null;
                
                const flashcard = topicGroup.flashcards[0];
                return (
                  <Flashcard  
                    key={flashcard._id}
                    imageSrc={flashcard.imageUrl || flashcard.frontImage || "/auth-activity.png"}
                    title={flashcard.title}
                    verified={flashcard.verifiedByAdmin}
                    description={flashcard.description}
                    rating={flashcard.rating}
                    totalRating={flashcard.ratingCount}
                    id={flashcard._id}
                    topicName={topicGroup.topic?.name}
                  />
                );
              })}
            </div>
            
            {isSearching && filteredTopics.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No flashcards found matching your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Flashcards;