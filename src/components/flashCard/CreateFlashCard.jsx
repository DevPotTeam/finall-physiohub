"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Image,
  PlusCircle,
  Trash2,
  Upload,
} from "lucide-react";
import { Select } from "@/components/ui/select.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textArea.jsx";
import { Button } from "@/components/ui/button.jsx";
import PublishFlashCardHeader from "@/components/flashCard/PublishFlashCardHeader";
import usePost from "@/hooks/usePost";

export default function CreateFlashCard() {
  const [cards, setCards] = useState([
    { id: 1, options: ["Front", "Back"], open: true },
  ]);
  const [error, setError] = useState("")

  const addQuestion = () => {
    setCards([
      ...cards,
      { id: cards.length + 1, options: ["Front", "Back"], open: false },
    ]);
  };

  const toggleQuestion = (index) => {
    setCards(cards.map((q, i) => (i === index ? { ...q, open: !q.open } : q)));
  };

  const removeQuestion = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleCreateFlashCard = async() =>{
    const {data, error, status} = await usePost(`/flashcards/create`)
    if(status == 201){
      setShowInCourse("Course")
    }
    if(error){
      console.log(error)
      setError(error)
    }
  }

  return (
    <>
      <PublishFlashCardHeader handleCreateFlashCard={handleCreateFlashCard}/>
      {error&&<p className="text-red-500 mb-3">{error}</p>}
      <div className=" p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%]">
        {/* Cover Image Upload */}
        <div className="mb-4 ">
          <label className="block text-gray-700">Title</label>
          <Input placeholder="Write question here" className="my-5" />
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Tags</label>
          <Select className="w-full">
            <option>Choose category</option>
          </Select>
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail</label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 cursor-pointer">
            <Upload className="w-6 h-6 mb-2 text-purple-600" />
            <p>Drag or drop image here</p>
            <p className="text-xs">
              Image should be horizontal, at least 1500 x 500 px
            </p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">File Parser</label>
          <div className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 cursor-pointer">
            <Upload className="w-6 h-6 mb-2 text-purple-600" />
            <p>Drag or drop image here</p>
            <p className="text-xs">
              Image should be horizontal, at least 1500 x 500 px
            </p>
          </div>
        </div>

        {/* Quiz and Card Topic Selection */}
        <div className="mb-4">
          <label className="block text-gray-700">Card Topic</label>
          <Select className="w-full">
            <option>Choose category</option>
          </Select>
        </div>

        {/* Questions Section */}
        <div className="mb-4 space-y-4">
          {cards.map((q, index) => (
            <div key={q.id} className="border p-4 rounded-lg mb-4">
              <div
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-3 rounded-lg"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-gray-700 font-medium">Card {q.id}</span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeQuestion(index);
                    }}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                  {q.open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
              {q.open && (
                <div className="mt-3">
                  <div className="w-full">
                    {q.options.map((option, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-2 first:border-t-0 p-2">
                        <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-4">
                            <Image className="text-purple-600 text-sm"/>
                          <span className="text-gray-500 text-sm mt-2">
                            img
                          </span>
                        </div>
                        <div className="w-full">
                          <label>{option}</label>
                          <Input
                            placeholder="Enter Title here"
                            className="my-5 w-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <label>Extras</label>
                  <Textarea placeholder="Enter Title here" />
                </div>
              )}
            </div>
          ))}
          <Button onClick={addQuestion} className="flex items-center gap-2">
            <PlusCircle size={16} /> Add Question
          </Button>
        </div>
      </div>
    </>
  );
}
