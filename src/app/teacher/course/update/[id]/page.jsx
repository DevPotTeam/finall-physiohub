"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Trash2,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input.jsx";
import UpdateCourseHeader from "@/components/course/UpdateCourseHeader"
import useImagePost from "@/hooks/useImagePost"
import usePost from "@/hooks/usePost"
import Image from "next/image";
import useGet from "@/hooks/useGet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textArea";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import usePut from "@/hooks/usePut"

export default function UpdateCourse({params}) {
  const router = useRouter()
  const {id} = React.use(params)
   const [data, setData] = useState({})
  const [isFree, setIsFree] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    categories: "",
    prerequisites: "",
    isFree: true,
    price: 0,
    estimatedDuration: "",
    coverImageUrl :null,
  });

  const fetch = async() =>{
    const {data, status} = await useGet(`/courses/get/${id}`)
    if(status == 200){
      setData(data)
    }
  }
  
  useEffect(()=>{
    fetch()
  },[])

  
useEffect(() => {
    setFormData({
      title: data.title || "",
      description: data.description || "",
      instructor: data.instrutor || "",
      categories: data.categories || "",
      prerequisites: data.prerequisites || "",
      isFree: data.isFree || true,
      price: data.price || "",
      estimatedDuration: data.estimatedDuration || 0,
      coverImageUrl :data.coverImageUrl || null,
    });
}, [data]);


  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name === "isFree"){
      
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (name === "categories" || name === "prerequisites") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
 
  

  const handleUpload = async (e) => {
    setLoading(true)
    const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);

    const {data, error, status} = await useImagePost(`/courses/upload-image`, formData)
    if(data){
      setFormData((prev)=>({...prev, coverImage : data}))
      setLoading(false)
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleUpload(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };


  const toggleQuestion = (index) => {
    setQuestions(
      questions.map((q, i) => (i === index ? { ...q, open: !q.open } : q))
    );
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleCourseUpdate = async () => {
    const {data, error, status} = await usePut(`/courses/update/${id}`, formData)
    if(status == 201){
      router.push(`/teacher/course`)
    }
    if(error){
      setError(error)
    }
  };

  return (
    <>
      <UpdateCourseHeader handleCourseUpdate={handleCourseUpdate} id={id}/>
      {error&&<p className="text-red-500 mb-3">{error}</p>}
      <div className=" p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%]">
              {/*  Title */}
              <div className="mb-4 ">
                <label className="block text-gray-700 font-semibold">Title</label>
                <Input
                  placeholder="Write question here"
                  className="my-5"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
      
              {/* Thumbnail  */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Description
                </label>
                <Input
                  placeholder="Write description here"
                  className="my-5"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                />
              </div>
      
              {/* Instructor  */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Instructor Name
                </label>
                <Input
                  placeholder="Write instructor name here"
                  className="my-5"
                  name="instructor"
                  onChange={handleChange}
                  value={formData.instructor}
                />
              </div>
      
              {/* Categories  */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Categories
                </label>
                <p className="text-sm text-gray-600 font-semibold">
                  Type Categories Saperated by coma " , "
                </p>
                <Input
                  placeholder="Categories e.g. Orthopedic, Neurological, Pediatric "
                  className="my-5"
                  name="categories"
                  onChange={handleChange}
                  value={formData.categories}
                />
              </div>
      
              {/* Prerequisites  */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Prerequisites
                </label>
                <p className="text-sm text-gray-600 font-semibold">
                  Type Prerequisites Saperated by coma " , "
                </p>
                <Input
                  placeholder="Prerequisites e.g. Basic Human Anatomy, Prior Clinical Experience, Understanding of Medical Terminology"
                  className="my-5"
                  name="prerequisites"
                  onChange={handleChange}
                  value={formData.prerequisites}
                />
              </div>
      
              {/* Cover Image  */}
              <div className="mb-4 flex gap-2 items-start">
                <div>
                  <label className="block text-gray-700 font-semibold">Course</label>
                  <select
                    name="isFree"
                    id=""
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                    onChange={(e)=>{handleChange(e)}}
                    value={formData.isFree}
                  >
                    <option value={"true"}>Free</option>
                    <option value={"false"}>Paid</option>
                  </select>
                </div>
                
                  {!formData.isFree&&<div className="mb-4 ">
                    <Input
                      placeholder="Price"
                      className="my-5"
                      name="price"
                      onChange={handleChange}
                      value={formData.price}
                    />
                  </div>}
                
              </div>
      
              {/* Duration  */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Estimated Duration (in Minutes)
                </label>
                <Input
                  type="number"
                  placeholder="Write Estimated Duration"
                  className="my-5"
                  name="estimatedDuration"
                  onChange={handleChange}
                  value={formData.estimatedDuration}
                />
              </div>
      
              {/* Thumbnail Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Cover Image
                </label>
                {!formData.coverImageUrl?<div
                  className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 "
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {loading? <div className="w-12 h-12 border-4 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>:<label className="ud-btn btn-white text-center cursor-pointer">
                  <div className="icon mb5">
                    <Upload className="w-6 h-6 mb-2 text-purple-600 justify-self-center " />
                  </div>
                  <h4 className="title fz17 mb1">
                    Upload/Drag photos of your property
                  </h4>
                  <p className="text fz-10 mb10">
                    Photos must be JPEG or PNG format and at least 2048x768
                  </p>
                  
                    Browse Files
                    <input
                      ref={fileInputRef}
                      id="fileInput"
                      type="file"
                      name="images"
                      multiple
                      className="ud-btn btn-white"
                      onChange={handleUpload}
                      style={{ display: "none" }}
                      required
                    />
                  </label>}
                </div> : <div>
                  <Image src={formData.coverImageUrl} height={400} width={200} alt="cover-image"/>
                  </div>}
                
              </div>
      
      
              {/* Quiz and Card Topic Selection */}
              {/* <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Card Topic
                </label>
                <Select className="w-full">
                  <option>Choose category</option>
                </Select>
              </div> */}
            </div>
    </>
  );
}
