import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const ReactionSpeed = () => {
  const [stickLength, setstickLength] = useState(6);
  const [speed, setspeed] = useState(2); // seconds for fall duration
  const [sticks, setsticks] = useState([]);
  const generatedIndexRef = useRef([]);
  const indexCreationAttempRef = useRef(0);
  const [showResult, setshowResult] = useState(false);

  // initialize sticks whenever count changes
  useEffect(() => {
    const newSticks = Array.from({ length: stickLength }, () => ({
      id: uuidv4(),
      animate: false,
      release: null,
      detect: null,
    }));
    setsticks(newSticks);
    generatedIndexRef.current = [];
    setshowResult(false);
  }, [stickLength]);

  // generate random index that is not already used
  const generateIndex = () => {
    const index = Math.floor(Math.random() * stickLength);
    return index;
  };

  // wait random time between sticks
  const wait = () => {
    const delay = Math.floor(Math.random() * 3000) + 1000;
    return new Promise((resolve) =>
      setTimeout(() => resolve("continue"), delay)
    );
  };

  // handle stick fall sequence
  const handleSetIndex = async () => {
    const index = generateIndex();

    if (generatedIndexRef.current.length >= sticks.length) {
      handleEndGame();
      return;
    }

    if (generatedIndexRef.current.indexOf(index) < 0) {
      generatedIndexRef.current.push(index);
      handleStartGame(index);
      await wait();
      handleSetIndex();
      return;
    } else {
      if (generatedIndexRef.current.length >= sticks.length) {
        handleEndGame();
        return;
      }
      if (indexCreationAttempRef.current >= 50) {
        handleEndGame();
        return;
      }
      indexCreationAttempRef.current += 1;
      handleSetIndex();
    }
  };

  const handleStartGame = (index) => {
    setsticks((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, animate: true, release: performance.now() }
          : item
      )
    );
  };

  const handleEndGame = () => {
    setshowResult(true);
  };

  const handleStickClick = (id) => {
    setsticks((prev) =>
      prev.map((item) =>
        item.id === id && item.animate
          ? { ...item, detect: performance.now(), animate: false }
          : item
      )
    );
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-start pt-6">
      <div className="w-[85%] bg-white/10 backdrop-blur-md border border-gray-700 rounded-2xl p-5 shadow-2xl">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">
          <h1 className="text-3xl font-semibold text-white text-center">
            ⚡ Reaction Speed Game
          </h1>

          <div className="flex flex-wrap items-center gap-4 justify-center">
            <button
              onClick={handleSetIndex}
              className="px-4 py-2 rounded-lg bg-gradient-to-b from-blue-700 to-blue-500 text-white font-semibold hover:scale-105 transition-transform"
            >
              Start Game
            </button>

            <div className="flex items-center gap-2 text-white">
              <label htmlFor="stickCount" className="font-semibold">
                Sticks:
              </label>
              <input
                id="stickCount"
                type="number"
                min={6}
                max={12}
                onChange={(e) => setstickLength(Number(e.target.value))}
                className="w-16 rounded-md text-center bg-gray-800 border border-gray-600 text-white"
              />
            </div>

            {/* 🔥 New Speed Control */}
            <div className="flex items-center gap-2 text-white">
              <label htmlFor="speed" className="font-semibold">
                Speed:
              </label>
              <input
                id="speed"
                type="range"
                min={1}
                max={5}
                step={0.5}
                value={speed}
                onChange={(e) => setspeed(Number(e.target.value))}
              />
              <span>{speed}s</span>
            </div>
          </div>
        </header>

        {/* Game Area */}
        <div className="relative flex gap-4 justify-center rounded-md border-t border-gray-700 h-[300px] overflow-hidden bg-gray-950/30">
          {sticks.map((item, i) => (
            <div
              key={item.id}
              onClick={() => handleStickClick(item.id)}
              style={{
                transitionDuration: `${speed}s`,
              }}
              className={`relative h-32 w-5 bg-gradient-to-b from-gray-400 to-gray-800 rounded-full mt-5 cursor-pointer transition-transform ease-in-out ${
                item.animate
                  ? "translate-y-[300%]"
                  : "hover:-translate-y-2 active:scale-95"
              }`}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-6 w-3 bg-gray-500 rounded-b-full shadow-inner"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      {showResult && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center flex-col z-50">
          <h2 className="text-3xl text-white font-bold mb-4">Game Over 🎯</h2>
          <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-xl p-6 text-white max-h-[70vh] overflow-auto">
            {sticks.map((item, i) => (
              <div
                key={item.id}
                className="flex justify-between w-[300px] border-b border-gray-700 py-2"
              >
                <span>Stick {i + 1}</span>
                {item.detect && item.release ? (
                  <span className="text-green-400 font-semibold">
                    {(item.detect - item.release).toFixed(1)} ms
                  </span>
                ) : (
                  <span className="text-red-400">Missed</span>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-5 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default ReactionSpeed;
