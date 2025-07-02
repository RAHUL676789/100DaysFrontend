import React, { useState } from 'react';
import { quotes } from './Quotes';

const QuotesBox = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleNextQuote = () => {
    let index = Math.floor(Math.random() * quotes.length);
    while (index === currentQuoteIndex) {
      index = Math.floor(Math.random() * quotes.length);
    }
    setCurrentQuoteIndex(index);
  };

  // fallback in case of empty array
  if (!quotes.length) return <p>No quotes available</p>;

  const { text, author } = quotes[currentQuoteIndex];

  return (
    <div className='max-w-lg rounded-lg mx-3 bg-white shadow-md px-7 py-9 shadow-gray-600 flex gap-5 flex-col'>
      <div className='border shadow-sm shadow-gray-500 rounded-lg px-5 py-3 flex flex-col gap-3'>
        <p className='text-lg md:text-xl font-medium text-gray-800'>" {text} "</p>
        <h5 className='ml-auto font-semibold text-gray-600'>- {author}</h5>
      </div>
      <div className='flex flex-wrap justify-center'>
        <button
          onClick={handleNextQuote}
          className='border px-6 py-2 m-2 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 active:translate-y-0.5 transition'
        >
          New Quote
        </button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${text}" - ${author}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className='border px-6 py-2 m-2 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 active:translate-y-0.5 transition'
        >
          Share on Twitter
        </a>
      </div>
    </div>
  );
};

export default QuotesBox;
