import React, { useEffect, useRef, useState } from "react";

const PlayerMovement = () => {
  const playerRef = useRef(null); // Player DOM ref
  const pos = useRef({ x: 300, y: 300 }); // Position memory
  const animationRef = useRef(null); // Animation frame reference
  const [position, setPosition] = useState({ x: 100, y: 100 }); // React render state

  const playerSpeed = 1.5;

  // ---- MOVE LEFT FUNCTION ----
  const moveLeft = () => {
    pos.current.x -= playerSpeed; // Decrease X position
    setPosition({ ...pos.current }); // Re-render for smooth visual update
    animationRef.current = requestAnimationFrame(moveLeft);
  };

  // ---- KEY DOWN EVENT ----
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      // Prevent multiple loops
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(moveLeft);
      }
    }
  };

  // ---- KEY UP EVENT ----
  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft") {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div
        ref={playerRef}
        className="absolute w-10 h-10 bg-red-400 rounded-md transition-transform duration-50"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotateY(180deg)`,
        }}
      ></div>
    </div>
  );
};

export default PlayerMovement;
