import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSpring, animated as a } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

const testimonials = [
  {
    name: "Rahul Lodhi",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1626639900752-3ea9001925ae?q=80",
    message: "This platform transformed the way I work. Truly professional!",
  },
  {
    name: "Sanya Mehra",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1616268164880-673b3ba611bb?q=80",
    message: "Clean design and seamless experience. Loved it!",
  },
  {
    name: "Aman Verma",
    role: "Marketing Head",
    image: "https://images.unsplash.com/photo-1749223928612-e7f5e9a2211f?q=80",
    message: "Boosted our conversions like magic!",
  },
];

function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef(null);
  const isDragging = useRef(false);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto Slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging.current) nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animation when current changes
  useLayoutEffect(() => {
    if (!isDragging.current && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [current]);

  // Drag Animation using react-spring
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  const bind = useDrag(
    ({ down, movement: [mx], direction: [xDir], velocity }) => {
      isDragging.current = down;
      const trigger = velocity > 0.3;

      if (!down && trigger) {
        xDir > 0 ? prevSlide() : nextSlide();
      }

      api.start({ x: down ? mx : 0, immediate: down });
    },
    { filterTaps: true }
  );

  const { name, role, image, message } = testimonials[current];

  return (
    <div className="w-full max-w-xl mx-auto bg-gray-950 p-6 rounded-xl shadow-xl text-white select-none">
      <a.div
        {...bind()}
        ref={cardRef}
        style={{ x }}
        className="bg-gray-800 p-6 rounded-xl shadow-md cursor-grab active:cursor-grabbing transition-all"
      >
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-400">{role}</p>
        <p className="mt-3 text-gray-200 leading-relaxed">{`“${message}”`}</p>
      </a.div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={prevSlide}
          className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-md transition"
        >
          ⬅ Prev
        </button>
        <button
          onClick={nextSlide}
          className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-md transition"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default TestimonialSlider;
