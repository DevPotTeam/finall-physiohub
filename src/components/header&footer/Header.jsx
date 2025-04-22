"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import logo from "../../../public/logo-on-light.png";
import { IoMdPerson } from "react-icons/io";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      <div>
        <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-800 flex items-center">
                  <Link href={"/"}>
                    <img className=" md:w-[160px] w-[130px]" src={"/logo-on-light.png"} />
                  </Link>
                </span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-purple-600">
                  Features{" "}
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600">
                  Articles
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600">
                  About Us
                </a>
                <a href="#" className="text-gray-700 hover:text-purple-600">
                  Contact
                </a>
              </div>

              {/* Buttons */}
              <div className="hidden md:flex space-x-4 items-center">
                <Link href={"/user/dashboard"}>
                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                    Student
                  </button>
                </Link>
                <Link href={"/teacher/quiz"}>
                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                   Teacher
                  </button>
                </Link>
                {isLoggedIn?(
                  <>
                  <Link href={"/user/dashboard"}>
                  <IoMdPerson className="text-purple-600 text-3xl"/>
                  </Link>
                  </>
                ):(
                  <>
                    <Link href={"/auth/login"}>
                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                    Login
                  </button>
                </Link>
                <Link
                  href={"/auth/signup"}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Sign In
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
              <a href="#" className="block text-gray-700 hover:text-purple-600">
                Features
              </a>
              <a href="#" className="block text-gray-700 hover:text-purple-600">
                Articles
              </a>
              <a href="#" className="block text-gray-700 hover:text-purple-600">
                About Us
              </a>
              <a href="#" className="block text-gray-700 hover:text-purple-600">
                Contact
              </a>
              <Link href={"/user/dashboard"} className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                Student
              </Link>
              <Link href={"/teacher/quiz"} className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                Teacher
              </Link>
              <Link href={"/auth/login"} className="w-full border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100">
                Login
              </Link>
              <Link href={"/auth/signup"} className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Sign In
              </Link>
            </div>
          )}
        </nav>
      </div>

    </>
  );
}

export default Header;
