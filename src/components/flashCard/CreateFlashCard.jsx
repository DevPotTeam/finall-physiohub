"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, X, Plus } from "lucide-react";
import { Select } from "@/components/ui/select.jsx";
import { Input } from "@/components/ui/input.jsx";
import PublishFlashCardHeader from "@/components/flashCard/PublishFlashCardHeader";
import usePost from "@/hooks/usePost";
import useImagePost from "@/hooks/useImagePost";
import { FaTimesCircle } from "react-icons/fa";
import Image from "next/image";
import useGet from "@/hooks/useGet";
import { Button } from "@/components/ui/button";

export default function CreateFlashCard({ setShowInFlashCard }) {
  const fileInputRef = useRef(null);
  const [notification, setNotification] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [frontCardImageLoading, setFrontCardImageLoading] = useState(false);
  const [backCardImageLoading, setBackCardImageLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [flashcard, setFlashcard] = useState({
    title: "",
    description: "",
    hint: "",
    imageUrl: "",
    masteryLevel: 0,
    subject: "",
    confidenceLevel: "",
    frontContent: "",
    frontImage: "",
    backContent: "",
    backImage: "",
    topic: "",
  });

  const showToast = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const fetchTopics = async () => {
    const { data, error, status } = await useGet(`/main-topics/`);
    if (status === 200) {
      setTopics(data);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "masteryLevel") {
      setFlashcard((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }
    setFlashcard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (eOrFiles, name) => {
    if (name === "imageUrl") setImageLoading(true);
    if (name === "frontImage") setFrontCardImageLoading(true);
    if (name === "backImage") setBackCardImageLoading(true);

    const file = eOrFiles.target?.files?.[0] || eOrFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    const { data, error, status } = await useImagePost(
      `/courses/upload-image`,
      formData
    );

    if (data) {
      setFlashcard((prev) => ({ ...prev, [name]: data }));
    }

    setImageLoading(false);
    setFrontCardImageLoading(false);
    setBackCardImageLoading(false);
  };

  const handleDrop = (event, name) => {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      handleUpload(event.dataTransfer.files, name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveImage = (name) => {
    setFlashcard((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleCreateTopic = async () => {
    if (!newTopicName.trim()) {
      showToast("Topic name cannot be empty", "error");
      return;
    }

    const { data, error, status } = await usePost("/main-topics", {
      name: newTopicName
    });

    if (status === 201) {
      showToast("Topic created successfully", "success");
      setNewTopicName("");
      setShowTopicModal(false);
      fetchTopics();
    } else {
      showToast(error?.[0] || "Failed to create topic", "error");
    }
  };

  const handleCreateFlashCard = async () => {
    const { data, error, status } = await usePost(`/flashcards/create`, {
      ...flashcard,
    });
    if (status == 201) {
      setTimeout(() => {
        setShowInFlashCard("FlashCards");
      }, 2000);
      showToast("FlashCard Created Successfully", "success")
    }
    if (error) {
      showToast(error[0], "error")
    }
  };

  return (
    <>
      <PublishFlashCardHeader handleCreateFlashCard={handleCreateFlashCard} setShowInFlashCard={setShowInFlashCard}/>
      <div className=" p-6 bg-white rounded-lg shadow-md w-full mx-auto md:max-w-[80%] max-w-[95%]">
        {/* Cover Image Upload */}
        <div className="mb-4 ">
          <label className="block font-semibold text-gray-700">Title</label>
          <Input
            placeholder="Write question here"
            className="my-2"
            name="title"
            value={flashcard.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 ">
          <label className="block font-semibold text-gray-700">Description</label>
          <Input
            placeholder="Write question here"
            className="my-2"
            name="description"
            value={flashcard.description}
            onChange={handleChange}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-2">
          <div className="mb-4 ">
            <label className="block font-semibold text-gray-700">Hint</label>
            <Input
              placeholder="Write Hint here"
              className="my-2"
              name="hint"
              value={flashcard.hint}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 ">
            <label className="block font-semibold text-gray-700">Subject</label>
            <Input
              placeholder="Write Subject here"
              className="my-2"
              name="subject"
              value={flashcard.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4 ">
          <label className="block font-semibold text-gray-700">Mastery Level</label>
          <Input
            placeholder="Write Mastery Level here"
            className="my-2"
            type={"number"}
            name="masteryLevel"
            value={flashcard.masteryLevel}
            onChange={handleChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Confidence Level</label>
            <Select
              name="confidenceLevel"
              value={flashcard.confidenceLevel}
              onChange={handleChange}
              className="w-full"
            >
              <option value="">Choose Level</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Topic</label>
            <div className="flex md:flex-row flex-col items-center gap-2">
            <Select
              name="topic"
              value={flashcard.topic}
              onChange={handleChange}
              className="w-full"
            >
              <option value="">Choose Topic</option>
              {topics.map((topic) => (
                <option value={topic._id}>{topic.name}</option>
              ))}
            </Select>
            <Button
              type="button"
              onClick={() => setShowTopicModal(true)}
              variant="outline"
              className="gap-2 md:w-auto w-full"
            >
              <Plus className="w-4 h-4" />
             Add New Topic
            </Button>
            </div>
          </div>
        </div>
        {/* Thumbnail Upload */}
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Image</label>
          {!flashcard.imageUrl ? (
            <div
              className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 "
              onDrop={(e) => {
                handleDrop(e, "imageUrl");
              }}
              onDragOver={(e) => {
                handleDragOver(e, "imageUrl");
              }}
            >
              {imageLoading ? (
                <div className="w-12 h-12 border-4 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
              ) : (
                <label className="ud-btn btn-white text-center cursor-pointer">
                  <div className="icon mb5">
                    <Upload className="w-6 h-6 mb-2 text-purple-600 justify-self-center " />
                  </div>
                  <h4 className="title fz17 mb1">
                    Upload/Drag photos of your FlashCard
                  </h4>
                  <p className="text fz-10 mb10">
                    Photos must be JPEG or PNG format and at least 2048x768
                  </p>
                  Browse Files
                  <input
                    ref={fileInputRef}
                    id="fileInput"
                    type="file"
                    name="imageUrl"
                    multiple
                    className="ud-btn btn-white"
                    onChange={(e) => {
                      handleUpload(e, "imageUrl");
                    }}
                    style={{ display: "none" }}
                    required
                  />
                </label>
              )}
            </div>
          ) : (
            <div>
              <button
                className="justify-self-end cursor-pointer"
                onClick={() => {
                  handleRemoveImage("imageUrl");
                }}
              >
                <X />
              </button>
              <div className="md:w-[150px] w-[100px] md:h-[150px] h-[100px]">
                <Image
                  src={flashcard.imageUrl}
                  height={200}
                  width={200}
                  alt="cover-image"
                  className="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border p-4 mb-4 rounded shadow-sm">
          {/* Front */}
          <div className="flex md:flex-row flex-col md:gap-3 items-center">
            <div className="md:mb-4 mb-2">
              {!flashcard.frontImage ? (
                <div
                  className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 h-10 w-[100px]"
                  onDrop={(e) => {
                    handleDrop(e, "frontImage");
                  }}
                  onDragOver={(e) => {
                    handleDragOver(e, "frontImage");
                  }}
                >
                  {frontCardImageLoading ? (
                    <div className="w-3 h-3 border-2 p-2 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                  ) : (
                    <label className=" text-center cursor-pointer">
                      <div className="icon mb5">
                        <Upload className="w-4 h-4 text-purple-600 justify-self-center" />
                      </div>
                      <h4 className="title fz17 mb1">Front</h4>
                      <input
                        ref={fileInputRef}
                        id="fileInput"
                        type="file"
                        name="frontImage"
                        multiple
                        className=""
                        onChange={(e) => {
                          handleUpload(e, "frontImage");
                        }}
                        style={{ display: "none" }}
                        required
                      />
                    </label>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    className="justify-self-end cursor-pointer"
                    onClick={() => {
                      handleRemoveImage("frontImage");
                    }}
                  >
                    <X />
                  </button>
                  <Image
                    src={flashcard.frontImage}
                    height={100}
                    width={100}
                    alt="cover-image"
                  />
                </div>
              )}
            </div>
            <div className="mb-3 w-full">
              <label className="block font-semibold text-gray-700">Front</label>
              <Input
                placeholder="Front Content"
                name="frontContent"
                value={flashcard.frontContent}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Back */}
          <div className="flex md:flex-row flex-col md:gap-3 items-center">
            <div className="md:mb-4 mb-2">
              {!flashcard.backImage ? (
                <div
                  className="border-dashed border-2 border-gray-300 rounded-lg px-6 py-10 flex flex-col items-center justify-center text-gray-500 h-10 w-[100px]"
                  onDrop={(e) => {
                    handleDrop(e, "backImage");
                  }}
                  onDragOver={(e) => {
                    handleDragOver(e, "backImage");
                  }}
                >
                  {backCardImageLoading ? (
                    <div className="w-3 h-3 border-2 p-2 border-t-purple-600 border-b-transparent border-l-transparent border-r-transparent rounded-full animate-spin"></div>
                  ) : (
                    <label className=" text-center cursor-pointer">
                      <div className="icon mb5">
                        <Upload className="w-4 h-4 text-purple-600 justify-self-center" />
                      </div>
                      <h4 className="title fz17 mb1">Back</h4>
                      <input
                        ref={fileInputRef}
                        id="fileInput"
                        type="file"
                        name="backImage"
                        multiple
                        className=""
                        onChange={(e) => {
                          handleUpload(e, "backImage");
                        }}
                        style={{ display: "none" }}
                        required
                      />
                    </label>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    className="justify-self-end cursor-pointer"
                    onClick={() => {
                      handleRemoveImage("backImage");
                    }}
                  >
                    <X />
                  </button>
                  <Image
                    src={flashcard.backImage}
                    height={100}
                    width={100}
                    alt="cover-image"
                  />
                </div>
              )}
            </div>
            <div className="mb-3 w-full">
              <label className="block font-semibold text-gray-700">Back</label>
              <Input
                placeholder="Back Content"
                name="backContent"
                value={flashcard.backContent}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {showTopicModal && (
          <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Create New Topic</h3>
                <button 
                  onClick={() => setShowTopicModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic Name
                  </label>
                  <Input
                    type="text"
                    value={newTopicName}
                    onChange={(e) => setNewTopicName(e.target.value)}
                    placeholder="Enter topic name"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowTopicModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateTopic}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        {notification && (
          <div
            className={`fixed bottom-4 right-4 p-4 rounded-md shadow-lg ${
              notification.type === "error" ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {notification.message}
            <button onClick={() => setNotification(null)} className="ml-4 text-xl">
              ×
            </button>
          </div>
        )}
      </div>
    </>
  );
}
