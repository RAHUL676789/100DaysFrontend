import React, { useState } from "react";
import Root from "./Root";

const JsonTreeVisual = () => {
  const [rawJson, setRawJson] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isValidJson, setIsValidJson] = useState(false);
  const [searchTerm, setSearchTerm] = useState("root");

  const handleVisualize = () => {
    try {
      const validJson = JSON.parse(rawJson);
      setParsedJson(validJson);
      setIsValidJson(true);
    } catch (error) {
      setIsValidJson(false);
      alert(error.message || "Invalid JSON format ⚠️");
    }
  };

  return (
    <div
      className={`h-screen w-screen relative p-4 transition-all duration-300 ${
        isDark ? "bg-zinc-900 text-gray-50" : "bg-white text-black"
      }`}
    >
      {/* 🔘 Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl  font-semibold text-center flex-1">
          JSON Tree Visualization 🌳
        </h1>

        {/* 🌓 Theme Toggle */}
        <button
          onClick={() => setIsDark((prev) => !prev)}
          className={`px-4 py-2 rounded font-semibold shadow transition-all duration-200 ${
            isDark
              ? "bg-gray-200 text-black hover:bg-gray-300"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* 🔍 Search + Visualize */}
      <div className="absolute top-4 left-4 flex gap-3">
        <button
          onClick={handleVisualize}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          Visualize
        </button>

      </div>
      
        <input
          type="text"
          placeholder="🔍 Search node..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 rounded bg-gray-100 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-zinc-700 dark:border-gray-600 dark:text-white"
        />

      {/* 🧠 Main Layout */}
      <div className="h-[85vh] w-[95vw] flex justify-between border mx-auto rounded-md overflow-hidden mt-12 shadow-md">
        {/* 📝 JSON Input */}
        <textarea
          value={rawJson}
          onChange={(e) => setRawJson(e.target.value)}
          placeholder="Paste your JSON here..."
          className="border-r w-[40%] p-3 text-sm font-mono resize-none outline-none dark:bg-zinc-800 dark:text-white bg-gray-50"
        />

        {/* 🌳 JSON Tree Output */}
        <div
          className={`flex-1 p-3 overflow-auto transition-all duration-300 ${
            isDark ? "bg-zinc-800" : "bg-gray-50"
          }`}
        >
          {parsedJson && isValidJson ? (
            <Root data={parsedJson} searchTerm={searchTerm} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 italic">
              Paste JSON and click “Visualize” to generate tree
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonTreeVisual;
