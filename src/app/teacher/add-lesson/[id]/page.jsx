"use client";
import React, { useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Image,
  PlusCircle,
  Trash2,
  Upload,
} from "lucide-react";
import { Select, SelectItem } from "@/components/ui/select.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textArea.jsx";
import { Switch } from "@/components/ui/switch.jsx";
import { Button } from "@/components/ui/button.jsx";
import PublishLessonHeader from "@/components/course/PublishLessonHeader";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/navigation";

export default function AddLessons({params}) {
  const { id } = React.use(params); 
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([
    { id: 1, type: "", title: "", url: "", open: true },
  ]);
  const [type, setType] = useState(""); // default to "true" (Free)
  const [formData, setFormData] = useState({
    lessonTitle: "",
    contents: cards,
  });
  const fileInputRef = useRef(null);
  const router = useRouter()
  const options = [
    {
      label: "Choose Type",
      value: "",
    },
    {
      label: "Video",
      value: "video",
    },
    {
      label: "Image",
      value: "image",
    },
    {
      label: "Article",
      value: "article",
    },
  ];

  const handleTypeSelect = (e) => {
    setType(e.target.value);
    console.log(e.target.value);
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardChange = (index, field, value) => {
    const updatedCards = [...cards];
    updatedCards[index][field] = value;
    setCards(updatedCards);
  };

  // const handleImageUpload = async (e, index) => {
  //   const file = e.target.files[0];
  //   const formImageData = new FormData();
  //   formImageData.append('file', file);
  
  //   const { data, error, status } = await usePost(
  //     `/courses/upload`,
  //     formImageData
  //   );
  //    if (data) {
  //     handleCardChange(index, "url", data);
  //   }
  // };

  const handleVideoUpload = async (e, index) => {
    setLoading(true)
    const file = e.target.files[0];
    const formImageData = new FormData();
    formImageData.append('file', file);
  
    const { data, error, status } = await usePost(
      `/courses/upload`,
      formImageData
    );
    
    if (data) {
      setLoading(false)
      handleCardChange(index, "url", data.data);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleUpload(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleLessonsAdd = async () => {
    const {data, error, status} = await usePost(`/courses/add-to-course/${id}`, formData)
    console.log(data)
    if(status == 200){
      router.push("/course")
    }
  };

  return (
    <>
      <PublishLessonHeader handleLessonsAdd={handleLessonsAdd} />
      <div className=" p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%]">
        {/*  Title */}
        <div className="mb-4 ">
          <label className="block text-gray-700 font-semibold">
            Lesson Title
          </label>
          <Input
            placeholder="Lesson title"
            className="my-5"
            name="lessonTitle"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 space-y-4">
          {cards.map((q, index) => (
            <div key={q.id} className="border p-4 rounded-lg mb-4">
              <div
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-3 rounded-lg"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-gray-700 font-medium">Lesson {q.id}</span>
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
                    <div className=" mb-2 first:border-t-0 p-2">
                      <div className="w-full">
                        <label>Title</label>
                        <Input
                          placeholder="Enter Title here"
                          className="my-5 w-full"
                          value={q.title}
                          onChange={(e) =>
                            handleCardChange(index, "title", e.target.value)
                          }
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">
                          Choose Type
                        </label>
                        <Select
                          className="w-full"
                          value={q.type}
                          onChange={(e) =>
                            handleCardChange(index, "type", e.target.value)
                          }
                        >
                          {options.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      {q.type == "video" && (
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold">
                            Video
                          </label>
                          {!formData.contents[index].url ? (
                            <div
                              className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 "
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                            >
                              {loading? <div className="w-12 h-12 border-4 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>:<label className="ud-btn btn-white text-center cursor-pointer">
                                <div className="icon mb5">
                                  <Upload className="w-6 h-6 mb-2 text-purple-600 justify-self-center " />
                                </div>
                                <h4 className="title fz17 mb1">
                                  Upload/Drag Videos
                                </h4>
                                Browse Files
                                <input
                                  ref={fileInputRef}
                                  id="fileInput"
                                  type="file"
                                  name="images"
                                  accept="video/*"
                                  multiple
                                  className="ud-btn btn-white"
                                  onChange={(e) => {
                                    handleVideoUpload(e, index);
                                  }}
                                  style={{ display: "none" }}
                                  required
                                />
                              </label>}
                            </div>
                          ) : (
                            <div className="max-h-[300px] min-w-[100px]">
                              <video
                                src={formData.contents[index].url}
                                height={300}
                                width={200}
                                alt="cover-image"
                                muted
                                autoPlay
                              />
                            </div>
                          )}
                        </div>
                      )}
                      {/* {q.type == "image" && (
                        <div className="mb-4">
                          <label className="block text-gray-700 font-semibold">
                            Image
                          </label>
                          {!formData.coverImage ? (
                            <div
                              className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 "
                              onDrop={handleDrop}
                              onDragOver={handleDragOver}
                            >
                              <label className="ud-btn btn-white text-center cursor-pointer">
                                <div className="icon mb5">
                                  <Upload className="w-6 h-6 mb-2 text-purple-600 justify-self-center " />
                                </div>
                                <h4 className="title fz17 mb1">
                                  Upload/Drag photos of Lesson
                                </h4>
                                <p className="text fz-10 mb10">
                                  Photos must be JPEG or PNG format and at least
                                  2048x768
                                </p>
                                Browse Files
                                <input
                                  ref={fileInputRef}
                                  id="fileInput"
                                  type="file"
                                  name="images"
                                  multiple
                                  className="ud-btn btn-white"
                                  onChange={(e) => {
                                    handleImageUpload(e, index);
                                  }}
                                  style={{ display: "none" }}
                                  required
                                />
                              </label>
                            </div>
                          ) : (
                            <div>
                              <Image
                                src={formData.coverImage}
                                height={400}
                                width={200}
                                alt="cover-image"
                              />
                            </div>
                          )}
                        </div>
                      )} */}
                    </div>
                  </div>
                  {q.type == "article" && (
                    <>
                      <label>Article Link</label>
                      <Textarea placeholder="Enter Title here" />
                    </>
                  )}
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
