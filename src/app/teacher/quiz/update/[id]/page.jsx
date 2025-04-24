"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Trash2,
  Upload,
} from "lucide-react";
import { Select } from "@/components/ui/select.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textArea.jsx";
import { Switch } from "@/components/ui/switch.jsx";
import { Button } from "@/components/ui/button.jsx";
import UpdateQuizHeader from "@/components/quiz/UpadateQuizHeader"
import { useRouter } from "next/navigation";
import usePut from "@/hooks/usePut"
import useImagePost from "@/hooks/useImagePost";
import Image from "next/image";
import useGet from "@/hooks/useGet";

const QuestionType = {
  ShortAnswer: "short-answer",
  Radio: "radio",
  Checkbox: "checkbox",
  Dropdown: "dropdown",
};

export default function UpdateQuiz({params}) {
  const{id} = React.use(params)
  const [data, setData] = useState({})

 

  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const [quizData, setQuizData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    mainTopic: "",
    subTopics: [],
    quizStatus: "",
    coverImage: "",
    thumbnail: "",
    questions: []
  });

  const fetch = async() =>{
    const {data, status} = await useGet(`/quizzes/${id}`)
    if(status == 200){
      setData(data)
    }
  }
  
  useEffect(()=>{
    fetch()
  },[])

  
useEffect(() => {
    setQuizData({
      title: data.title || "",
      startTime: data.startTime || "",
      endTime: data.endTime || "",
      mainTopic: data.mainTopic || "",
      subTopics: data.subTopics || [],
      quizStatus: data.quizStatus || "",
    });
  
}, [data]);
  
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      image: null,
      type: QuestionType.Radio,
      options: [
        { type: "text", value: "", correctAnswer: false },
        { type: "text", value: "", correctAnswer: false },
        { type: "text", value: "", correctAnswer: false },
        { type: "text", value: "", correctAnswer: false },
      ],
      description: "",
      open: true,
    },
  ]);

  useEffect(() => {
    if (data?.questions?.length) {
      const formattedQuestions = data.questions.map((q, index) => ({
        id: index + 1,
        question: q.question || "",
        image: q.image || null,
        type: q.type || "radio",
        options: q.options?.map((opt) => ({
          type: opt.type || "text",
          value: opt.value || "",
          correctAnswer: !!opt.correctAnswer, // Ensures it's a boolean
        })) || [],
        description: q.description || "",
        open: true,
      }));
  
      setQuestions(formattedQuestions);
    }
  }, [data]);

  const [coverImageLoading, setCoverImageLoading] = useState(false);
  const [thumbnailImageLoading, setThumbnialImageLoading] = useState(false);
  const [questionImageLoading, setQuestionImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        image: null,
        type: QuestionType.Radio,
        options: [
          { type: "text", value: "", correctAnswer: false },
          { type: "text", value: "", correctAnswer: false },
          { type: "text", value: "", correctAnswer: false },
          { type: "text", value: "", correctAnswer: false },
        ],
        description: "",
        open: false,
      },
    ]);
  };

  const toggleQuestion = (index) => {
    setQuestions(
      questions.map((q, i) => (i === index ? { ...q, open: !q.open } : q))
    );
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex].value = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    // For radio type, only one correct answer allowed
    if (updatedQuestions[questionIndex].type === QuestionType.Radio) {
      updatedQuestions[questionIndex].options.forEach((opt, idx) => {
        opt.correctAnswer = idx === optionIndex;
      });
    } else {
      // For checkbox type, multiple correct answers allowed
      updatedQuestions[questionIndex].options[optionIndex].correctAnswer =
        !updatedQuestions[questionIndex].options[optionIndex].correctAnswer;
    }
    setQuestions(updatedQuestions);
  };

  const handleUpload = async (eOrFiles, name) => {
    if (name === "thumbnail") setThumbnialImageLoading(true);
    if (name === "coverImage") setCoverImageLoading(true);

    // Support both input events and FileList directly
    const file = eOrFiles.target?.files?.[0] || eOrFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const { data, error, status } = await useImagePost(
      `/courses/upload-image`,
      formData
    );

    if (data) {
      setQuizData((prev) => ({ ...prev, [name]: data }));
    }

    if (name === "thumbnail") setThumbnialImageLoading(false);
    if (name === "coverImage") setCoverImageLoading(false);
  };

  const handleDrop = (event, name) => {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      handleUpload(event.dataTransfer.files, name);
    } else {
      console.warn("No files found in drop event");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleQuestionImageUpload = async (eOrFiles, index) => {
    setQuestionImageLoading(true);

    // Support both input events and FileList directly
    const file = eOrFiles.target?.files?.[0] || eOrFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const { data, error, status } = await useImagePost(
      `/courses/upload-image`,
      formData
    );

    if (data) {
      // Update the specific question's image URL
      setQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          image: data,
        };
        return updatedQuestions;
      });
    }

    setQuestionImageLoading(false);
    
  };

  const handleQuestionImageDrop = (event, index) => {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files) {
      handleUpload(event.dataTransfer.files, name);
    } else {
      console.warn("No files found in drop event");
    }
  };

  const handleQuestionImageDragOver = (event) => {
    event.preventDefault();
  };

  const handleQuizUpdate = async() =>{
   const quizPayload = {
     title: quizData.title,
     startTime: quizData.startTime,
     endTime: quizData.endTime,
     mainTopic: quizData.mainTopic,
     subTopics: quizData.subTopics,
     status: quizData.quizStatus,
     coverImage: quizData.coverImage,
     thumbnail: quizData.thumbnail,
     questions : questions.map((q)=>({
       question : q.question,
       image : q.image,
       type : q.type,
       describe : q.description,
       options : q.options
     }))
   };

   const {data, error , status} = await usePut(`/quizzes/${id}`, {...quizPayload, status : "published"});
   if(status == 200){
    router.push(`/teacher/quiz`)
   }
   if(error){
    setError(error)
   }
 }

  return (
    <>
      <UpdateQuizHeader handleQuizUpdate={handleQuizUpdate} loading={loading} id={id}/>
      {error && <p className="text-red-500 mb-3">{error[0]}</p>}
      <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%]">
        {/* Quiz Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Quiz Title</label>
          <Input
            name="title"
            value={quizData.title}
            onChange={handleQuizChange}
            placeholder="Enter quiz title"
            className="w-full"
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Start Time</label>
            <Input
              type="datetime-local"
              name="startTime"
              value={quizData.startTime}
              onChange={handleQuizChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-gray-700">End Time</label>
            <Input
              type="datetime-local"
              name="endTime"
              value={quizData.endTime}
              onChange={handleQuizChange}
              className="w-full"
            />
          </div>
        </div>



        {/* Quiz and Card Topic Selection */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Main Topic</label>
            <Select
              name="mainTopic"
              value={quizData.mainTopic}
              onChange={handleQuizChange}
              className="w-full"
            >
              <option value="">Choose category</option>
              <option value="67e83532d7db5610a12b895b">History</option>
              <option value="67e83532d7db5610a12b895c">Geography</option>
              <option value="67e83532d7db5610a12b895d">Science</option>
            </Select>
          </div>
          <div>
            <label className="block text-gray-700">Sub Topics</label>
            <Select
              name="subTopics"
              value={quizData?.subTopics[0] || ""}
              onChange={(e) =>
                setQuizData({ ...quizData, subTopics: [e.target.value] })
              }
              className="w-full"
            >
              <option value="">Choose sub-category</option>
              <option value="67e8354fd7db5610a12b895d">World History</option>
              <option value="67e8354fd7db5610a12b895e">Countries</option>
              <option value="67e8354fd7db5610a12b895f">Biology</option>
            </Select>
          </div>
        </div> */}

        {/* Questions Section */}
        <div className="mb-4 space-y-4">
          {questions?.map((q, index) => (
            <div key={q.id} className="border p-4 rounded-lg mb-4">
              <div
                className="flex justify-between items-center cursor-pointer bg-gray-100 p-3 rounded-lg"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-gray-700 font-medium">
                  Question {q.id}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
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
                  {/* Question Image Upload */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">
                      Question Image
                    </label>
                    {!q?.image ? (
                      <div
                        className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 "
                        onDrop={(e)=>{handleQuestionImageDrop(e, index)}}
                        onDragOver={(e)=>{handleQuestionImageDragOver(e, index)}}
                      >
                        {questionImageLoading ? (
                          <div className="w-12 h-12 border-4 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                        ) : (
                          <label className="ud-btn btn-white text-center cursor-pointer">
                            <div className="icon mb5">
                              <Upload className="w-6 h-6 mb-2 text-purple-600 justify-self-center " />
                            </div>
                            <h4 className="title fz17 mb1">
                              Upload/Drag photos of your Question
                            </h4>
                            Browse Files
                            <input
                              ref={fileInputRef}
                              id="fileInput"
                              type="file"
                              name="images"
                              multiple
                              className="ud-btn btn-white"
                              onChange={(e) => {
                                handleQuestionImageUpload(e, index);
                              }}
                              style={{ display: "none" }}
                              required
                            />
                          </label>
                        )}
                      </div>
                    ) : (
                      <div>
                        <Image
                          src={q.image}
                          height={400}
                          width={200}
                          alt="cover-image"
                        />
                      </div>
                    )}
                  </div>

                  {/* Question Text */}
                  <Input
                    placeholder="Write question here"
                    className="my-5"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(index, "question", e.target.value)
                    }
                  />

                  {/* Question Type */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Question Type
                    </label>
                    <Select
                      value={q.type}
                      onChange={(e) =>
                        handleQuestionChange(index, "type", e.target.value)
                      }
                      className="w-full"
                    >
                      <option value={QuestionType.Radio}>
                        Single Correct Answer
                      </option>
                      <option value={QuestionType.Checkbox}>
                        Multiple Correct Answers
                      </option>
                      <option value={QuestionType.ShortAnswer}>
                        Short Answer
                      </option>
                      <option value={QuestionType.Dropdown}>Dropdown</option>
                    </Select>
                  </div>

                  {/* Options - only show if not short answer */}
                  {q.type !== QuestionType.ShortAnswer && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((option, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 mb-2 border p-2 rounded"
                        >
                          <input
                            type="text"
                            placeholder={`Option ${idx + 1}`}
                            className="w-full border-none outline-none rounded-lg"
                            value={option.value}
                            onChange={(e) =>
                              handleOptionChange(index, idx, e.target.value)
                            }
                          />
                          <label className="text-sm">Correct</label>
                          <Switch
                            checked={option.correctAnswer}
                            onCheckedChange={() =>
                              handleCorrectAnswerChange(index, idx)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Explanation */}
                  <Textarea
                    placeholder="Write explanation here..."
                    value={q.description}
                    onChange={(e) =>
                      handleQuestionChange(index, "description", e.target.value)
                    }
                    className="mt-4"
                  />
                </div>
              )}
            </div>
          ))}
          <Button
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-2"
            variant="outline"
          >
            <PlusCircle size={16} /> Add Question
          </Button>
        </div>

        {/* Submit Buttons */}
        {/* <div className="flex justify-end gap-4 mt-6">
          <Button 
            type="button" 
            onClick={(e) => handleSubmit(e, 'draft')} 
            disabled={loading}
            variant="outline"
          >
            {loading ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button 
            type="button" 
            onClick={(e) => handleSubmit(e, 'published')} 
            disabled={loading}
          >
            {loading ? 'Publishing...' : 'Publish Quiz'}
          </Button>
        </div> */}
      </div>
    </>
  );
}
