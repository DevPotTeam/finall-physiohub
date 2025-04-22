"use client";
import Image from "next/image.js";
import { Button } from "@/components/ui/button.jsx";
import { Trash2, Edit, Sparkles, MessageSquareText, Clock } from "lucide-react";
import CourseHeader from "@/components/course/CourseHeader";
import Link from "next/link";
import useDelete from "@/hooks/useDelete";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material";

export default function Course({ setShowInCourse, data }) {

  const handleCourseDelete = async (id) => {
    const { data, error, status } = await useDelete(`/courses/delete/${id}`);
    console.log(status);
    if (status === 200) {
      window.location.reload();
    }
  };
  return (
    <>
      <CourseHeader setShowInCourse={setShowInCourse} />
      <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%] mt-5">
        <div className="mt-4 space-y-6">
          {data.map((course, index) => (
            <div
              key={index}
              className="border-t pt-4 first:border-t-0 first:pt-0"
            >
              <div className="flex justify-between items-center ">
                <div className="flex lg:flex-row flex-col items-center gap-5 w-full">
                  <div className="sm:h-[180px] h-[150px] sm:w-[230px] w-[190px]">
                    {course.coverImageUrl ? (
                      <Image
                        src={course.coverImageUrl}
                        alt="image"
                        height={200}
                        width={240}
                        className="object-cover h-full w-full rounded-2xl"
                      />
                    ) : (
                      <div className="bg-gray-300 h-full w-full rounded animate-pulse"></div>
                    )}
                  </div>
                  <div className=" text-start flex sm:flex-row flex-col justify-between w-full">
                    <div>
                      <div key={index} className="flex items-center">
                        {course.categories.map((category, index) => (
                          <p
                            className="text-sm text-blue-600 font-medium mb-2"
                            key={index}
                          >
                            {category} &nbsp;
                          </p>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                        {course.title}
                      </h3>
                      <h3 className="text-sm text-gray-900 leading-relaxed">
                        Instructor :{" "}
                        <span className="font-semibold">
                          {course.instructor}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-400 mt-2 flex items-center">
                        Lessons {course.lessons.length} &nbsp;
                        <Clock size={14} /> &nbsp;{course.estimatedDuration}{" "}
                        mins
                      </p>
                    </div>
                    <div className="mt-2">
                      <div className="flex gap-2 items-center">
                        <Link
                          href={`/teacher/add-lesson/${course._id}`}
                          className="text-nowrap py-1 px-2 border border-purple-600 rounded-md text-purple-600 hover:bg-purple-600 hover:text-white duration-200 text-sm"
                        >
                          Add Lesson
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-600 hover:bg-gray-100"
                          onClick={() => {
                            handleCourseDelete(course._id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="mt-2">
                      <Rating
                        name="simple-controlled"
                        value={course.rating}
                        readOnly
                      />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
