"use client";
import Image from "next/image.js";
import { Button } from "@/components/ui/button.jsx";
import { Trash2, Edit, Sparkles, MessageSquareText, Clock, PlusCircle } from "lucide-react";
import FlashCardHeader from "@/components/flashCard/FlashCardHeader";
import useGet from "@/hooks/useGet";
import { useEffect, useState } from "react";
import useDelete from "@/hooks/useDelete";
import Link from "next/link";
import { Rating } from "@mui/material";
import { Select } from "@/components/ui/select.jsx";

export default function FlashCards({ setShowInFlashCard }) {
  const [flashCards, setFlashCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");

  const fetchTopics = async () => {
    try {
      const { data } = await useGet(`/main-topics/`);
      setTopics(data || []);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const fetchFlashCards = async () => {
    setLoading(true);
    try {
      const { data } = await useGet(`/flashcards/my-flashcards`);
      setFlashCards(data || []);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchFlashCards();
  }, []);

  const handleFlashCardDelete = async (id) => {
    const { data, error, status } = await useDelete(`/flashcards/delete/${id}`);
    if (status === 200) {
      fetchFlashCards();
    }
  };

  const filteredFlashCards = selectedTopic
    ? flashCards.filter(card => card.topic === selectedTopic)
    : flashCards;

  return (
    <>
      <FlashCardHeader setShowInFlashCard={setShowInFlashCard} />
      <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%]">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Filter by Topic</label>
          <Select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full md:w-[300px]"
          >
            <option value="">All Topics</option>
            {topics.map((topic) => (
              <option key={topic._id} value={topic._id}>
                {topic.name}
              </option>
            ))}
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredFlashCards.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Flashcards Found
            </h3>
            <p className="text-gray-500 mb-6">
              {selectedTopic 
                ? "No flashcards found for the selected topic. Try selecting a different topic or create new flashcards!"
                : "You haven't created any flashcards yet. Get started by creating your first one!"}
            </p>  
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            {filteredFlashCards.map((article, index) => (
              <div
                key={index}
                className="border-t pt-2 first:border-t-0 first:pt-0"
              >
                <div className="flex md:flex-row flex-col justify-between items-center">
                  <div className="flex md:flex-row flex-col items-center gap-5 w-full">
                    <div className="h-[180px] w-[230px]">
                      {article.imageUrl ? (
                        <Image
                          src={article?.imageUrl}
                          alt="image"
                          height={200}
                          width={240}
                          className="object-cover h-full w-full rounded-2xl"
                        />
                      ) : (
                        <div className="bg-gray-300 h-full w-full rounded animate-pulse"></div>
                      )}
                    </div>
                    <div className="md:w-[44%] w-full text-start">
                      <p className="text-sm text-blue-600 font-medium mb-1">
                        {article.subject}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                        {article.title}
                      </h3>
                      <p className="md:text-base text-sm">{article.description}</p>
                    </div>
                  </div>
                  <div className="flex md:flex-col flex-row items-center gap-2">
                    <div className="flex gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-300 text-gray-600 hover:bg-gray-100"
                        onClick={() => handleFlashCardDelete(article._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Link href={`/teacher/flashCard/update/${article._id}`}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-1">
                      <Rating
                        name="simple-controlled"
                        value={article.rating}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}