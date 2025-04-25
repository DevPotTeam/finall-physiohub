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

const Course = ({ imageSrc, title, description, rating, totalRating, id, verified, instructor, enrolled, lessons }) => {
  const [notification, setNotification] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

 

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      setUserId(user.id)
    }
  },[])

  useEffect(()=>{
    const isStudentEnrolled = enrolled.includes(userId);
    setIsEnrolled(isStudentEnrolled)
    
  },[enrolled, userId]);

  const handleCourseJoin = async(id) =>{
    setLoading(true)
    const {data, error, status} = await usePost(`/courses/enroll`,{courseId : id})
    if(status == 201){
      setLoading(false)
      router.push(`/course/${id}`)
    }
    if(error){
      setLoading(false)
      showToast(error || "Failed to Enroll in Course. Try Again", "error")
    }
  }

  const handleCheck = () =>{

  }


  return (
    <div onClick={handleCheck} className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 sm:max-w-[320px] max-w-[300px] relative cursor-pointer">
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
        {/* {verified&&<div className="flex items-center space-x-2 mt-4">
          <BadgeCheck size={18} color="#7240FD" />
          <span className="text-[#7240FD]"> Admin Verified</span>
        </div>} */}
        <h3 className="text-lg font-semibold mt-4">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm text-gray-600">Instructor <span className="font-semibold">{instructor.name}</span></p>
        <p className="text-sm text-gray-600">Lessons <span className="font-semibold">{lessons}</span></p>
        <div className="mt-2">
          <Rating
            name="simple-controlled"
            value={rating}
            readOnly
          />
        </div>
        {totalRating > 0&&<p className="text-sm text-gray-600">Rating {totalRating}+</p>}
      </div>
      {!isEnrolled?<div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <button className="border border-purple-600 w-full text-purple-600 rounded-sm py-1 flex items-center justify-center font-semibold" onClick={()=>{handleCourseJoin(id)}}>{loading?<div className="w-5 h-5 border-4 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div> : "Enroll Course"}</button>
        </div> : <Link href={`/course/${id}`} className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <button className="border border-purple-600 w-full text-purple-600 rounded-sm py-1 flex items-center justify-center font-semibold">View</button>
        </Link>}
        {notification && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg z-50 ${
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

function Courses() {
  const [flashCards, setFlashCards] = useState([]);
  const fetchFlashCardsData = async() => {
    const { data, error, status } = await useGet(`/courses/getAllCourses`);
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
          <h6 className="font-semibold text-3xl">All Courses</h6>
          <p className="my-2">A perfect tool for quick revisions and reinforcing your learning, making complex information easy to remember.</p>
            <Input className="max-w-96"placeholder="Search"/>
          <div className="w-full grid xl:grid-cols-3 sm:grid-cols-2 gap-2 mt-4">

          {...flashCards?.map((flashcard) => (
            <Course  
            key={flashcard._id}
            imageSrc={flashcard.coverImageUrl}
            title={flashcard.title}
            verified={flashcard.verifiedByAdmin}
            description={flashcard.description}
            rating={flashcard.rating}
            totalRating={flashcard.ratingCount}
            id={flashcard._id}
            instructor = {flashcard.instructor}
            enrolled = {flashcard.enrolledStudents}
            lessons={flashcard.lessons.length}
            />
          ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;
