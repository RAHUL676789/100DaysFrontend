import React, { useState, useEffect, useRef } from "react";

const BulletTrigger = () => {
  const [angle, setAngle] = useState(0);
  const [bullets, setBullets] = useState([]);
  const gunRef = useRef(null);

  const handleShoot = () => {
    const gun = gunRef.current?.getBoundingClientRect();
    if (!gun) return;

    setBullets((prev) => [
      ...prev,
      {
        x: gun.left + gun.width / 2,
        y: gun.top,
        angle,
      },
    ]);
  };

  useEffect(() => {
    const moveBullets = () => {
      setBullets((prev) =>
        prev
          .map((b) => {
            const rad = (b.angle * Math.PI) / 180;
            return {
              ...b,
              x: b.x + 8 * Math.cos(rad),
              y: b.y - 8 * Math.sin(rad), // going UP
            };
          })
          .filter((b) => b.y > 0 && b.x > 0 && b.x < window.innerWidth) // remove bullets outside screen
      );

      requestAnimationFrame(moveBullets);
    };

    moveBullets(); // <-- Important: call it
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-end items-center gap-3 relative">
      <div className="absolute top-5 text-red-700 text-xl">Angle: {angle}°</div>

      {bullets.map((b, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: "6px",
            height: "6px",
            background: "yellow",
            borderRadius: "50%",
          }}
        />
      ))}

      <button
        onClick={() => setAngle((prev) => prev + 10)}
        className="px-3 py-2 bg-blue-500 text-white rounded"
      >
        Increase Angle
      </button>

      <button
        onClick={() => setAngle((prev) => prev - 10)}
        className="px-3 py-2 bg-blue-500 text-white rounded"
      >
        Decrease Angle
      </button>

      <button
        onClick={handleShoot}
        ref={gunRef}
        className="px-5 py-3 bg-red-500 text-white font-semibold rounded mt-4"
      >
        SHOOT
      </button>
    </div>
  );
};

export default BulletTrigger;
