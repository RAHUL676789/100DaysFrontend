import React from "react";
import Parent from "./Parent";

const Root = ({ data, searchTerm }) => {
  return (
    <div className="flex flex-col items-center font-sans text-sm p-4">
      {/* 🌳 Root Node of the JSON Tree */}
      <Parent
        nodes={data}
        parentNode="Root"
        depth={0}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Root;
