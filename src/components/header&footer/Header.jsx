"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import logo from "../../../public/logo-on-light.png";
import { IoMdPerson } from "react-icons/io";
import Cookies from "js-cookie";

function Header({scrollToSection}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true);
    }
    const role = JSON.parse(localStorage.getItem("user"))?.role
    if(role){
      setRole(role)
    }
  });

  return (
    <>
      <div>
        <nav className="bg-white shadow-sm w-full fixed top-0 left-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-800 flex items-center">
                  <Link href={"/"}>
                    <img
                      className=" md:w-[160px] w-[130px]"
                      src={"/logo-on-light.png"}
                    />
                  </Link>
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                <button onClick={()=>{scrollToSection("about")}} className="text-gray-700 hover:text-purple-600">
                  About
                </button>
                <button onClick={()=>{scrollToSection("features")}}  className="text-gray-700 hover:text-purple-600">
                  Features{" "}
                </button>
                <button onClick={()=>{scrollToSection("faq")}} className="text-gray-700 hover:text-purple-600">
                  FAQ
                </button>
                <button onClick={()=>{scrollToSection("course")}} className="text-gray-700 hover:text-purple-600">
                  Courses
                </button>
              </div>

              {/* Buttons */}
              <div className="hidden md:flex space-x-4 items-center">
                {/* <Link href={"/user/dashboard"}>
                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                    Student
                  </button>
                </Link>
                <Link href={"/teacher/quiz"}>
                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                   Teacher
                  </button>
                </Link> */}
                {isLoggedIn ? (

                  <Link href={`${role == "user" ? "/user/dashboard" : (role == "teacher" || role == "instructor") ? "/teacher/course" : false} `}>
                    <IoMdPerson className="text-[#7240fd] text-3xl" />
                  </Link> 
                ) : (
                  <>
                    <Link href={"/auth/login"}>
                      <button className="border border-[#7240fd] text-[#7240fd] px-4 py-2 rounded-lg hover:bg-purple-100">
                        Login
                      </button>
                    </Link>
                    <Link
                      href={"/auth/signup"}
                      className="bg-[#7240fd] text-white px-4 py-2 rounded-lg hover:bg-[#5c40fd]"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-700 focus:outline-none"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-white shadow-md p-4 space-y-4 flex flex-col">
              <button onClick={()=>{scrollToSection("about")}} className="block text-gray-700 hover:text-purple-600">
                About
              </button>
              <button onClick={()=>{scrollToSection("features")}} className="block text-gray-700 hover:text-purple-600">
                Features
              </button>
              <button onClick={()=>{scrollToSection("faq")}} className="block text-gray-700 hover:text-purple-600">
                FAQ
              </button>
              <button onClick={()=>{scrollToSection("course")}} className="block text-gray-700 hover:text-purple-600">
                Courses
              </button>
              {/* <Link href={"/user/dashboard"} className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                Student
              </Link>
              <Link href={"/teacher/quiz"} className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                Teacher
              </Link> */}
              {isLoggedIn ? (
                <Link
                href={`${role == "user" ? "/user/dashboard" : role == "teacher" || role == "instructor"&&"/teacher/course"}`}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Profile
              </Link>
              ) : (
                <>
                  <Link
                    href={"/auth/login"}
                    className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100"
                  >
                    Login
                  </Link>
                  <Link
                    href={"/auth/signup"}
                    className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </nav>
      </div>
    </>
  );
}

export default Header;
