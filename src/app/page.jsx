"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header&footer/Header.jsx";
import Footer from "../components/header&footer/Footer.jsx";
import Image from "next/image";
import { Card, CardContent } from "../components/ui/card";
import { Activity, BadgeCheck, Check, LineChart } from "lucide-react";
import { FaChartLine, FaFileAlt, FaHeadset, FaStar } from "react-icons/fa";
import Accordion from "../components/accordian/Accordion.jsx"
import BlogCard from "../components/blogCard/BlogCard.jsx"
import HeroSection from "../components/heroSection/HeroSection.jsx"
import LottiePlayer from "../components/animations/LottiePlayer";
import happy from "../components/animations/data/Happy.json";
import run from "../components/animations/data/Run.json";
import Link from "next/link";

const testimonials = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    company: "Tailwind",
    quote:
      "This app transformed our support operations. Response time reduced, leading to a rise in customer satisfaction.",
    name: "Frederic Hill",
    position: "Data Engineer at Tailwind",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/62/HubSpot_Logo.svg",
    company: "HubSpot",
    quote:
      "We experienced a significant reduction in support tickets thanks to the intuitive AI features. Support was prompt to assist us.",
    name: "Safaa Sampson",
    position: "Front-end at Hubspot",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    company: "Google",
    quote:
      "This software integrated seamlessly with our existing tools. It helped us manage a huge increase in customer inquiries.",
    name: "Brendan Buck",
    position: "CEO at Google",
  },
];

const TestimonialCard = ({ logo, company, quote, name, position }) => (
  <div className="bg-gray-50 p-6 rounded-lg max-w-sm text-center border md:min-h-[300px]">
    <img src={logo} alt={company} className="h-6  mb-4" />
    <p className="text-gray-700 mt-10">“{quote}”</p>
    <div className="mt-10 flex items-center justify-center gap-3">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">{position}</p>
      </div>
    </div>
  </div>
);

function Home() {
  const [animated, setAnimated] = useState(false);
  const [percent, setPercent] = useState(0);
  const directionRef = useRef(1);

  const data = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 80 },
    { label: "Mar", value: 60 },
    { label: "Apr", value: 30 },
    { label: "May", value: 45 },
    { label: "Jun", value: 70 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        let next = prev + directionRef.current;
        if (next >= 70) directionRef.current = -1;
        else if (next <= 0) directionRef.current = 1;
        return next;
      });
    }, 55); // Slower animation speed (30ms per step)

    return () => clearInterval(interval);
  }, []);

  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(true), 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Header />
      <div className="h-full w-full mt-10 relative overflow-hidden">
        <section className="relative bg-gradient-to-r from-gray-100 to-purple-100 py-16 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left z-10">
            <p className="text-sm text-purple-600 font-semibold">
              OVER 200+ RESOURCES
            </p>
            <h1 className="text-6xl font-bold text-gray-900 leading-tight mt-2">
              Master Your <br />{" "}
              <span className="text-purple-600">Physiotherapy</span> <br />{" "}
              Skills Now!
            </h1>
            <p className="text-gray-600 mt-4 max-w-md">
              Maximize your physiotherapy skills with our expert-led courses and
              tailored resources.
            </p>
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <Link
                href={"/auth/login"}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700"
              >
                Get Started
              </Link>
              <button className="border border-gray-400 px-6 py-3 rounded-lg font-medium text-gray-800 hover:bg-gray-200">
                Complete Quiz
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-end gap-3 md:w-[50%] w-full md:mt-0 mt-10">
            {/* First Column (takes max space) */}
            <div className="flex-1 flex flex-col justify-between items-end">
              <Card className="  md:max-w-[14rem] w-[11rem] rounded-[20px] shadow-md overflow-hidden mb-5 self-end">
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-sm font-medium text-black">
                        Over time
                      </p>
                      <h2 className="text-2xl font-bold text-black">$40K</h2>
                      <p className="text-xs text-gray-500">Last 7 days</p>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <LineChart className="h-5 w-5 text-purple-500" />

                      <div className="text-xs px-2 py-[2px] rounded-full bg-purple-100 text-purple-700 font-medium flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        25%
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-full relative rounded-lg overflow-hidden mt-10">
                    <img
                      src="/auth-activity.png"
                      alt="Muscle Stats"
                      // fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="md:w-[18rem] w-[15rem] rounded-[20px] bg-white shadow-md">
                <CardContent className="flex flex-col justify-between">
                  <h3 className="text-[#1F1F1F] text-[16px] font-semibold mb-6">
                    Performance over time
                  </h3>
                  <div className="flex justify-between items-end">
                    {data.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-[20px] h-[100px] bg-gray-200 rounded-sm overflow-hidden relative">
                          <div
                            className={`absolute bottom-0 w-full bg-[#F593D5] rounded-sm animate-bar`}
                            style={{
                              height: `${item.value}%`,
                              animationDelay: `${index * 0.2}s`,
                            }}
                          />
                        </div>
                        <span className="text-[12px] text-[#333]">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Second Column (fits content) */}
            <div className="flex-none flex mt-38 justify-center text-center md:w-1/2 ">
              {/* Your content here */}
              <Card className="md:w-[11rem] w-[10rem] rounded-[20px] shadow-md relative overflow-visible h-fit">
                <div className="absolute -top-17 -right-10 -translate-x-1/2 z-10">
                  {/* <img

                    src="/bird-ping.png" // Replace with your penguin image path
                    alt="Penguin"
                    width={100}
                    height={100}
                    // fill

                  /> */}
                  <LottiePlayer
                    animationFile={happy}
                    width="100px"
                    height="100px"
                  />
                </div>

                <CardContent className="flex flex-col items-center justify-center mt-4">
                  <h3 className="text-[22px] font-semibold text-gray-800 mb-4 w-full">
                    Quiz Score
                  </h3>

                  <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90"
                  >
                    <circle
                      stroke="#E5E7EB"
                      fill="transparent"
                      strokeWidth={stroke}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                    <circle
                      stroke="#34D1C4"
                      fill="transparent"
                      strokeWidth={stroke}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                  </svg>

                  <span className="absolute text-xl font-bold text-[#111] mt-11 ml-2">
                    {Math.round(percent)}%
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
          <svg
            width="836"
            height="860"
            viewBox="0 0 836 860"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 bottom-0 "
          >
            <path
              opacity="0.5"
              d="M35 908.5C751.677 97.5972 1097 643 892 866C616 1067.5 266.141 417.608 494.316 120.471C676.856 -117.24 929.408 -146.123 1032.87 -130.839"
              stroke="url(#paint0_linear_206_776)"
              strokeWidth="70"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_206_776"
                x1="99.5879"
                y1="803.053"
                x2="625.361"
                y2="96.8963"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.708099"
                  stopColor="#7240FD"
                  stopOpacity="0.16"
                />
                <stop offset="1" stopColor="#7240FD" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </section>

        <section className="py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-12">
          <div className="text-center">
            <p className="text-sm text-purple-600 font-semibold">
              OVER 200+ RESOURCES
            </p>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mt-2">
              Transform Your <br />
              Physiotherapy Learning
            </h1>
            <p className="text-gray-600 mt-4 max-w-md justify-self-center">
              Physiohub is a learning platform designed to help budding
              physiotherapists perfect their craft and become industry experts.
            </p>
          </div>
          <div className=" grid md:grid-cols-2 grid-cols-1 items-center gap-20">
            {/* Left Image Card */}
            <div className=" text-center md:text-left">
              <p className="text-xs font-semibold text-purple-600">
                NO SIGN UP REQUIRED
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Learn with Flash Cards
              </h2>
              <p className="text-gray-600 mt-4">
                Master key concepts and terms with our interactive flashcards. A
                perfect tool for quick revisions and reinforcing your learning,
                making complex information easy to remember.
              </p>
              <div className="mt-6 mb-10 space-y-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  1000+ pre-made flashcards
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  Effortless Memorization with spaced repetition
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  Spaced repetition
                </p>
              </div>
            </div>

            {/* Right Text Section */}
            <div className="bg-purple-100 p-6 rounded-xl shadow-lg flex justify-center items-center overflow-hidden relative">
              <div className="bg-white p-3 rounded-xl shadow-md w-78">
                <svg
                  width="836"
                  height="760"
                  viewBox="0 0 836 860"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -right-50 -bottom-60 rotate-[160deg]"
                >
                  <path
                    opacity="0.5"
                    d="M35 908.5C751.677 97.5972 1097 643 892 866C616 1067.5 266.141 417.608 494.316 120.471C676.856 -117.24 929.408 -146.123 1032.87 -130.839"
                    stroke="url(#paint0_linear_206_776)"
                    strokeWidth="70"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_206_776"
                      x1="99.5879"
                      y1="803.053"
                      x2="625.361"
                      y2="96.8963"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop
                        offset="0.708099"
                        stopColor="#7240FD"
                        stopOpacity="0.16"
                      />
                      <stop offset="1" stopColor="#7240FD" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <Image
                  src="/lungs.png"
                  alt="Flashcard"
                  width={230}
                  height={160}
                  className="rounded-lg w-full h-[200px]"
                />
                <p className=" text-[#9810FA] mt-2 flex items-center gap-2">
                  <BadgeCheck className="text-[10px]" />
                  Admin Verified
                </p>
                <h3 className="text-lg font-semibold my-4">
                  Musculoskeletal Physiology
                </h3>
                <div className="flex gap-1">
                  <p className="text-gray-700 px-2 py-1 rounded text-xs border-2 border-gray-200">
                    Muscle
                  </p>
                  <p className="text-gray-700 px-2 py-1 rounded text-xs border-2 border-gray-200">
                    Cardiovascular
                  </p>
                  <p className="text-gray-700 px-2 py-1 rounded text-xs border-2 border-gray-200">
                    Ribs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" grid md:grid-cols-2 grid-cols-1 items-center gap-20 mt-38">
            {/* Right Text Section */}
            <div className=" text-center md:text-left">
              <p className="text-xs font-semibold text-[#FF7F04]">
                MULTIPLE CHOICE QUIZZES
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Interesting quiz
              </h2>
              <p className="text-gray-600 mt-4">
                Designed exclusively for aspiring and practicing
                physiotherapists, our comprehensive quiz are crafted to enhance
                your knowledge, skills, and confidence.
              </p>
              <div className="mt-6 mb-10 space-y-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-[#FF7F04] rounded-full"></span>{" "}
                  Time-based quizzes to improve your quick thinking and
                  diagnostics
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-[#FF7F04] rounded-full"></span>{" "}
                  Personalized Dashboard
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-[#FF7F04] rounded-full"></span>{" "}
                  Accessible anywhere anytime
                </p>
              </div>
            </div>

            {/* Left Image Card */}
            <div className="bg-orange-50 p-6 rounded-xl shadow-lg flex justify-center items-center relative overflow-hidden">
              <svg
                width="620"
                height="580"
                viewBox="0 0 620 580"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -right-0 -bottom-0 rotate-[360deg] z-[20]"
              >
                <path
                  opacity="0.5"
                  d="M-238 725.5C478.677 -85.4025 824 460 619 683C343 884.5 -6.85872 234.608 221.316 -62.5284C403.856 -300.24 656.408 -329.122 759.867 -313.839"
                  stroke="url(#paint0_linear_276_3715)"
                  strokeWidth="70"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_276_3715"
                    x1="-173.412"
                    y1="620.054"
                    x2="352.361"
                    y2="-86.1035"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.708099"
                      stopColor="#FF7F04"
                      stopOpacity="0.2"
                    />
                    <stop offset="1" stopColor="#FF7F04" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="bg-white md:p-6 p-2 rounded-2xl shadow-lg md:w-80 w-62 mx-auto">
                {/* User Info */}
                <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
                  <div>
                    <h3 className="md:text-lg text-base font-semibold">Jennifer</h3>
                    <p className="md:text-sm text-xs text-gray-500">Time remaining</p>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-100 md:px-3 px-2 py-1 rounded-full">
                    <FaStar className="text-orange-500" />
                    <span className="md:text-sm text-xs font-medium">24 Points</span>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white mt-6 p-4 rounded-xl shadow-md flex items-center gap-1 md:w-[360px] w-[270px] md:ms-[-45px] ms-[-17px]">
                  <p className="text-gray-600 font-medium md:text-sm text-xs">A.</p>
                  <div className="w-full bg-[#FF7F04] md:h-3 h-2 rounded-full mt-2 mb-2"></div>
                  <div className="w-2/3 bg-[#FF7F04] md:h-3 h-2 rounded-full"></div>
                  <div className="mt-3 flex justify-end items-center">
                    <div className="w-4 h-4 bg-[#FFA44D] rounded-full flex items-center justify-center font-bold text-xs">
                      <Check className="text-white text-sm " />
                    </div>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white mt-2 p-3 rounded-xl shadow-md flex items-center gap-1">
                  <p className="text-[#7240fd8d] font-medium text-sm">B.</p>
                  <div className="w-full bg-gray-400 md:h-3 h-2 rounded-full mt-2 mb-2"></div>
                  <div className="w-2/3 bg-gray-400 md:h-3 h-2 rounded-full"></div>
                </div>
                <div className="bg-white mt-2 p-3 rounded-xl shadow-md flex items-center gap-1">
                  <p className="text-[#7240fd8d] font-medium text-sm">C.</p>
                  <div className="w-2/3 bg-gray-400 md:h-3 h-2 rounded-full mt-2 mb-2"></div>
                  <div className="w-full bg-gray-400 md:h-3 h-2 rounded-full"></div>
                </div>
                <div className="bg-white mt-2 p-3 rounded-xl shadow-md flex items-center gap-1">
                  <p className="text-[#7240fd8d] font-medium text-sm">B.</p>
                  <div className="w-full bg-gray-400 md:h-3 h-2 rounded-full mt-2 mb-2"></div>
                  <div className="w-2/3 bg-gray-400 md:h-3 h-2 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className=" grid md:grid-cols-2 grid-cols-1 items-center gap-20 mt-38">
            {/* Right Text Section */}
            <div className=" text-center md:text-left">
              <p className="text-xs font-semibold text-[#2CCFB9]">
                INFORMATIVE ARTICLES
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Informative Blogs
              </h2>
              <p className="text-gray-600 mt-4">
                Stay updated with the latest trends, research, and best
                practices in physiotherapy. Our blogs are written by experienced
                professionals, providing valuable insights and continuous
                learning opportunities.
              </p>
              <div className="mt-6 mb-10 space-y-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-[#2CCFB9] rounded-full"></span>{" "}
                  75+ informative articles and rehab protocols
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-[#2CCFB9] rounded-full"></span> No
                  sign up required, access our blog completely free
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-[#2CCFB9] rounded-full"></span>{" "}
                  Complete guide to physio
                </p>
              </div>
            </div>

            {/* Left Image Card */}
            <div className="bg-purple-100 md:h-[450px] h-[350px] p-6 rounded-xl shadow-lg flex flex-col justify-center items-center relative overflow-hidden">
              <svg
                width="836"
                height="760"
                viewBox="0 0 836 860"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -right-0 -bottom-0 rotate-[290deg] "
              >
                <path
                  opacity="0.5"
                  d="M35 908.5C751.677 97.5972 1097 643 892 866C616 1067.5 266.141 417.608 494.316 120.471C676.856 -117.24 929.408 -146.123 1032.87 -130.839"
                  stroke="url(#paint0_linear_206_776)"
                  strokeWidth="70"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_206_776"
                    x1="99.5879"
                    y1="803.053"
                    x2="625.361"
                    y2="96.8963"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      offset="0.708099"
                      stopColor="#7240FD"
                      stopOpacity="0.16"
                    />
                    <stop offset="1" stopColor="#7240FD" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              {/* User Info */}
              <svg
                width="620"
                height="376"
                viewBox="0 0 620 376"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_276_3807)">
                  <rect
                    x="90"
                    y="80"
                    width="440"
                    height="184"
                    rx="16"
                    fill="white"
                    shapeRendering="crispEdges"
                  />
                  <rect x="102" y="92" width="160" height="160" rx="8" />
                  <rect
                    x="282"
                    y="98"
                    width="83"
                    height="12"
                    rx="6"
                    fill="url(#paint0_linear_276_3807)"
                  />
                  <rect
                    x="282"
                    y="126"
                    width="52"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="339"
                    y="126"
                    width="167"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="282"
                    y="144"
                    width="144"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="431"
                    y="144"
                    width="60"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="282"
                    y="162"
                    width="52"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="339"
                    y="162"
                    width="106"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <g clipPath="url(#clip0_276_3807)">
                    <rect x="282" y="222" width="27" height="40" />
                  </g>
                  <path
                    d="M313.072 240V228.56H317.216C320.368 228.56 322.304 230.608 322.304 234.288C322.304 237.968 320.368 240 317.216 240H313.072ZM314.512 229.84V238.72H317.216C320.128 238.72 320.864 236.528 320.864 234.288C320.864 232.048 320.128 229.84 317.216 229.84H314.512ZM327.546 231.616C327.85 231.616 328.074 231.632 328.298 231.664V232.944H328.266C326.49 232.656 325.257 233.904 325.257 235.648V240H323.977V231.84H325.257V233.456H325.289C325.721 232.384 326.378 231.616 327.546 231.616ZM329.373 240.112C328.877 240.112 328.493 239.776 328.493 239.232C328.493 238.704 328.877 238.352 329.373 238.352C329.869 238.352 330.253 238.704 330.253 239.232C330.253 239.776 329.869 240.112 329.373 240.112ZM342.18 237.136H337.14L336.132 240H334.644L338.868 228.56H340.468L344.676 240H343.188L342.18 237.136ZM337.62 235.856H341.716L339.684 229.888H339.652L337.62 235.856ZM345.931 228.56H347.211V240H345.931V228.56ZM352.656 239.104C354.288 239.104 354.896 238.048 355.04 237.488H356.32C355.904 239.008 354.736 240.224 352.704 240.224C350.224 240.224 348.72 238.48 348.72 235.92C348.72 233.2 350.256 231.616 352.64 231.616C355.2 231.616 356.448 233.36 356.448 236.256H350C350 237.728 350.88 239.104 352.656 239.104ZM352.64 232.736C351.104 232.736 350 233.824 350 235.136H355.168C355.168 233.824 354.176 232.736 352.64 232.736ZM356.957 231.84H358.477L360.589 234.96H360.621L362.733 231.84H364.253L361.373 235.824L364.541 240H363.021L360.621 236.672H360.589L358.205 240H356.685L359.837 235.824L356.957 231.84ZM370.433 233.92C370.433 233.28 370.081 232.736 368.769 232.736C367.217 232.736 366.705 233.184 366.625 234.368H365.345C365.425 232.8 366.401 231.616 368.769 231.616C370.321 231.616 371.713 232.224 371.713 234.192V238.16C371.713 238.8 371.825 239.152 372.641 239.056V239.952C372.305 240.064 372.129 240.08 371.889 240.08C371.121 240.08 370.657 239.872 370.433 238.976H370.401C369.889 239.744 368.977 240.224 367.633 240.224C365.985 240.224 364.945 239.28 364.945 237.904C364.945 236.048 366.321 235.568 368.433 235.168C369.809 234.912 370.433 234.736 370.433 233.92ZM367.761 239.104C369.281 239.104 370.433 238.416 370.433 236.848V235.488C370.193 235.728 369.409 235.952 368.545 236.128C366.961 236.464 366.225 236.864 366.225 237.84C366.225 238.64 366.705 239.104 367.761 239.104ZM377.757 231.616C379.245 231.616 380.493 232.432 380.493 234.304V240H379.213V234.624C379.213 233.568 378.717 232.736 377.437 232.736C375.997 232.736 375.037 233.648 375.037 234.912V240H373.757V231.84H375.037V232.816H375.069C375.501 232.24 376.365 231.616 377.757 231.616ZM388.179 228.56H389.459V240H388.179V238.992H388.147C387.667 239.616 386.899 240.224 385.587 240.224C383.539 240.224 381.907 238.608 381.907 235.92C381.907 233.232 383.539 231.616 385.587 231.616C386.899 231.616 387.667 232.192 388.147 232.896H388.179V228.56ZM385.715 239.104C387.235 239.104 388.179 237.84 388.179 235.92C388.179 234 387.235 232.736 385.715 232.736C384.035 232.736 383.187 234.32 383.187 235.92C383.187 237.52 384.035 239.104 385.715 239.104ZM394.846 239.104C396.478 239.104 397.086 238.048 397.23 237.488H398.51C398.094 239.008 396.926 240.224 394.894 240.224C392.414 240.224 390.91 238.48 390.91 235.92C390.91 233.2 392.446 231.616 394.83 231.616C397.39 231.616 398.638 233.36 398.638 236.256H392.19C392.19 237.728 393.07 239.104 394.846 239.104ZM394.83 232.736C393.294 232.736 392.19 233.824 392.19 235.136H397.358C397.358 233.824 396.366 232.736 394.83 232.736ZM403.634 231.616C403.938 231.616 404.162 231.632 404.386 231.664V232.944H404.354C402.578 232.656 401.346 233.904 401.346 235.648V240H400.066V231.84H401.346V233.456H401.378C401.81 232.384 402.466 231.616 403.634 231.616Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_276_3807"
                    x="-5.58109"
                    y="0.418909"
                    width="631.162"
                    height="375.162"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="4.41891"
                      operator="erode"
                      in="SourceAlpha"
                      result="effect1_dropShadow_276_3807"
                    />
                    <feOffset dy="16" />
                    <feGaussianBlur stdDeviation="50" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.16875 0 0 0 0 0.27 0 0 0 0 0.37125 0 0 0 0.2 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_276_3807"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_276_3807"
                      result="shape"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_276_3807"
                    x1="323.5"
                    y1="98"
                    x2="323.937"
                    y2="112.425"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4CDBC8" />
                    <stop offset="1" stopColor="#0CC2AA" />
                  </linearGradient>
                  <clipPath id="clip0_276_3807">
                    <rect
                      x="282"
                      y="222"
                      width="24"
                      height="24"
                      rx="12"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="440"
                height="184"
                viewBox="0 0 440 184"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="440" height="184" rx="16" fill="white" />
                <rect
                  x="12"
                  y="12"
                  width="160"
                  height="160"
                  rx="8"
                  fill="#F2F5F8"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M87.3334 83.3337C85.1243 83.3337 83.3334 85.1245 83.3334 87.3337C83.3334 89.5428 85.1243 91.3337 87.3334 91.3337C89.5426 91.3337 91.3334 89.5428 91.3334 87.3337C91.3334 85.1245 89.5426 83.3337 87.3334 83.3337Z"
                  fill="url(#paint0_linear_276_3786)"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M86.345 78.667H97.6551C98.7284 78.667 99.6143 78.667 100.336 78.7259C101.085 78.7872 101.774 78.9186 102.421 79.2483C103.425 79.7596 104.241 80.5755 104.752 81.579C105.082 82.2262 105.213 82.9151 105.274 83.6646C105.333 84.3862 105.333 85.272 105.333 86.3454V95.9861L105.333 96.0001V97.6552C105.334 98.7285 105.334 99.6143 105.275 100.336C105.239 100.774 105.179 101.192 105.069 101.593C105.015 101.791 104.949 101.986 104.867 102.177C104.831 102.259 104.793 102.341 104.752 102.422C104.241 103.425 103.425 104.241 102.421 104.752C101.774 105.082 101.085 105.213 100.336 105.275C99.6143 105.334 98.7285 105.334 97.6552 105.334H86.3333C86.1751 105.334 86.021 105.334 85.8709 105.333H85.1923C84.8318 105.334 84.4775 105.334 84.1922 105.308L84.163 105.306C83.9887 105.298 83.8226 105.288 83.6643 105.275C82.9149 105.213 82.2259 105.082 81.5788 104.752C80.5753 104.241 79.7594 103.425 79.248 102.422C78.9183 101.774 78.7869 101.086 78.7257 100.336C78.6667 99.6145 78.6667 98.7287 78.6667 97.6554V86.3453C78.6667 85.272 78.6667 84.3861 78.7257 83.6646C78.7869 82.9151 78.9183 82.2262 79.248 81.579C79.7594 80.5755 80.5753 79.7596 81.5788 79.2483C82.2259 78.9186 82.9149 78.7872 83.6643 78.7259C84.3859 78.667 85.2717 78.667 86.345 78.667ZM102.667 86.4003V92.7811L99.7547 89.869C99.5168 89.6311 99.2851 89.3993 99.0728 89.2191C98.8397 89.0212 98.5438 88.8084 98.1575 88.6829C97.622 88.5089 97.045 88.5089 96.5094 88.6829C96.1232 88.8084 95.8273 89.0212 95.5942 89.2191C95.3819 89.3993 95.1502 89.6311 94.9123 89.8691L83.5098 101.272C83.2549 101.526 83.0043 101.777 82.8204 101.997C82.7636 102.064 82.687 102.158 82.6093 102.276C82.19 102.019 81.8484 101.651 81.6241 101.211C81.5178 101.002 81.4312 100.703 81.3835 100.119C81.3345 99.5188 81.3334 98.7424 81.3334 97.6003V86.4003C81.3334 85.2582 81.3345 84.4818 81.3835 83.8817C81.4312 83.2972 81.5178 82.9982 81.6241 82.7897C81.8797 82.2879 82.2877 81.88 82.7894 81.6243C82.998 81.5181 83.2969 81.4315 83.8815 81.3837C84.4816 81.3347 85.258 81.3337 86.4001 81.3337H97.6001C98.7422 81.3337 99.5186 81.3347 100.119 81.3837C100.703 81.4315 101.002 81.5181 101.211 81.6243C101.712 81.88 102.12 82.2879 102.376 82.7897C102.482 82.9982 102.569 83.2972 102.617 83.8817C102.666 84.4818 102.667 85.2582 102.667 86.4003Z"
                  fill="url(#paint1_linear_276_3786)"
                />
                <rect
                  x="192"
                  y="18"
                  width="83"
                  height="12"
                  rx="6"
                  fill="#DEE5ED"
                />
                <rect
                  x="192"
                  y="46"
                  width="134"
                  height="10"
                  rx="5"
                  fill="#DEE6ED"
                />
                <rect
                  x="331"
                  y="46"
                  width="60"
                  height="10"
                  rx="5"
                  fill="#DEE6ED"
                />
                <rect
                  x="192"
                  y="64"
                  width="52"
                  height="10"
                  rx="5"
                  fill="#DEE6ED"
                />
                <rect
                  x="249"
                  y="64"
                  width="167"
                  height="10"
                  rx="5"
                  fill="#DEE6ED"
                />
                <rect
                  x="192"
                  y="82"
                  width="52"
                  height="10"
                  rx="5"
                  fill="#DEE6ED"
                />
                <rect
                  x="249"
                  y="82"
                  width="106"
                  height="10"
                  rx="5"
                  fill="#DEE6ED"
                />
                <g clipPath="url(#clip0_276_3786)">
                  <rect x="192" y="142" width="27" height="40" fill="#DEE5ED" />
                </g>
                <rect
                  x="222"
                  y="149"
                  width="72"
                  height="10"
                  rx="5"
                  fill="#DEE5ED"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_276_3786"
                    x1="92.0001"
                    y1="78.667"
                    x2="98.4413"
                    y2="109.403"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4CDBC8" />
                    <stop offset="1" stopColor="#0CC2AA" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_276_3786"
                    x1="92.0001"
                    y1="78.667"
                    x2="98.4413"
                    y2="109.403"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4CDBC8" />
                    <stop offset="1" stopColor="#0CC2AA" />
                  </linearGradient>
                  <clipPath id="clip0_276_3786">
                    <rect
                      x="192"
                      y="142"
                      width="24"
                      height="24"
                      rx="12"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-12 bg-[#F6F9FC]">
          <div className="text-center">
            <p className="text-sm text-purple-600 font-semibold">
              YOUR OWN DASHBOARD
            </p>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mt-2">
              The Tools You Really Need
            </h1>
            <p className="text-gray-600 mt-4 max-w-md justify-self-center">
              Physiohub is a learning platform designed to help budding
              physiotherapists perfect their craft and become industry experts.
            </p>
          </div>
          <div className="w-full h-full relative ">

          <Image
            src={"/dashboard.png"}
            alt="image"
            width={1000}
            height={100}
            className="md:w-[90%] w-[99%x] h-full mx-auto"
            />
          <div className="absolute md:bottom-10 -bottom-12 md:right-20 right-0 md:w-[120px] w-[70px] h-[120px]">
            <LottiePlayer animationFile={run} width="100%" height="100%" />
          </div>
            </div>
        </section>

        <section className="py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-12">
          <div className="text-center">
            <p className="text-sm text-purple-600 font-semibold">
              Testimonials
            </p>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mt-2">
              Hear from Our Happy Users
            </h1>
            <p className="text-gray-600 mt-4 max-w-md justify-self-center">
              Physiohub is a learning platform designed to help budding
              physiotherapists perfect their craft and become industry experts.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center p-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </section>

        <section className="py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-12 bg-[#F6F9FC]">
              <Accordion/>
        </section>

        <section className="py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-12 bg-[#F6F9FC]">
              <BlogCard/>
        </section>

        <section className="py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-12 bg-[#F6F9FC]">
              <HeroSection/>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
