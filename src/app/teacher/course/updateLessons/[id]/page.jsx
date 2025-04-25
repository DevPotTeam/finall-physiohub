"use client";
import React, { useEffect, useRef, useState } from "react";
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
import UpdateLessonHeader from "@/components/course/UpdateLessonHeader"
import { useRouter } from "next/navigation";
import useImagePost from "@/hooks/useImagePost";
import useGet from "@/hooks/useGet";
import usePut from "@/hooks/usePut"


export default function AddLessons({params}) {
  const { id } = React.use(params); 
  const [cardsData, setCardsData] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState([]);
  const [type, setType] = useState(""); // default to "true" (Free)
  const [formData, setFormData] = useState([]);

  const fetch = async() =>{
    const {data, status} = await useGet(`/courses/get/${id}`)
    if(status == 200){
      setData(data.lessons)
    }
  }
  
  useEffect(()=>{
    fetch()
  },[])

  
  useEffect(() => {
    if (data && data.length > 0) {
        data.map((d) =>{

            const cardsWithOpen = d.contents.map(item => ({
              ...item,
              open: true, // default to true or false based on your UI preference
            }));
        
            setCards((prev) =>([...prev, ...cardsWithOpen]));
            setFormData((prev)=>([...prev,{
              lessonTitle: d.lessonTitle,
              contents: cardsWithOpen,
            }]));
        })
    }
  }, [data]);


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

  const handleChange = (e, lessonIndex) => {
    const { name, value } = e.target;
  
    setFormData(prev => {
      const updated = [...prev];
      updated[lessonIndex][name] = value;
      return updated;
    });
  };

  const handleCardChange = (lessonIndex, cardIndex, field, value) => {
    setFormData(prev => {
      const updated = [...prev];
      const updatedContents = [...updated[lessonIndex].contents];
      updatedContents[cardIndex][field] = value;
      updated[lessonIndex].contents = updatedContents;
      return updated;
    });
  };
  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    const formImageData = new FormData();
    formImageData.append('file', file);
  
    const { data, error, status } = await usePost(
      `/courses/upload`,
      formImageData
    );
     if (data) {
      handleCardChange(index, "url", data);
    }
  };

  const handleVideoUpload = async (e, index) => {
    setLoading(true)
    const file = e.target.files[0];
    const formImageData = new FormData();
    formImageData.append('file', file);
  
    const { data, error, status } = await useImagePost(
      `/courses/upload`,
      formImageData
    );
    
    if (status == 201) {
      setLoading(false)
      handleCardChange(index, "url", data);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleUpload(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleLessonsUpdate = async () => {
    const {data, error, status} = await usePut(`/courses/update/${id}`, formData)
    if(status == 201){
      router.push("/teacher/course")
    }
  };

  return (
    <>
      <UpdateLessonHeader handleLessonsUpdate={handleLessonsUpdate} id={id} />
      <div className=" p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%]">
        {formData.map((formdata, index)=>(<div key={index}>
        {/*  Title */}
        <div className="mb-4 ">
          <label className="block text-gray-700 font-semibold">
            Lesson Title
          </label>
          <Input
            placeholder="Lesson title"
            className="my-5"
            name="lessonTitle"
            value={formdata.lessonTitle}
            onChange={(e)=>{handleChange(e, index)}}
          />
        </div>

        <div className="mb-4 space-y-4">
          {formdata.contents.map((q, i) => (
            <div key={i} className="border p-4 rounded-lg mb-4">
              <div
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-3 rounded-lg"
                onClick={() => toggleQuestion(i)}
              >
                <span className="text-gray-700 font-medium">Lesson {q.id}</span>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeQuestion(i);
                    }}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                  {q.open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
              {true && (
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
                            handleCardChange(index, i, "title", e.target.value)
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
                            handleCardChange(index, i, "type", e.target.value)
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
                          {!formdata.contents[i]?.url ? (
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
                                    handleVideoUpload(e, i);
                                  }}
                                  style={{ display: "none" }}
                                  required
                                />
                              </label>}
                            </div>
                          ) : (
                            <div className="h-[200px] w-[100px]">
                              <video
                                src={formdata.contents[i].url}
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
                      {q.type == "image" && (
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
                      )}
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
        </div>
        </div>))}
          <Button onClick={addQuestion} className="flex items-center gap-2">
            <PlusCircle size={16} /> Add Question
          </Button>
      </div>
    </>
  );
} 