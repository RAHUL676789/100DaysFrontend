import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

export default function ThreeDProductShowcase() {
  const products = useMemo(
    () => [
      {
        id: 1,
        title: "Aurora Headphones",
        price: 12999,
        tag: "New",
        img: "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?fm=jpg&q=60&w=3000",
        desc: "Wireless, ANC, 40h battery, Type-C fast charge.",
      },
      {
        id: 2,
        title: "Nimbus Camera",
        price: 55999,
        tag: "Pro",
        img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        desc: "24MP APS-C, 4K60, IBIS, weather sealed.",
      },
      {
        id: 3,
        title: "Vertex Sneakers",
        price: 4999,
        tag: "Hot",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
        desc: "Breathable knit, cloud foam, all-day comfort.",
      },
      {
        id: 4,
        title: "Flux Smartwatch",
        price: 9999,
        tag: "Sale",
        img: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=800&q=80",
        desc: "AMOLED display, SpO₂, GPS, 7-day battery.",
      },
      {
        id: 5,
        title: "Lumen Lamp",
        price: 2999,
        tag: "Eco",
        img: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?auto=format&fit=crop&w=800&q=80",
        desc: "Warm dimmable LED, USB-C, touch control.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hovering, setHovering] = useState(false);

  const count = products.length;
  const radius = 360;
  const angleStep = 360 / count;

  const clampIndex = (i) => (i + count) % count;

  const goTo = (i) => {
    setPrevIndex(index);
    setIndex(clampIndex(i));
  };
  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  // Auto-rotate
  useEffect(() => {
    if (!autoRotate || hovering) return;
    const id = setInterval(() => goNext(), 2800);
    return () => clearInterval(id);
  }, [autoRotate, hovering, goNext]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  // Pointer controls
  const startX = useRef(0);
  const delta = useRef(0);
  const dragging = useRef(false);
  const onPointerDown = (e) => {
    dragging.current = true;
    setAutoRotate(false);
    startX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    delta.current = x - startX.current;
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    if (Math.abs(delta.current) > 40) delta.current < 0 ? goNext() : goPrev();
    delta.current = 0;
  };

  // 🔄 Updated Carousel Item Logic for Gradual Effect
  const items = products.map((p, i) => {
    const offset = (i - index + count) % count;
    const rotY = offset * angleStep;
    const dist = Math.min(offset, count - offset);
    
    // Gradual scaling and opacity
    const scale = 1 - Math.min(dist * 0.12, 0.45);
    const opacity = 1 - Math.min(dist * 0.25, 0.75);
    
    // Gradual blur
    const blur = dist * 1.5;

    return { p, rotY, scale, opacity, blur, dist };
  });

  const active = products[index];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-white flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">✨ 3D Product Showcase</h1>
        <button
          onClick={() => setAutoRotate((s) => !s)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600/80 to-purple-600/80 hover:from-fuchsia-500 hover:to-purple-500 px-4 py-2 transition"
        >
          {autoRotate ? <Pause size={18} /> : <Play size={18} />}
          <span className="text-sm hidden sm:block">
            {autoRotate ? "Pause" : "Play"}
          </span>
        </button>
      </div>

      {/* Carousel */}
      <div
        className="relative w-full max-w-6xl h-[520px] flex items-center justify-center"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <motion.div
          className="relative w-full h-full [perspective:1600px]"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          <motion.div
            key={index}
            className="absolute inset-0 [transform-style:preserve-3d]"
            animate={{ rotateY: -index * angleStep }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            style={{ transform: `translateZ(-220px)` }}
          >
            {items.map(({ p, rotY, scale, opacity, blur, dist }, idx) => (
              <motion.button
                key={p.id}
                onClick={() => goTo(idx)}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-300
                  ${idx === index ? "shadow-fuchsia-500/40 z-10" : "z-0"}`}
                style={{
                  transform: `rotateY(${rotY }deg) translateZ(${radius}px) scale(${scale})`,
                  opacity,
                  filter: `blur(${0}px)`,
                  // Set pointer-events to none for images behind the active one, preventing accidental clicks.
                  pointerEvents: dist > 2 ? 'none' : 'auto', 
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative w-[240px] h-[320px] rounded-2xl overflow-hidden bg-zinc-900/40 border border-white/10">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    draggable={false}
                  />
                  {/* Product Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-zinc-900">
                      {p.tag}
                    </span>
                  </div>
                  {/* Product Info */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <p className="text-sm text-zinc-300">{p.title}</p>
                    <p className="text-lg font-semibold">₹{p.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Glow effect */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-24 rounded-full bg-gradient-to-r from-fuchsia-500/30 to-purple-500/30" />
        </motion.div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-800/60 hover:bg-zinc-700 z-20"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-800/60 hover:bg-zinc-700 z-20"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Active product details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-4 bg-zinc-900/60 border border-white/10 rounded-2xl p-6 shadow-xl">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{active.title}</h2>
              <p className="text-zinc-300 leading-relaxed">{active.desc}</p>
            </div>
            <div className="flex md:flex-col gap-3">
              <button className="flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white font-medium px-5 py-3 shadow hover:shadow-lg transition">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button className="flex justify-center items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-3 border border-white/10">
                View Details
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}