import React, { useState } from "react";
import LottiePlayer from "../animations/LottiePlayer";
import smart from "../animations/data/Smart.json"
const faqs = [
  {
    question: "Who can benefit from using Physiohub?",
    answer: "Physiohub is designed for individuals seeking physiotherapy support, professionals in the field, and clinics aiming to enhance patient care.",
  },
  {
    question: "How often is the content updated?",
    answer: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    question: "Do I need to create an account to use the platform?",
    answer: "While some features are accessible without an account, registering allows access to personalized recommendations and premium content.",
  },
  {
    question: "Is there a subscription fee to use the platform?",
    answer: "Physiohub offers both free and premium subscription plans to cater to different user needs.",
  },
  {
    question: "How do you handle user data and privacy?",
    answer: "We prioritize user privacy with encrypted data storage and strict access policies, ensuring user information is secure.",
  },
  {
    question: "Can I suggest topics or features for the platform?",
    answer: "Absolutely! We welcome user feedback and encourage suggestions to improve our platform.",
  },
  {
    question: "What should I do if I encounter technical issues on the platform?",
    answer: "You can visit our Help Center for troubleshooting guides or contact our support team for assistance.",
  },
];

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row gap-15 md:p-10 ">
      <div className="md:min-w-[500px] text-wrap flex flex-col justify-between">
        <div>
        <h2 className="text-purple-600 text-sm font-semibold uppercase">FAQ</h2>
        <h1 className="md:text-5xl text-3xl font-bold mt-2">Frequently asked questions</h1>
        <p className="text-gray-500 mt-2">
          Visit our <a href="#" className="text-blue-600 font-medium">Help Center</a> for more information.
        </p>
        </div>
        <div className="md:w-[120px] w-[80px] md:h-[120px] h-[80px]">
            <LottiePlayer animationFile={smart} width="100%" height="100%" />
          </div>
      </div>
      <div className="md:min-w-[768px] w-full">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg mb-2 overflow-hidden shadow-sm"
          >
            <button
              className="w-full text-left p-4 flex justify-between items-center bg-white"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-50 text-gray-600 text-sm ">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
