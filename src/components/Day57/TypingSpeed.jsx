import React, { useState, useEffect, useRef } from "react";
import { quotes } from "./quotes.js";

const TypingSpeed = () => {
  const [time, setTime] = useState(1);
  const [timerValue, setTimerValue] = useState(0);
  const [typingData, setTypingData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef(null);

  // initialize timer
  useEffect(() => {
    setTimerValue(time * 60);
  }, [time]);

  // select random quote on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setTypingData(quotes[randomIndex]);
  }, []);

  // stop timer when reaches 0
  useEffect(() => {
    if (timerValue <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      handleShowResult();
    }
  }, [timerValue]);

  const handleStart = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimerValue((prev) => prev - 1);
    }, 1000);
    setHasStarted(true);
  };

  const handleStartTyping = (e) => {
    if (!hasStarted) handleStart();
    setInputValue(e.target.value);
  };

  const handleShowResult = () => {
    const originalWords = typingData.trim().split(/\s+/);
    const typedWords = inputValue.trim().split(/\s+/);

    let correct = 0;
    for (let i = 0; i < typedWords.length; i++) {
      if (typedWords[i] === originalWords[i]) correct++;
    }

    const elapsedTime = time * 60 - timerValue;
    const minutes = elapsedTime / 60;
    const wpm = Math.round(correct / minutes || 0);
    const accuracy = ((correct / originalWords.length) * 100).toFixed(2);

    setResults({ accuracy, wpm });
    setHasStarted(false);
  };

  return (
    <div className="h-screen w-screen bg-gray-800 flex flex-col justify-center items-center">
      <div className="w-[75%] rounded-lg shadow-lg h-[90vh] bg-zinc-700 px-5 py-3 flex flex-col gap-3">
        {/* Header */}
        <header className="flex flex-wrap justify-center gap-3 items-center">
          <div
            className={`text-red-400 flex gap-1 font-semibold ${
              hasStarted && "animate-pulse"
            }`}
          >
            <span>Time left:</span>
            <p>
              {Math.floor(timerValue / 60).toString().padStart(2, "0")}:
              {Math.floor(timerValue % 60).toString().padStart(2, "0")}
            </p>
          </div>
          <h1 className="text-2xl font-semibold text-white text-center">
            ⚡ Typing Speed Test ⚡
          </h1>

          <label htmlFor="time" className="text-white mx-2">
            Set Time (min):
          </label>
          <input
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            id="time"
            type="number"
            min={1}
            max={5}
            className="border bg-gray-300 text-center font-semibold rounded-lg w-16"
          />
        </header>

        {/* Typing Text */}
        <div className="flex-1 px-3 py-2 overflow-y-scroll no-scrollbar bg-zinc-800 rounded-lg text-gray-400 text-lg leading-8 tracking-wide">
          {typingData}
        </div>

        {/* Typing Box */}
        <input
          value={inputValue}
          onChange={handleStartTyping}
          type="text"
          placeholder="Start typing here..."
          className="w-full py-3 px-4 rounded-lg bg-gray-900 text-gray-200 outline-none"
        />
      </div>

      {results && (
        <div className="mt-5 text-white text-lg bg-gray-700 px-5 py-3 rounded-lg shadow-md">
          <p>
            Accuracy: <strong>{results.accuracy}%</strong>
          </p>
          <p>
            Words Per Minute: <strong>{results.wpm}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default TypingSpeed;
