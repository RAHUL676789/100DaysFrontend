import React, { useRef, useState, useEffect } from "react";
import AccordionItem from "./AccordionItem";

function Accordion() {
  const faqData = [
    {
      question: "What is CreatoMarket?",
      answer:
        "CreatoMarket is a platform where you can buy or sell digital products.",
    },
    {
      question: "Who can be a buyer or seller?",
      answer:
        "Anyone interested in digital items can become a buyer or seller.",
    },
    {
      question: "How can someone withdraw their earnings?",
      answer:
        "Once earnings cross the withdrawal threshold, users can withdraw easily.",
    },
    {
      question: "What are the benefits of CreatoMarket?",
      answer:
        "CreatoMarket allows creators to monetize their work and connect with global buyers.",
    },
  ];

  const [viewMore, setViewMore] = useState(false);
  const [isOpenIndex, setIsOpenIndex] = useState(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  const parentRef = useRef(null);
  const visibleFaqs = viewMore ? faqData : faqData.slice(0, 1);

  // 🌟 Animate container height when viewMore changes
  useEffect(() => {
    if (viewMore && parentRef.current) {
      setMaxHeight(`${parentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [viewMore, visibleFaqs.length]);

  return (
    <div className="bg-gray-900 w-screen min-h-screen py-5 px-6">
      <h2 className="text-white text-3xl text-center mb-6 underline">#Day3 Accordion</h2>

      <div className="flex flex-col">
        <button
          onClick={() => setViewMore((prev) => !prev)}
          className="border bg-white px-7 py-2 rounded-lg cursor-pointer mb-4 self-end mr-5 text-black font-semibold hover:bg-gray-200 transition"
        >
          {viewMore ? "View Less" : "View More"}
        </button>

        <div
          ref={parentRef}
          style={{ maxHeight }}
          className="flex gap-4 flex-col overflow-hidden transition-all duration-500"
        >
          {visibleFaqs.map((item, i) => (
            <AccordionItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={isOpenIndex === i}
              i={i}
              toggle={() =>
                setIsOpenIndex(isOpenIndex === i ? null : i)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
