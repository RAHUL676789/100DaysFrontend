import React, { useEffect, useState, useRef } from "react";

const Node = ({ node, nodeValue, searchTerm }) => {
  const [type, setType] = useState(typeof nodeValue);
  const nodeRef = useRef(null);

  // 🔍 Check if current node matches the search term
  const isMatch =
    searchTerm &&
    (node.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(nodeValue).toLowerCase().includes(searchTerm.toLowerCase()));

  // 🎯 Auto-scroll to the matched node
  useEffect(() => {
    if (nodeRef.current && isMatch) {
      nodeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [isMatch]);

  // 🔄 Update node type when value changes
  useEffect(() => {
    setType(typeof nodeValue);
  }, [nodeValue]);

  // 🎨 Dynamic text color based on value type
  const colorByType = {
    string: "text-green-400",
    number: "text-blue-400",
    boolean: "text-purple-400",
    object: "text-yellow-400",
    undefined: "text-gray-400",
  };

  return (
    <div className="flex flex-col items-center">
      {/* 🔹 Connector line from parent */}
      <div className="w-px h-6 bg-gray-400"></div>

      {/* 🧩 Node Box */}
      <div
        ref={nodeRef}
        className={`px-4 py-2 rounded-md shadow-md border text-center transition-all duration-300
        ${isMatch
          ? "bg-gradient-to-r from-green-400 to-yellow-400 scale-105 shadow-lg"
          : "bg-gradient-to-r from-gray-700 to-gray-500"
        }`}
      >
        <span className="font-semibold text-red-300">{node}:</span>{" "}
        <span className={`${colorByType[type]} font-mono`}>
          {type === "boolean" ? nodeValue.toString() : String(nodeValue)}
        </span>
      </div>
    </div>
  );
};

export default Node;
