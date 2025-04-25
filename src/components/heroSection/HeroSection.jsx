"use client"
import React, { useEffect, useState } from "react";
import LottiePlayer from "../animations/LottiePlayer";
import happy from "../animations/data/Happy.json"
import Link from "next/link";
import Cookies from "js-cookie";

const HeroSection = (href) => {
    const [token, setToken] = useState(false)
    const [role, setRole] = useState("")
  
    useEffect(()=>{
      const token = Cookies.get("token")
      const role = Cookies.get("role")
      if(role){
        setRole(role)
      }
      if(token){
        setToken(true)
      }
    },[])
  
  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl px-10 md:py-24 py-24 text-center relative overflow-hidden w-full ">
      <svg
        width="626"
        height="551"
        viewBox="0 0 626 551"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 bottom-0"
      >
        <path
          opacity="0.5"
          d="M-133.035 520.315C387.216 -142.946 624.223 248.24 475 431C269.588 600.283 24.2837 128.055 188.142 -113.41C319.228 -306.583 514.289 -340.572 595.434 -333.411"
          stroke="url(#paint0_linear_276_4518)"
          strokeWidth="60"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_276_4518"
            x1="-147.328"
            y1="671.666"
            x2="290.274"
            y2="17.8033"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.570289" stopColor="#F3A2D9" stopOpacity="0.6" />
            <stop offset="1" stopColor="#F3A2D9" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="w-full">
        <p className="md:text-sm text-xs font-semibold uppercase">
          ⭐ TOP #1 EXPERT-LED COURSES
        </p>
        <h1 className="md:text-5xl text-2xl font-bold mt-2 leading-tight">
          Make physiohub your <br /> learning partner
        </h1>
        <p className="md:text-lg text-sm mt-3 opacity-80">
          Maximize your physiotherapy skills with our expert-led courses and
          tailored resources.
        </p>
        <div className="mt-6 flex md:flex-row flex-col gap-2 justify-center space-x-4">
          <Link href={`${token ? role == "user" ? "/user/dashboard" : "/teacher/course" :"/auth/login"}`} className="bg-white text-purple-700 md:px-5 px-2 py-2 rounded-full md:text-base text-xs font-medium shadow-md">
            Get Started
          </Link>
        </div>
      </div>
       <div className="absolute right-20 md:bottom-5 -bottom-15 md:w-[150px] w-[80px] h-[150px]">
                  <LottiePlayer animationFile={happy} width="100%" height="100%" />
                </div>
    </div>
  );
};

export default HeroSection;
