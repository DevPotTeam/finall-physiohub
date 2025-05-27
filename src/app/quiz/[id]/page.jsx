"use client";
import { ArrowLeft, ArrowRight, Flag } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import run from "@/components/animations/data/Happy.json";
import cry from "@/components/animations/data/Cry.json";
import LottiePlayer from "@/components/animations/LottiePlayer";
import SignInBanner from "@/components/signInBanner/SignInBanner.js";
import { IoIosCheckmark } from "react-icons/io";
import Link from "next/link";
import ReportModal from "@/components/common/ReportModal";
import useGet from "@/hooks/useGet";
import usePost from "@/hooks/usePost";

// const questions = [
//   {
//     question:
//       "A 25-year-old man comes to the emergency department because of acute onset hoarseness of voice within the past 3 days. He also reports coughing, frequent throat clearing, and flu-like symptoms. He reports having an upper respiratory infection from babysitting his younger cousin 5 days ago. A laryngoscopy is done and shows erythematous and oedematous laryngeal tissue. Which of the following is the next best step in management for this patient?",
//     options: [
//       {
//         id: "A",
//         text: "90% inorganic material & 10% organic material",
//         correct: false,
//       },
//       {
//         id: "B",
//         text: "35% inorganic material & 65% organic material",
//         correct: true,
//       },
//       {
//         id: "C",
//         text: "50% inorganic material & 50% organic material",
//         correct: false,
//       },
//       {
//         id: "D",
//         text: "65% inorganic material & 35% organic material",
//         correct: false,
//       },
//     ],
//     explanation:
//       "The Biceps Brachii muscle is located in the upper arm and is primarily responsible for flexion of the elbow. It helps in bringing the forearm towards the shoulder.",
//     image: "http://example.jpg",
//     type: "chooseTheCorrect",
//   },
//   {
//     question:
//       "Which structure is responsible for producing cerebrospinal fluid?",
//     answer: "abcd",
//     explanation:
//       "The Biceps Brachii muscle is located in the upper arm and is primarily responsible for flexion of the elbow. It helps in bringing the forearm towards the shoulder.",
//     type: "text",
//   },
//   {
//     question:
//       "What are the common goals of physiotherapy for patients with stroke? (Select all that apply)",
//     options: [
//       { id: "A", text: "Choroid Plexus" },
//       { id: "B", text: "Pineal Gland" },
//       { id: "C", text: "Cerebellum" },
//       { id: "D", text: "Thalamus" },
//     ],
//     explanation:
//       "The Biceps Brachii muscle is located in the upper arm and is primarily responsible for flexion of the elbow. It helps in bringing the forearm towards the shoulder.",
//     type: "multipleChoice",
//   },
//   {
//     question:
//       "What are the common goals of physiotherapy for patients with stroke? (Select all that apply)",
//     options: [
//       { id: "A", text: "True", correct: false },
//       { id: "B", text: "False", correct: true },
//     ],
//     explanation:
//       "The Biceps Brachii muscle is located in the upper arm and is primarily responsible for flexion of the elbow. It helps in bringing the forearm towards the shoulder.",
//     type: "trueFalse",
//   },
// ];

export default function QuizCard({params}) {
  const { id } = React.use(params); 
  const [questions, setQuestions] = useState([])
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [multipleOptions, setMultipleOptions] = useState([]);
  const [textAnswer, setTextAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(150);
  const [isSubmited, setIsSubmited] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [result, setResult] = useState([]);
  // const [mainTopic, setMainTopic] = useState("")

  const fetchQuizData = async ()=>{
    const {data, error, status} = await useGet(`/quizzes/${id}`)
    
    if(status == 200){
      setQuestions(data.questions)
      // setMainTopic(data.mainTopic.name)
    }
  }
  useEffect(()=>{
    fetchQuizData()
    if (startTime === null) {
      setStartTime(Date.now());
    }
  },[])


  useEffect(() => {
    if (!startTime) return;
  
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // const handleCheckAnswer = () => {
  //   if (isAnswered) return;
  //   const current = questions[currentQuestion];
  //   let correct = false;
  //   const correctAnswer = questions[currentQuestion].options
  //   .filter((opt) => opt.correctAnswer)
  //   setCorrectAnswer(correctAnswer.value)

  //   if (current.type === "checkbox") {
  //     const correctAnswers = current.options
  //       .filter((opt) => opt.correctAnswer)
  //       .map((opt) => opt._id);

  //     correct =
  //       multipleOptions.length === correctAnswers.length &&
  //       multipleOptions.every((id) => correctAnswers.includes(id));
  //   } else if (current.type === "radio") {
  //     const correctAnswer = current.options.find((opt) => opt.correctAnswer)?._id;
  //     correct = selectedOption === correctAnswer;
  //   } else if (current.type === "short-answer") {
  //     const correctAnswer = current.answer?.toLowerCase().trim();
  //     correct = textAnswer.toLowerCase().trim() === correctAnswer;
  //   }

  //   let selectedTextOption = "";
  //   if (current.type === "checkbox") {
  //     selectedTextOption = current.options
  //       .filter((opt) => multipleOptions.includes(opt._id))
  //       .map((opt) => opt.text)
  //       .join(", ");
  //   } else if (current.type === "radio") {
  //     selectedTextOption = current.options.find((opt) => opt._id === selectedOption)?.text || "";
  //   } else if (current.type === "short-answer") {
  //     selectedTextOption = textAnswer;
  //   }
  
  //   // Save answer
  //   setUserAnswers((prev) => [
  //     ...prev,
  //     {
  //       questionIndex: currentQuestion,
  //       selectedTextOption,
  //     },
  //   ]);

  //   setIsCorrect(correct);
  //   setExplanation(current.explanation || "");
  //   setIsAnswered(true);
  // };

  const handleCheckAnswer = () => {
    if (isAnswered) return;


    const current = questions[currentQuestion];
    let correct = false;
   
    const correctAnswer = questions[currentQuestion].options.filter(option=> option.correctAnswer)
    if(correctAnswer){
      setCorrectAnswer(correctAnswer[0].value)
      console.log(correctAnswer)
    }
    if (current.type === "checkbox") {
      const correctAnswers = current.options
        .filter((opt) => opt.correctAnswer)
        .map((opt) => opt._id);
  
      correct =
        multipleOptions.length === correctAnswers.length &&
        multipleOptions.every((id) => correctAnswers.includes(id));
    } else if (current.type === "radio") {
      const correctAnswer = current.options.find((opt) => opt.correctAnswer)?._id;
      correct = selectedOption === correctAnswer;
    } else if (current.type === "short-answer") {
      const correctAnswer = current.answer?.toLowerCase().trim();
      correct = textAnswer.toLowerCase().trim() === correctAnswer;
    }
  
    // Get selected text option
    let selectedTextOption = "";
    if (current.type === "checkbox") {
      selectedTextOption = current.options
        .filter((opt) => multipleOptions.includes(opt._id))
        .map((opt) => opt.value)
        .join(", ");
    } else if (current.type === "radio") {
      selectedTextOption = current.options.find((opt) => opt._id === selectedOption)?.value || "";
    } else if (current.type === "short-answer") {
      selectedTextOption = textAnswer;
    }
  
    // Save answer
    setUserAnswers((prev) => [
      ...prev,
      {
        questionIndex: currentQuestion,
        selectedTextOption,
      },
    ]);
  
    setIsCorrect(correct);
    setExplanation(current.explanation || "");
    setIsAnswered(true);
  };
  

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setMultipleOptions([]);
      setTextAnswer("");
      setExplanation("");
    } else {
      alert("🎉 Quiz completed!");
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setIsAnswered(false);
      setSelectedOption(null);
      setMultipleOptions([]);
      setTextAnswer("");
      setExplanation("");
    }
  };

  const handleSubmit = async() => {
    setIsSubmited(true);
    const endTime = Date.now();
    const completionTimeInSeconds = Math.floor((endTime - startTime) / 1000);
  
    const finalPayload = {
      answers: userAnswers,
      completionTime: completionTimeInSeconds,
    };

    const fetchResult =  async() => {
      const { data, error, status } = await usePost(`/quizzes/generate-results/${id}`);
      
      if (status === 201 && Array.isArray(data)) {
        const lastResult = data[0]; // get last object
        setResult(lastResult);
      }
    }
    
      const {data, error, status} = await usePost(`/quizzes/submit-quiz/${id}`, finalPayload)
      if(status == 201){
        const {data, error, status} = await usePost("/users/attendance")
        console.log(status) 
        if(status == 201){
          fetchResult()
        }
      }
  };


 

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <Link
        href={"/user/quizs"}
        className="px-2 py-1 bg-gray-100 flex items-center w-fit rounded-md"
      >
        <ArrowLeft className="text-gray-600" size={18} /> &nbsp; Go to Dashbaord
      </Link>
      <div className="flex justify-center my-5">
        <ArrowLeft
          className="text-gray-600 cursor-pointer"
          size={24}
          onClick={handleBack}
        />
        <div className="w-full h-2 bg-gray-200 rounded-full mx-4">
          <div className=" h-full bg-[#6c4ce6] rounded-full"
            style={{
              width : `${((currentQuestion + 1) / questions.length) * 100 }%`
            }}
          ></div>
        </div>
      </div>
      {/* <SignInBanner /> */}
      {!isSubmited ? (
        <>
          <div className="flex items-center justify-between md:gap-0 gap-2 mb-4 bg-gray-100 rounded-md py-2 px-2">
            <div className="flex md:justify-start justify-center items-center md:space-x-3 space-x-2">
              {/* <img
                src="/user-avatar.png"
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-gray-900 md:block hidden font-semibold">
                Devon Lane
              </h2> */}
            </div>

            <div className="text-gray-600 md:text-sm text-xs">
              <span className="font-semibold">Quize Started </span>
              <div className="text-lg   font-bold text-center">
                {formatTime(elapsed)} 
              </div>
            </div>
            <div className="text-gray-700 md:text-base text-xs font-semibold">
              24 Points ⭐
            </div>
          </div>

          <div className="my-10 relative">
            <h3 className="text-xs border-s-2 border-blue-600 ps-2 mb-3 text-gray-400 uppercase font-semibold">
              Question {currentQuestion + 1} of {questions.length}
               {/* • Topic
              {mainTopic} */}
            </h3>
            {questions[currentQuestion]?.image && (
              <div className="md:w-52 w-38 md:h-52 h-38 rounded-md justify-self-center">
                <img src={questions[currentQuestion].image} className="w-full h-full" alt="question Image"/>
              </div>
            )}
            <p className="text-gray-800 mt-2 md:text-[15px] text-[14px]">
              {questions[currentQuestion]?.question}
            </p>

            {isAnswered && !isCorrect && (
              <div className="w-full py-2 px-3 bg-[#E2F9FC] mt-3 rounded-md sm:text-sm text-xs border border-green-300">
                <p>
                  <span className="font-semibold sm:text-base text-xsf">
                    The Correct Answer is {correctAnswer}.
                  </span>
                </p>
              </div>
            )}

            <div className="mt-8 mb-10 space-y-2 ">
              {questions[currentQuestion]?.type == "radio" &&
                questions[currentQuestion]?.options.map((option, index) => {
                  let borderColor = "border-gray-300";
                  let bgColor = "";
                  if (
                    isAnswered &&
                    selectedOption === option._id &&
                    !option.correctAnswer
                  ) {
                    borderColor = "border-red-500"; // Wrong answer gets a red border
                    bgColor = "bg-red-50";
                  }

                  return (
                    <label
                      key={option._id}
                      className={`flex items-center p-2 border rounded-lg cursor-pointer gap-2 ${borderColor} ${bgColor} ${
                        selectedOption === option.id
                          ? "border-[#6C4CE6] bg-purple-50"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="quiz"
                        className="hidden"
                        onChange={() => {
                          setSelectedOption(option._id);
                          setSelectedAnswer(option.value);
                        }}
                        disabled={isAnswered}
                      />
                      <div
                        className={`py-1 md:px-3 px-2 rounded md:text-base text-sm ${
                          selectedOption === option._id
                            ? isAnswered && !isCorrect
                              ? "bg-red-500 text-white"
                              : "bg-[#6C4CE6] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {index+1}
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <p className="md:text-sm text-[13px] font-semibold">
                          {option.value}
                        </p>
                        <span className="md:w-6 w-[22px] md:h-6 h-[20px] border-2 rounded-full flex items-center justify-center">
                          {selectedOption === option._id && (
                            <span
                              className={`md:w-3 w-2 md:h-3 h-2 ${
                                isAnswered && !isCorrect && "bg-red-500"
                              } bg-[#6C4CE6] rounded-full`}
                            ></span>
                          )}
                        </span>
                      </div>
                    </label>
                  );
                })}
              {questions[currentQuestion]?.type == "short-answer" && (
                <div className="w-full">
                  <textarea
                    name=""
                    id=""
                    placeholder="Enter your answer here..."
                    className="w-full h-full p-2 bg-gray-50 border rounded-md"
                    rows={5}
                    onChange={(e) => {
                      setTextAnswer(e.target.value);
                    }}
                  ></textarea>
                </div>
              )}
              {questions[currentQuestion]?.type == "checkbox" &&
                questions[currentQuestion]?.options.map((option) => (
                  <label
                    key={option._id}
                    className={`flex items-center p-2 border rounded-lg cursor-pointer gap-2 ${
                      multipleOptions.includes(option._id)
                        ? "bg-purple-50 border-[#6C4CE6]"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={() => {
                        if (multipleOptions.includes(option._id)) {
                          setMultipleOptions(
                            multipleOptions.filter((id) => id !== option._id)
                          );
                        } else {
                          setMultipleOptions([...multipleOptions, option._id]);
                        }
                      }}
                      checked={multipleOptions.includes(option._id)}
                      disabled={isAnswered}
                    />
                    <div
                      className={`py-1 px-3 rounded ${
                        multipleOptions.includes(option._id)
                          ? "bg-[#6C4CE6] text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {option.value}
                    </div>
                    <div className="w-full flex justify-between">
                      <p className="text-sm font-semibold">{option.text}</p>
                      <span className="w-6 h-6 border-2 rounded flex items-center justify-center mr-3">
                        {multipleOptions.includes(option._id) && (
                          <span className="w-6 h-6 bg-[#6C4CE6] flex items-center justify-center rounded    ">
                            <IoIosCheckmark className="text-white text-2xl" />
                          </span>
                        )}
                      </span>
                    </div>
                  </label>
                ))}
              {questions[currentQuestion]?.type == "trueFalse" &&
                questions[currentQuestion]?.options.map((option) => {
                  let borderColor = "border-gray-300";
                  let bgColor = "";
                  if (
                    isAnswered &&
                    selectedOption === option.id &&
                    !option.correct
                  ) {
                    borderColor = "border-red-500"; // Wrong answer gets a red border
                    bgColor = "bg-red-50";
                  }

                  return (
                    <label
                      key={option.id}
                      className={`flex items-center p-2 border rounded-lg cursor-pointer gap-2 ${borderColor} ${bgColor} ${
                        selectedOption === option.id
                          ? "border-[#6C4CE6] bg-purple-50"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="quiz"
                        className="hidden"
                        onChange={() => {
                          setSelectedOption(option.id);
                          setSelectedAnswer(option);
                        }}
                        disabled={isAnswered}
                      />
                      <div
                        className={`py-1 md:px-3 px-2 rounded md:text-base text-sm ${
                          selectedOption === option.id
                            ? isAnswered && !isCorrect
                              ? "bg-red-500 text-white"
                              : "bg-[#6C4CE6] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {option.id}
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <p className="md:text-sm text-[13px] font-semibold">
                          {option.text}
                        </p>
                        <span className="md:w-6 w-[22px] md:h-6 h-[20px] border-2 rounded-full flex items-center justify-center">
                          {selectedOption === option.id && (
                            <span
                              className={`md:w-3 w-2 md:h-3 h-2 ${
                                isAnswered && !isCorrect && "bg-red-500"
                              } bg-[#6C4CE6] rounded-full`}
                            ></span>
                          )}
                        </span>
                      </div>
                    </label>
                  );
                })}
            </div>

            {isAnswered && (
              <div
                className={`flex sm:flex-row flex-col items-center  ${
                  isCorrect
                    ? "sm:flex-row flex-col sm:left-[25%] left-[20%] bottom-[-10%] "
                    : "sm:flex-row-reverse flex-col left-[8%] sm:bottom-[-10%] bottom-[-5%]"
                } sm:gap-5 gap-3 absolute z-10 justify-self-center`}
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
                    <p className="text-sm text-gray-600">
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
          </div>

          <div className="mt-10 flex justify-between z-50">
            <button
              onClick={() => setIsReportOpen(true)}
              className="text-gray-600 hover:underline sm:flex hidden items-center gap-2"
            >
              <Flag size={16} />
              Report
            </button>
            <div className="space-x-4 flex sm:justify-end justify-between md:w-auto w-full">
              {currentQuestion !== questions.length - 1 && (
                <button
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                  onClick={handleNext}
                >
                  Skip
                </button>
              )}
              {!isAnswered ? (
                <button
                  className={`px-4 py-2 rounded-lg text-white ${
                    selectedOption ||
                    textAnswer.length > 0 ||
                    multipleOptions.length > 0
                      ? "bg-[#6C4CE6]"
                      : "bg-gray-300"
                  }`}
                  disabled={
                    !(
                      selectedOption ||
                      textAnswer.length > 0 ||
                      multipleOptions.length > 0
                    )
                  }
                  onClick={handleCheckAnswer}
                >
                  Check Answer
                </button>
              ) : currentQuestion !== questions.length - 1 ? (
                <button
                  className={`px-4 py-2 rounded-lg  ${
                    !isCorrect
                      ? "bg-red-500 text-white"
                      : "bg-[#6C4CE6] text-white"
                  } text-white`}
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  className="px-4 py-2 cursor-pointer rounded-lg bg-[#6C4CE6] text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
          <ReportModal
            isOpen={isReportOpen}
            onClose={() => setIsReportOpen(false)}
          />
        </>
      ) : (
        <>
          <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br rounded-lg from-purple-50 to-blue-50">
  <div className="w-full max-w-2xl flex flex-col items-center px-4 py-8">
    {/* Celebration Animation */}
    <div className="sm:w-[180px] w-[120px] sm:h-[180px] h-[120px] mb-6 animate-bounce">
      <LottiePlayer animationFile={run} width="100%" height="100%" />
    </div>

    {/* Header */}
    <h1 className="text-3xl font-bold text-purple-800 mb-2">Quiz Completed!</h1>
    <p className="text-gray-600 mb-8">Your performance breakdown</p>

    {/* Score Card */}
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-center">
        <img 
          src="/CompletionBadge.png" 
          alt="Achievement Badge" 
          className="w-24 h-24 mx-auto mb-2 animate-pulse"
        />
        <h2 className="text-2xl font-bold text-white">Great Job!</h2>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Score</p>
          <p className="text-3xl font-bold text-purple-800">{result.score}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Rank</p>
          <p className="text-3xl font-bold text-blue-800">Top {result.rank}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Time</p>
          <p className="text-xl font-bold text-green-800">{result.completionTime}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">Accuracy</p>
          <p className="text-xl font-bold text-yellow-800">
            {Math.round((result.correctAnswers / (result.correctAnswers + result.incorrectAnswers)) * 100)}%
          </p>
        </div>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 w-full mt-10 px-4">
      <Link href={"/user/dashboard"} 
        className="px-6 py-3 border-2 border-purple-200 rounded-xl text-purple-700 hover:bg-purple-50 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </Link>
      
      <Link
        href={"/user/quizs"}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
      >
        Next Quiz
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>

    {/* Progress Visualization (Optional) */}
    <div className="w-full mt-8 bg-white p-4 rounded-xl shadow">
      <h3 className="font-medium text-gray-700 mb-3">Question Analysis</h3>
      <div className="flex items-center gap-2">
        <div 
          className="h-4 bg-green-200 rounded-full" 
          style={{ width: `${(result.correctAnswers / (result.correctAnswers + result.incorrectAnswers)) * 100}%` }}
        ></div>
        <div 
          className="h-4 bg-red-200 rounded-full" 
          style={{ width: `${(result.incorrectAnswers / (result.correctAnswers + result.incorrectAnswers)) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <span className="text-green-600">{result.correctAnswers} Correct</span>
        <span className="text-red-600">{result.incorrectAnswers} Incorrect</span>
      </div>
    </div>
  </div>
</div>
        </>
      )}
    </div>
  );
}
