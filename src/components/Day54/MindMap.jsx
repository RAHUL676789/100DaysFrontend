import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const MindMap = () => {
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([]);
  const [moveableLine, setMoveableLine] = useState(null);

  const containerRef = useRef(null);
  const isMoveable = useRef(null);
  const isDrawing = useRef(null);
  const currentLine = useRef(null);

  // -------------------------------
  // 📌 Create new node on double-click
  // -------------------------------
  const handleCreateNode = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const id = uuidv4();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newNode = { x, y, id };
    setNodes((prev) => [...prev, newNode]);
  };

  // -------------------------------
  // 📌 Activate node move on double-click
  // -------------------------------
  const handleDivDoubleClick = (e, id) => {
    e.stopPropagation();
    isMoveable.current = id;
    currentLine.current = null;
  };

  // -------------------------------
  // 📌 Handle dragging nodes + drawing lines
  // -------------------------------
  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();

    // 🔹 Moving a node
    if (isMoveable.current) {
      const updatedNodes = nodes.map((node) =>
        node.id === isMoveable.current
          ? { ...node, x: e.clientX - rect.left, y: e.clientY - rect.top }
          : node
      );

      const moveNode = updatedNodes.find((n) => n.id === isMoveable.current);

      if (moveNode) {
        const nodeCenterX = moveNode.x + 24;
        const nodeCenterY = moveNode.y + 24;

        const updatedLines = lines.map((line) => {
          let updated = { ...line };
          if (line.from === moveNode.id) {
            updated.x1 = nodeCenterX;
            updated.y1 = nodeCenterY;
          }
          if (line.to === moveNode.id) {
            updated.x2 = nodeCenterX;
            updated.y2 = nodeCenterY;
          }
          return updated;
        });

        setLines(updatedLines);
      }

      setNodes(updatedNodes);
    }

    // 🔹 While drawing a new line
    if (currentLine.current !== null) {
      const updatedLine = [...lines];
      updatedLine[currentLine.current] = {
        ...updatedLine[currentLine.current],
        x2: e.clientX,
        y2: e.clientY,
      };
      setLines(updatedLine);
    }

    // 🔹 Dragging existing line
    if (moveableLine) {
      const updatedLine = lines.map((line) =>
        line.id === moveableLine
          ? { ...line, x2: e.clientX, y2: e.clientY }
          : line
      );
      setLines(updatedLine);
    }
  };

  // -------------------------------
  // 📌 Stop moving or drawing
  // -------------------------------
  const handleMouseUp = () => {
    isMoveable.current = null;
    isDrawing.current = null;
    currentLine.current = null;
    setMoveableLine(null);
  };

  // -------------------------------
  // 📌 Start drawing a line from a node
  // -------------------------------
  const handleDivClick = (e, id) => {
    e.stopPropagation();
    isDrawing.current = { id };

    const rect = e.target.getBoundingClientRect();
    const x1 = rect.left + rect.width / 2;
    const y1 = rect.top + rect.height / 2;

    const newLine = {
      from: id,
      to: null,
      x1,
      y1,
      x2: x1,
      y2: y1,
      id: uuidv4(),
    };

    setLines((prev) => [...prev, newLine]);
    currentLine.current = lines.length;
  };

  // -------------------------------
  // 📌 Finish drawing a line to another node
  // -------------------------------
  const handleNodeMouseUp = (e, id) => {
    if (isDrawing.current && isDrawing.current.id !== id) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x2 = rect.left + rect.width / 2;
      const y2 = rect.top + rect.height / 2;

      setLines((prev) =>
        prev.map((line, i) =>
          i === currentLine.current ? { ...line, to: id, x2, y2 } : line
        )
      );
    } else {
      setLines((prev) =>
        prev.filter((_, i) => i !== currentLine.current)
      );
    }
    isDrawing.current = null;
    currentLine.current = null;
  };

  // -------------------------------
  // 📌 Handle line interactions
  // -------------------------------
  const handleLineClick = (id) => {
    setMoveableLine(id);
  };

  const handleLineDoubleClick = (e, id) => {
    e.stopPropagation();
    setLines((prev) => prev.filter((line) => line.id !== id));
  };

  // -------------------------------
  // 📌 Render
  // -------------------------------
  return (
    <div
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={containerRef}
      className="h-screen w-screen relative bg-gray-50 border-2 border-dashed border-gray-300 overflow-scroll"
      onDoubleClick={handleCreateNode}
    >
      {/* Page Heading */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          🧠 Interactive Mind Map (React + Tailwind)
        </h1>
        <p className="text-gray-500 text-sm">
          Double-click to create nodes • Click to draw connections • Double-click
          node to move • Double-click line to delete
        </p>
      </div>

      {/* SVG Lines */}
      <svg className="h-full w-full absolute">
        {lines.map((line) => (
          <line
            key={line.id}
            onClick={() => handleLineClick(line.id)}
            onDoubleClick={(e) => handleLineDoubleClick(e, line.id)}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="blue"
            strokeWidth="3"
            className="cursor-pointer transition-all duration-200"
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <div
        contentEditable
          key={node.id}
          onMouseDown={(e) => handleDivClick(e, node.id)}
          onDoubleClick={(e) => handleDivDoubleClick(e, node.id)}
          onMouseUp={(e) => handleNodeMouseUp(e, node.id)}
          style={{ top: node.y, left: node.x }}
          className="absolute h-12 w-12 flex justify-center text-center text-xs items-center  font-medium text-white rounded-full bg-gradient-to-br from-blue-400 to-purple-500 cursor-pointer shadow-lg overflow-scroll no-scrollbar"
        >
          Node
        </div>
      ))}
    </div>
  );
};

export default MindMap;
