import { Mail } from "lucide-react";
import Link from "next/link";
import { AiFillFacebook } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

export default function Footer() {
    return (
      <footer className="bg-white text-gray-700 px-6 py-8 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <Link href={"/"}>
                    <img className=" md:w-[160px] w-[130px]" src={"/logo-on-light.png"} />
                  </Link>
              </div>
              <div className="mt-3 flex items-center space-x-2">
                <span className="text-purple-600"><Mail/></span>
                <a
                  href="mailto:mail@example.com"
                  className="text-purple-600 hover:underline"
                >
                  mail@example.com
                </a>
              </div>
            </div>
  
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900">Features</h4>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#" className="hover:text-gray-500">Quiz</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-500">Flash Card</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-500">Mock Test</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Articles</h4>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#" className="hover:text-gray-500">Our Blogs</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-500">Rehab Protocols</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Resources</h4>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#" className="hover:text-gray-500">About Us</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-500">Contact</a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Extra</h4>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#" className="hover:text-gray-500">Customer Support</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-500">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-gray-500">Terms & Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <div className="mt-8 border-t pt-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © Copyright 2024, PhysioHub All Rights Reserved
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://facebook.com" className="hover:text-gray-500 text-3xl" target="blank"><AiFillFacebook/></a>
              <a href="https://Linkedin.com" className="hover:text-gray-500 text-3xl" target="blank"><FaLinkedin/></a>
              <a href="https://twitter.com" className="hover:text-gray-500 text-3xl" target="blank"><FaTwitterSquare/></a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  