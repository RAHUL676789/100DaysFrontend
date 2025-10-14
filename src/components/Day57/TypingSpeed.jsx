import React, { useState, useEffect, useRef } from 'react'
import { quotes } from "./quotes.js"

const TypingSpeed = () => {
  const [quotesIndex, setquotesIndex] = useState(0);
  const [words, setwords] = useState(quotes[quotesIndex].split(" ") || []);
  const [currentWordIndex, setcurrentWordIndex] = useState(0);
  const [typeChar, settypeChar] = useState("");
  const [typeCharIndex, settypeCharIndex] = useState(0);
  const [accuracy, setaccuracy] = useState(0);
  const [wpm, setwpm] = useState(0);
  const [inputValue, setinputValue] = useState("");
  const wordsRef = useRef([]);
  const timerRef = useRef(null);
  const [timer, settimer] = useState(null);
  const [timeValue, settimeValue] = useState(1);
  const [showResult, setshowResult] = useState(false);

  const handleNextQuotes = () => {
    const index = Math.floor(Math.random() * quotes.length);
    setquotesIndex(index);
    setcurrentWordIndex(0);
    settypeCharIndex(0);
    setinputValue("");
    setaccuracy(0);
    setwpm(0);
  };

  useEffect(() => {
    setwords(quotes[quotesIndex].split(" "));
  }, [quotesIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === " " && e.code === "Space" && inputValue !== "") {
        handleAccuracy();
      } else if (![" ", "Backspace", "Shift", "Alt"].includes(e.key)) {
        settypeCharIndex((prev) => prev + 1);
      }

      if (e.key === "Backspace") {
        if (typeCharIndex === 0 && currentWordIndex > 0) {
          setcurrentWordIndex((prev) => (prev > 0 ? prev - 1 : 0));
        } else if (typeCharIndex > 0) {
          settypeCharIndex((prev) => prev - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputValue]);

  function handleAccuracy() {
    const currentWord = words[currentWordIndex];
    if (currentWord === inputValue.trim()) setaccuracy((prev) => prev + 1);

    settypeCharIndex(0);
    setcurrentWordIndex((prev) => prev + 1);
    setinputValue("");
    settypeChar("");
    setwpm((prev) => prev + 1);
  }

  function inputChange(e) {
    setinputValue(e.target.value);
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        settimer((prev) => prev - 1);
      }, 1000);
    }
  }

  useEffect(() => {
    settypeChar(inputValue.trim());
  }, [inputValue]);

  useEffect(() => {
    const scrllElemnt = wordsRef.current[currentWordIndex];
    if (scrllElemnt) {
      scrllElemnt.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentWordIndex]);

  useEffect(() => {
    settimer(timeValue * 60);
  }, [timeValue]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerRef.current);
      setshowResult(true);
      return;
    }
  }, [timer]);

  const handleClose = () => {
    setaccuracy(0);
    setwpm(0);
    setshowResult(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-black flex justify-center items-center px-4">
      <div className="w-[80%] h-[100vh] bg-zinc-900/90 rounded-2xl border border-zinc-700 shadow-xl flex flex-col overflow-hidden backdrop-blur-sm">
        
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center bg-zinc-800/70 border-b border-zinc-700 px-5 py-3 rounded-t-2xl">
          <button 
            onClick={handleNextQuotes} 
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition-all duration-200">
            Next Quote
          </button>

          <h1 className="text-xl md:text-3xl font-bold text-center flex-1 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400 tracking-wide">
            🚀 Typing Speed Test 💥
          </h1>

          <div className="flex items-center gap-3 text-yellow-400 font-semibold tracking-wide">
            <h3 className="text-sm md:text-base">Time Left:</h3>
            <span className="text-xl font-bold">
              {Math.floor(timer / 60).toString().padStart(2, "0")}:
              {Math.floor(timer % 60).toString().padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-2 ml-2">
            <label htmlFor="time" className="text-sm text-gray-300">Set Time</label>
            <input
              value={timeValue}
              onChange={(e) => settimeValue(e.target.value)}
              min={1}
              max={5}
              type="number"
              className="w-14 py-1 rounded-md bg-zinc-700 text-center text-gray-100 font-semibold focus:ring-2 ring-green-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Typing Section */}
        <div className="flex-1 p-5 overflow-y-scroll no-scrollbar text-gray-200 text-lg leading-relaxed tracking-wide space-y-3 bg-zinc-800/60">
          {words.map((word, wIndex) => (
            <span
              key={wIndex}
              className={`inline-block mx-1 px-1.5 py-0.5 rounded-md ${
                wIndex === currentWordIndex
                  ? "bg-zinc-900 border border-yellow-400/40"
                  : ""
              }`}
            >
              {word.split("").map((char, charIndex) => {
                const isCurrentWord = wIndex === currentWordIndex;
                const isCurrentChar = charIndex === typeCharIndex && isCurrentWord;
                const typedChar = typeChar[charIndex];
                let color = "";

                if (typedChar) {
                  color =
                    typedChar === char && isCurrentWord
                      ? "text-green-400"
                      : typedChar !== char && isCurrentWord
                      ? "text-red-500"
                      : "";
                } else if (isCurrentChar) {
                  color = "bg-orange-700 text-white font-semibold px-0.5 rounded";
                }

                return (
                  <span
                    ref={(el) => (wordsRef.current[wIndex] = el)}
                    key={charIndex}
                    className={`${color} transition-all duration-150`}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          ))}
        </div>

        {/* Input */}
        <input
          value={inputValue}
          onChange={inputChange}
          type="text"
          placeholder="Start typing..."
          className="w-full bg-zinc-900 border-t border-zinc-700 py-4 px-5 text-gray-100 text-lg font-semibold outline-none focus:ring-2 ring-green-500 transition-all placeholder-gray-400 rounded-b-2xl"
        />
      </div>

      {/* Result Modal */}
      {showResult && (
        <div className="fixed inset-0 h-screen w-screen bg-black/70 backdrop-blur-sm flex flex-col justify-center items-center z-50">
          <button
            onClick={handleClose}
            className="absolute top-10 right-10 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            Close
          </button>
          <h2 className="text-3xl font-bold text-white mb-10 tracking-wide">Result</h2>

          <div className="flex flex-wrap justify-center items-center gap-12">
            {/* Accuracy */}
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xl font-semibold text-white">Accuracy</h3>
              <div className="relative h-32 w-32 flex items-center justify-center">
                <div
                  className="absolute h-full w-full rounded-full"
                  style={{
                    background: `conic-gradient(#22c55e ${Math.floor((accuracy / wpm) * 100) * 3.6}deg, #1f2937 0deg)`,
                  }}
                ></div>
                <div className="absolute h-[85%] w-[85%] bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {Math.floor((accuracy / wpm) * 100)}%
                </div>
              </div>
            </div>

            {/* WPM */}
            <div className="flex flex-col items-center gap-3">
              <h3 className="text-xl font-semibold text-white">WPM</h3>
              <div className="relative h-32 w-32 flex items-center justify-center">
                <div
                  className="absolute h-full w-full rounded-full"
                  style={{
                    background: `conic-gradient(#06b6d4 ${Math.floor(wpm / timeValue) * 3.6}deg, #1f2937 0deg)`,
                  }}
                ></div>
                <div className="absolute h-[85%] w-[85%] bg-gray-800 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {Math.floor(wpm / timeValue)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingSpeed;
