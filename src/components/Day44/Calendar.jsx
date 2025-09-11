import React, { useEffect, useRef, useState } from "react";

const Calendar = () => {
  const Months = [
    "January", "Febuary", "March", "April", "May", "June",
    "July", "August", "September", "October", "Novermber", "December"
  ];
  const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [currentMonth, setcurrentMonth] = useState(null);
  const [currentYear, setcurrentYear] = useState(null);
  const [totalDays, settotalDays] = useState(null);
  const [startDay, setstartDay] = useState(null);
  const [currentDate, setcurrentDate] = useState(null);
  const [Today, setToday] = useState(null);
  const [Time, setTime] = useState(null);
  const Timer = useRef(null);

  useEffect(() => {
    const now = new Date();
    setcurrentDate(new Date().toLocaleDateString());
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startDay = new Date(currentYear, currentMonth, 1).getDay();

    setcurrentMonth(currentMonth);
    setcurrentYear(currentYear);
    setstartDay(startDay);
    settotalDays(totalDays);
    setToday(now.getDate());
  }, []);

  useEffect(() => {
    Timer.current = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours(),
        min: now.getMinutes(),
        sec: now.getSeconds(),
      });
    }, 1000);

    return () => clearInterval(Timer.current);
  }, []);

  const handlePrev = () => {
    let m = currentMonth - 1;
    let y = currentYear;
    if (m < 0) {
      m = 11;
      y--;
    }
    updateCalendar(m, y);
  };

  const handleNext = () => {
    let m = currentMonth + 1;
    let y = currentYear;
    if (m > 11) {
      m = 0;
      y++;
    }
    updateCalendar(m, y);
  };

  const updateCalendar = (m, y) => {
    const totalDays = new Date(y, m + 1, 0).getDate();
    const startDay = new Date(y, m, 1).getDay();
    setcurrentMonth(m);
    setcurrentYear(y);
    settotalDays(totalDays);
    setstartDay(startDay);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-start py-10">
      <div className="md:w-[80%] w-[95%] bg-white shadow-2xl rounded-2xl p-6">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-center text-4xl font-extrabold font-mono text-indigo-700">
            Calendar App
          </h1>

          {/* Date + Time */}
          <div className="mt-5 flex flex-col md:flex-row justify-between items-center gap-3 bg-indigo-50 p-4 rounded-xl shadow-inner">
            <div className="text-lg font-semibold text-indigo-700">
              <span className="mr-2">📅 Date:</span>
              <span>{currentDate}</span>
            </div>
            <div className="text-lg font-semibold text-indigo-700">
              <span className="mr-2">⏰ Time:</span>
              <span>
                {Time?.hours.toString().padStart(2, 0)}:
                {Time?.min.toString().padStart(2, 0)}:
                {Time?.sec.toString().padStart(2, 0)}
              </span>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="flex justify-center gap-5 mt-6">
            <button
              onClick={handlePrev}
              className="px-6 py-2 rounded-lg font-semibold bg-indigo-500 text-white shadow-md hover:bg-indigo-600 transition"
            >
              ⬅ Prev
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg font-semibold bg-indigo-500 text-white shadow-md hover:bg-indigo-600 transition"
            >
              Next ➡
            </button>
          </div>
        </header>

        {/* Main */}
        <main>
          <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">
            {Months[currentMonth]} - {currentYear}
          </h1>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-3 text-center">
            
            {/* Days header */}
            {Days.map((item, i) => (
              <div
                key={i}
                className="font-bold flex items-center justify-center h-12 bg-indigo-600 text-white rounded-lg shadow-md"
              >
                {item}
              </div>
            ))}

            {/* Empty slots */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`}></div>
            ))}

            {/* Dates */}
            {Array.from({ length: totalDays }).map((_, i) => (
              <div
                key={i}
                className={`flex items-center justify-center h-12 w-12 mx-auto rounded-full font-semibold cursor-pointer shadow-md transition 
                ${i + 1 === Today
                    ? "bg-yellow-400 ring-2 ring-indigo-600"
                    : "bg-gray-50 hover:bg-indigo-100"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Calendar;
