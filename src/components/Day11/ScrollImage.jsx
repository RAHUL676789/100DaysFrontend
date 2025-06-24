import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1695384287398-5781a1f51c31?q=80",
  "https://images.unsplash.com/photo-1639020715359-f03b05835829?q=80",
  "https://images.unsplash.com/photo-1694763891594-3b19ad17dec1?q=80",
  "https://images.unsplash.com/photo-1716547286289-3e650d7bdf7a?q=80",
  "https://images.unsplash.com/photo-1689581916399-fb9e1e56c21f?q=80",
];

const ImageSlider3D = () => {
  const [angle, setAngle] = useState(0);
  const total = images.length;
  const rotateStep = 360 / total;

  const handleNext = () => setAngle((prev) => prev - rotateStep);
  const handlePrev = () => setAngle((prev) => prev + rotateStep);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div
        className="relative w-[300px] h-[300px] perspective-[1000px] mb-10"
      >
        <div
          className="w-full h-full relative transform-style-preserve-3d transition-transform duration-700"
          style={{ transform: `rotateY(${angle}deg)` }}
        >
          {images.map((src, i) => {
            const rotation = i * rotateStep;
            return (
              <div
                key={i}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transform: `rotateY(${rotation}deg) translateZ(400px)`,
                }}
              >
                <img
                  src={src}
                  alt="carousel"
                  className="w-full h-full object-cover rounded-xl border-4 border-white shadow-lg"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-5">
        <button
          onClick={handlePrev}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageSlider3D;
