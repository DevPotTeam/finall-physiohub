"use client"
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ApiFetchRequest } from "@/axios/apiRequest";

const CourseCard = ({ title, description, coverImageUrl, instructor }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden p-2 border">
    <div className="md:min-h-52 h-40 bg-gradient-to-b from-gray-200 to-purple-200 rounded-lg mb-3 relative p-2">
      {coverImageUrl && (
        <img 
          src={coverImageUrl} 
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      )}
    </div>
    <p className="text-sm text-purple-600 font-medium">{instructor}</p>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
  </div>
);

const BlogSection = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true);
    }
    const role = JSON.parse(localStorage.getItem("user"))?.role;
    if (role) {
      setRole(role);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await ApiFetchRequest("/courses/getAllCourses");
        if (response && response.data) {
          // Get random 3 courses
          const allCourses = response.data.data;
          const randomCourses = allCourses
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
          setCourses(randomCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-6 w-full">
      <div className="flex sm:flex-row flex-col sm:gap-0 gap-2 justify-between items-center mb-6">
        <div>
          <h2 className="text-purple-600 text-sm font-semibold uppercase">
            Courses
          </h2>
          <h1 className="text-4xl font-bold mt-1">Explore all our Courses</h1>
        </div>
        <Link
          href={`${
            !isLoggedIn
              ? "/auth/login"
              : role == "user"
              ? "/user/courses"
              : role == "teacher" || role == "instructor"
              ? "/teacher/course"
              : ""
          }`}
          className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
        >
          Explore
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeleton
          Array(3).fill(0).map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-2 border animate-pulse">
              <div className="md:min-h-52 h-40 bg-gray-200 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))
        ) : (
          courses.map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              description={course.description}
              coverImageUrl={course.coverImageUrl}
              instructor={course.instructor?.name || "Anonymous"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BlogSection;
