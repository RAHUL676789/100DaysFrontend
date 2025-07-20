import React, { useEffect, useRef, useState } from "react";

const fileList = [
  { name: "index.html", type: "file", path: "index.html" },
  { name: "style.css", type: "file", path: "style.css" },
  { name: "app.js", type: "file", path: "app.js" },
  {
    name: "src",
    type: "folder",
    children: [
      { name: "Dashboard.jsx", type: "file", path: "src/Dashboard.jsx" },
      { name: "Profile.jsx", type: "file", path: "src/Profile.jsx" },
    ],
  },
  {
    name: "utils",
    type: "folder",
    children: [
      { name: "helpers.js", type: "file", path: "utils/helpers.js" },
    ],
  },
  { name: "data.json", type: "file", path: "data.json" },
];

// Flatten the files for search display
const flattenFiles = (files) => {
  let flat = [];

  files.forEach((file) => {
    if (file.type === "file") {
      flat.push(file);
    } else if (file.type === "folder" && file.children) {
      flat = flat.concat(flattenFiles(file.children));
    }
  });

  return flat;
};

const CommandPalette = () => {
  const inputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredFiles, setFilteredFiles] = useState(flattenFiles(fileList));

  // Shortcut Trigger: Ctrl + R or Cmd + R
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setShowModal(true);
        setSearchText(""); // Reset input
        setFilteredFiles(flattenFiles(fileList)); // Reset files
      }

      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus on open
  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const results = flattenFiles(fileList).filter((file) =>
      file.name.toLowerCase().includes(value.toLowerCase()) ||
      file.path.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredFiles(results);
  };

  return (
    <div className="h-screen w-full bg-[#0d0d0d] text-white flex flex-col items-center justify-start pt-20">
      <div className="text-center text-xl mb-4">
        Press <span className="bg-white text-black px-2 py-1 rounded">Ctrl / Cmd + R</span> to open command palette
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-start pt-32">
          <div className="w-full max-w-xl rounded-md bg-[#1e1e1e] shadow-lg border border-gray-700 overflow-hidden">
            {/* Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder="> Select to open a file"
              value={searchText}
              onChange={handleSearch}
              className="w-full px-4 py-3 bg-[#252526] text-white placeholder-gray-400 text-sm border-b border-gray-600 outline-none"
            />

            {/* File List */}
            <div className="max-h-[300px] overflow-y-auto">
              {filteredFiles.length > 0 ? (
                filteredFiles.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center px-4 py-2 hover:bg-[#2c2c2c] transition-colors cursor-pointer"
                    onClick={() => alert(`Opening: ${item.path}`)}
                  >
                    <div>
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      <p className="text-gray-400 text-xs">{item.path}</p>
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-gray-700 text-gray-300 rounded-full uppercase">
                      {item.type}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-gray-400">No files matched</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandPalette;
