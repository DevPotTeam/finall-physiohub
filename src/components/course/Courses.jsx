"use client";
import Image from "next/image.js";
import { Button } from "@/components/ui/button.jsx";
import { Trash2, Edit, Sparkles, PlusCircle, Clock } from "lucide-react";
import CourseHeader from "@/components/course/CourseHeader";
import Link from "next/link";
import useDelete from "@/hooks/useDelete";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";

export default function Courses({ setShowInCourse, initialData }) {
  const [courses, setCourses] = useState(initialData || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCourses(initialData || []);
  }, [initialData]);

  const handleCourseDelete = async (id) => {
    setLoading(true);
    try {
      const { status } = await useDelete(`/courses/delete/${id}`);
      if (status === 200) {
        setCourses(prev => prev.filter(course => course._id !== id));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CourseHeader setShowInCourse={setShowInCourse} />
      <div className="p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%]">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Courses Found
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't created any courses yet. Start by creating your first one!
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            {courses.map((course, index) => (
              <div
                key={course._id}
                className="border-t pt-4 first:border-t-0 first:pt-0"
              >
                <div className="flex justify-between items-center">
                  <div className="flex lg:flex-row flex-col items-center gap-5 w-full">
                    <div className="sm:h-[180px] h-[150px] sm:w-[230px] w-[190px]">
                      {course.coverImageUrl ? (
                        <Image
                          src={course.coverImageUrl}
                          alt="course cover"
                          height={200}
                          width={240}
                          className="object-cover h-full w-full rounded-2xl"
                        />
                      ) : (
                        <div className="bg-gray-300 h-full w-full rounded animate-pulse"></div>
                      )}
                    </div>
                    <div className="text-start flex sm:flex-row flex-col justify-between w-full">
                      <div>
                        <div className="flex items-center">
                          {course.categories?.map((category, i) => (
                            <p
                              className="text-sm text-blue-600 font-medium mb-2"
                              key={i}
                            >
                              {category} &nbsp;
                            </p>
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-2 flex items-center">
                          Lessons {course.lessons?.length || 0} &nbsp;
                          <Clock size={14} /> &nbsp;{course.estimatedDuration || 0} mins
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
                            onClick={() => handleCourseDelete(course._id)}
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Link href={`/teacher/course/update/${course._id}`}>
                            <Button
                              variant="outline"
                              size="icon"
                              className="border-gray-300 text-gray-600 hover:bg-gray-100"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                        <div className="mt-2">
                          <Rating
                            name="simple-controlled"
                            value={course.rating || 0}
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
        )}
      </div>
    </>
  );
}