// src/hooks/useRevealAnimation.js
import { useEffect } from 'react';
import gsap from 'gsap';

const useRevealAnimation = (dependency) => {
  useEffect(() => {
    const elements = document.querySelectorAll(".animated-image");

    gsap.fromTo(
      elements,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [dependency]);
};

export default useRevealAnimation;
