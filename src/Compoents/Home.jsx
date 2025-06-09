import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const FadeInSection = ({ children }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // 👀 if visible
      },
      {
        threshold: 0.3, // 30% dikh gaya toh trigger karo
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="p-10 bg-white rounded shadow my-10"
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-10">🚀 Intersection Observer Demo</h1>
      <div style={{ height: '100vh' }} /> {/* Spacer */}

      {[1, 2, 3].map((item) => (
        <FadeInSection key={item}>
          <h2 className="text-xl">👋 Section {item}</h2>
          <p>This content fades in on scroll using Intersection Observer!</p>
        </FadeInSection>
      ))}

      <div style={{ height: '100vh' }} /> {/* Spacer */}
    </div>
  );
};

export default App;
