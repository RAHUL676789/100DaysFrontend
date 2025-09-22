import React from "react";
// import "./scrollbars.css"; // yahan tumhari scrollbar CSS themes hongi

const themes = [
  "sleekline",
  "glassglow",
  "neonedge",
  "shadowtrack",
  "auroraflow",
  "minimaldark",
  "retrocandy",
  "oceanwave",
  "firespark",
  "cybergrid",
  "natureleaf",
];

const ScrollbarShowcase = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-8">
         11 Custom Scrollbar Themes (React + Tailwind)
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-2 capitalize">
              {theme}
            </h2>
            <div
              className={`h-40 overflow-y-scroll p-2 text-sm leading-relaxed ${theme}`}
            >
              {Array(20)
                .fill(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec."
                )
                .join(" ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollbarShowcase;
