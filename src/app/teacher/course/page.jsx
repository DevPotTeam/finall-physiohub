"use client";
import { useEffect, useState } from "react";
import Courses from "@/components/course/Courses"
import CreateCourse from "@/components/course/CreateCourse"
import useGet from "@/hooks/useGet"


export default function Course() {
  const [showInCourse, setShowInCourse] = useState("Course")
  const [courses, setCourses] = useState([])

  const fetchData = async() =>{
    const {data, error, status} = await useGet(`/courses/getAllCourses`)
    if(status == 200){
      setCourses(data)
    }
  }

  useEffect(()=>{
    fetchData()
  },[showInCourse]);

  return (
    <>
      <div className="flex flex-col md:flex-col sm:flex-col lg:flex-row">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            {showInCourse == "Course"&&<Courses setShowInCourse={setShowInCourse} data={courses}/>}
            {showInCourse == "CreateCourse"&&<CreateCourse setShowInCourse={setShowInCourse}/>}  
          </div>
        </div>
      </div>
    </>
  );
}
