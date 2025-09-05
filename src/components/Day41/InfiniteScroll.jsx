import React, { useEffect, useState, useRef } from "react";

const InfiniteScroll = () => {
  const renderableLength = 5;
  const [scrollElements, setScrollElements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef();

  useEffect(() => {
    generateData(renderableLength);
  }, []);

  const generateData = async (dataLength) => {
    if (isLoading || !hasMore) return;
    try {
      setIsLoading(true);

      await generateItem(dataLength);

      const newItems = Array.from({ length: dataLength }, () => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        content: Math.floor(Math.random() * 99999 + 1000),
        updatedAt: Date.now(),
      }));

      setScrollElements((prev) => [...prev, ...newItems]); // ✅ push once
      if (scrollElements.length + newItems.length >= 50) {
        setHasMore(false); // stop after 50 items
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateItem = async () => {
    return new Promise((res) => {
      setTimeout(() => res("success"), 1000);
    });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || isLoading) return;

    const { scrollTop, scrollHeight, clientHeight } = container;

    
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      generateData(renderableLength);
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-black/20 z-50">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="bg-white w-full md:w-[75%] rounded-lg shadow-sm shadow-gray-300 h-screen mx-auto overflow-y-auto box-border"
      >
        <div className="px-4 py-2 sticky top-0 bg-white border-b border-b-gray-300 text-center">
          <h1 className="font-semibold text-xl">InfiniteScroll</h1>
        </div>

        <div className="px-4 py-2 w-full relative">
          {scrollElements.map((item, i) => (
            <div
              key={item.id}
              className="w-[70%] h-[200px] shadow-sm shadow-gray-500 rounded-lg mx-auto my-5 px-5 py-1 flex justify-center items-center flex-col"
            >
              <span className="font-semibold text-xl px-5 py-2.5 rounded-full bg-gray-800 text-white">
                {i + 1}
              </span>
              <p className="text-4xl font-semibold mx-auto">{item.content}</p>
            </div>
          ))}

          {isLoading && (
            <div className="animate-bounce px-3 py-2 rounded-xl bg-green-800 text-white font-semibold border shadow-sm shadow-gray-500 w-fit mt-5 mx-auto">
              Loading...
            </div>
          )}

          {!hasMore && (
            <p className="text-center text-gray-600 font-medium mt-4">
              🎉 No more items
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
