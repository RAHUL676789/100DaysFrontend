import React, { useState, useRef } from "react";

const SplitPane = () => {
  const [dividerX, setDividerX] = useState(30); // default 30% sidebar
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const startDrag = () => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize"; // cursor feedback
  };

  const stopDrag = () => {
    isDragging.current = false;
    document.body.style.cursor = "default";
  };

  const onDrag = (e) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    if (newX > 15 && newX < 70) setDividerX(newX);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[500px] w-full border rounded-xl overflow-hidden shadow-lg bg-white"
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >

       
      {/* Left Panel (Sidebar) */}
      <div
        className="flex flex-col items-center justify-center bg-gray-100 text-gray-700 font-medium transition-all overflow-scroll"
        style={{ width: `${dividerX}%` }}
      >
        <h2 className="text-lg">📂 Sidebar</h2>
        <p className="text-sm text-gray-500">Resizable panel</p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, quam? Autem laudantium consectetur accusamus cum ducimus labore, molestiae odit dolorum dignissimos doloremque in alias, accusantium fugiat facilis, eligendi quibusdam quisquam.
        Fug id illo in. Ratione eaque voluptate, voluptas dignissimos ducimus aperiam iusto hic, atque aut, expedita laborum.
      </div>

      {/* Divider */}
      <div
        onMouseDown={startDrag}
        className="w-1.5 bg-teal-600 hover:bg-teal-700 cursor-col-resize transition-colors relative"
      >
        {/* Handle dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-3 h-12 bg-white rounded-full border border-teal-500 shadow" />
      </div>

      {/* Right Panel (Content) */}
      <div
        className="flex-1 bg-gray-50 flex flex-col items-center justify-center text-gray-700 font-medium transition-all"
        style={{ width: `${100 - dividerX}%` }}
      >
        <h2 className="text-lg">📑 Main Content</h2>
        <p className="text-sm text-gray-500">Drag divider to resize</p>
      </div>
    </div>
  );
};

export default SplitPane;
