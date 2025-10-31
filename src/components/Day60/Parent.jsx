import React, { useState, useEffect, useRef } from "react";
import Node from "./Node";
import { v4 as uuidv4 } from "uuid";

const Parent = ({ nodes, parentNode, searchTerm}) => {
  const [isArrayNodes, setIsArrayNodes] = useState(false);
  const parentRef = useRef(null);

  // ✅ Detect if current node name matches search term
  const isMatch =
    searchTerm &&
    parentNode?.toLowerCase().includes(searchTerm.toLowerCase());

  // ✅ Check if nodes is an array or object
  useEffect(() => {
    setIsArrayNodes(Array.isArray(nodes));
  }, [nodes]);

  // ✅ Smooth scroll into view when node matches
  useEffect(() => {
    if (isMatch && parentRef.current) {
      parentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
      // optional highlight pulse
      parentRef.current.classList.add("ring-2", "ring-yellow-400", "scale-105");
      setTimeout(() => {
        parentRef.current.classList.remove("ring-2", "ring-yellow-400", "scale-105");
      }, 1200);
    }
  }, [isMatch]);

  return (
    <div className="flex flex-col items-center relative">
      {/* 🔹 Parent Node */}
      {parentNode && (
        <div
          ref={parentRef}
          className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 shadow text-white font-medium text-sm ${
            isMatch
              ? "bg-gradient-to-r from-green-500 to-yellow-400"
              : "bg-gradient-to-r from-slate-700 to-slate-500"
          }`}
        >
          {parentNode}
        </div>
      )}

      {/* 🔸 Connector Line */}
      {typeof nodes === "object" && nodes !== null && (
        <div className="w-px h-6 bg-gray-400"></div>
      )}

      {/* 🌿 Children */}
      <div className="flex justify-center border-t items-start gap-8 ">
        {/* 🔹 Object Children */}
        {!isArrayNodes &&
          typeof nodes === "object" &&
          nodes !== null &&
          Object.entries(nodes).map(([key, value]) =>
            typeof value === "object" && value !== null ? (
              <Parent
                key={uuidv4()}
                nodes={value}
                parentNode={key}
                searchTerm={searchTerm}
              />
            ) : (
              <Node
                key={uuidv4()}
                node={key}
                nodeValue={value}
                searchTerm={searchTerm}
              />
            )
          )}

        {/* 🔸 Array Children */}
        {isArrayNodes &&
          nodes.map((item, index) =>
            typeof item === "object" && item !== null ? (
              <Parent
                key={uuidv4()}
                nodes={item}
                parentNode={`[${index}]`}
                searchTerm={searchTerm}
              />
            ) : (
              <Node
                key={uuidv4()}
                node={`[${index}]`}
                nodeValue={item}
                searchTerm={searchTerm}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Parent;
