import React, { useEffect, useRef, useState } from "react";

/**
 * Day 36 Challenge
 * Classic 2D Parallax Background with Click-to-Jump Character
 * - Infinite scrolling background layers (parallax)
 * - Player SVG jumps on click
 * - Pure React + CSS + JS (no external libraries)
 */

const ParallaxGame = () => {
  const [playerY, setPlayerY] = useState(0); // vertical position
  const [isJumping, setIsJumping] = useState(false);
  const [velocity, setVelocity] = useState(0);
  const playerRef = useRef(null);

  const gravity = 0.6; // acceleration down
  const jumpForce = -12; // initial jump velocity
  const groundY = 0; // ground level

  // Handle click to jump
  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setVelocity(jumpForce);
    }
  };

  // Game loop for jump physics
  useEffect(() => {
    const interval = setInterval(() => {
      if (isJumping) {
        setVelocity((v) => v + gravity);
        setPlayerY((y) => {
          const nextY = y + velocity;
          if (nextY >= groundY) {
            setIsJumping(false);
            setVelocity(0);
            return groundY;
          }
          return nextY;
        });
      }
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, [isJumping, velocity]);

  // Parallax background offsets
  const [bgOffset, setBgOffset] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBgOffset((prev) => (prev - 1) % window.innerWidth); // move left
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="game-container"
      onClick={handleJump}
      style={{ overflow: "hidden", position: "relative", height: "400px" }}
    >
      {/* Background layers */}
      <div
        className="layer clouds"
        style={{
          backgroundImage: "url('https://www.freepik.com/free-vector/gradient-cloud-collection_13237375.htm#fromView=search&page=1&position=4&uuid=09916e56-ae20-4ec0-ac29-f20541bc0074&query=cloud')",
          backgroundPositionX: `${bgOffset * 0.2}px`,
        }}
      />
      <div
        className="layer mountains"
        style={{
          backgroundImage: "url('https://www.freepik.com/free-vector/gradient-cloud-collection_13237375.htm#fromView=search&page=1&position=4&uuid=09916e56-ae20-4ec0-ac29-f20541bc0074&query=cloud')",
          backgroundPositionX: `${bgOffset * 0.5}px`,
        }}
      />
      <div
        className="layer trees"
        style={{
          backgroundImage: "url('https://www.freepik.com/free-vector/isolated-tree-white-background_4115846.htm#fromView=keyword&page=1&position=0&uuid=633a4eb6-e58a-460e-876f-145a33bf8fcc&query=Tree+svg')",
          backgroundPositionX: `${bgOffset * 0.8}px`,
        }}
      />
      <div
        className="layer ground"
        style={{
          backgroundImage: "url('https://www.freepik.com/premium-photo/3d-rendered-plain-green-background_215238870.htm#fromView=search&page=1&position=15&uuid=f4a9069f-378c-4a9a-b83d-0ee7b92c7143&query=ground')",
          backgroundPositionX: `${bgOffset}px`,
        }}
      />

      {/* Player SVG */}
      <div
        ref={playerRef}
        className="player"
        style={{
          position: "absolute",
          bottom: `${groundY + playerY}px`,
          left: "100px",
          width: "50px",
          height: "50px",
          transition: "bottom 0.016s linear",
        }}
      >
        <svg
          xmlns="https://www.freepik.com/free-vector/cute-happy-smiling-child-isolated-white_5135263.htm#fromView=search&page=1&position=0&uuid=0aa867aa-8099-47de-8e32-d7573c71e677&query=kid"
          viewBox="0 0 64 64"
          width="50"
          height="50"
        >
          <circle cx="32" cy="32" r="30" fill="#ff5722" />
          <circle cx="42" cy="24" r="6" fill="#fff" />
        </svg>
      </div>

      {/* Styles */}
      <style>{`
        .layer {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 200%;
          background-repeat: repeat-x;
          background-size: cover;
          pointer-events: none;
        }
        .clouds { z-index: 1; opacity: 0.6; }
        .mountains { z-index: 2; }
        .trees { z-index: 3; }
        .ground { z-index: 4; }
      `}</style>
    </div>
  );
};

export default ParallaxGame;
