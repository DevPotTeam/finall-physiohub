"use client";
import { Input } from "@/components/ui/input";
import useGet from "@/hooks/useGet";
import { Rating } from "@mui/material";
import { AlarmClock, BadgeCheck, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Course = ({ imageSrc, title, description, rating, totalRating, id, verified }) => {
  return (
    <Link href={`/flashcard/${id}`} className="flex flex-col justify-between bg-white rounded-xl border overflow-hidden p-4 w-[320px] relative cursor-pointer">
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
    </Link>
  );
};

function Courses() {
  const [flashCards, setFlashCards] = useState([]);
  const fetchFlashCardsData = async() => {
    const { data, error, status } = await useGet(`/courses/getAllCourses`);
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
      <div className="mt-4 w-full mx-auto max-w-[80%] ">
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
            />
          ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Courses;
