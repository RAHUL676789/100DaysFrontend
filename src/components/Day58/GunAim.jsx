import React, { useState, useEffect, useRef } from "react";

const PerfectGunAim = () => {
  const gunRef = useRef();
  const [gunRotation, setGunRotation] = useState(0);
  const [bullets, setBullets] = useState([]);

  const gunX = window.innerWidth / 2;
  const gunY = window.innerHeight - 60;
  const barrelLength = 50;

  // Gun rotation
  useEffect(() => {
    const keys = { ArrowLeft: false, ArrowRight: false };
    const handleKeyDown = (e) => { if(keys[e.key]!==undefined) keys[e.key]=true; }
    const handleKeyUp = (e) => { if(keys[e.key]!==undefined) keys[e.key]=false; }

    const rotateGun = () => {
      setGunRotation(prev=>{
        let next=prev;
        if(keys.ArrowLeft) next=Math.max(prev-2,-90);
        if(keys.ArrowRight) next=Math.min(prev+2,90);
        return next;
      });
      requestAnimationFrame(rotateGun);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    rotateGun();

    return ()=>{
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, []);

  // Shoot bullet
  const shootBullet = () => {
    const angleRad = (gunRotation * Math.PI) / 180;
    const startX = gunX + Math.sin(angleRad) * barrelLength;
    const startY = gunY - Math.cos(angleRad) * barrelLength;
    const speed = 12;

    setBullets(prev => [...prev, {
      id: Date.now(),
      x: startX,
      y: startY,
      vx: Math.sin(angleRad) * speed,
      vy: -Math.cos(angleRad) * speed
    }]);
  }

  // Update bullets
  useEffect(()=>{
    const interval = setInterval(()=>{
      setBullets(prev=>{
        return prev.map(b=>({...b, x:b.x+b.vx, y:b.y+b.vy}))
                   .filter(b=>b.x>=0 && b.x<=window.innerWidth && b.y>=0 && b.y<=window.innerHeight);
      });
    },16);
    return ()=>clearInterval(interval);
  },[]);

  // Aim dots
  const angleRad = (gunRotation * Math.PI) / 180;
  const barrelTipX = gunX + Math.sin(angleRad) * barrelLength;
  const barrelTipY = gunY - Math.cos(angleRad) * barrelLength;
  const aimLength = 300;
  const dotSpacing = 12;
  const dotCount = Math.floor(aimLength/dotSpacing);
  const aimDots = Array.from({length: dotCount});

  return (
    <div className="h-screen w-screen bg-zinc-900 relative overflow-hidden">
      {/* Gun */}
      <div
        ref={gunRef}
        style={{
          left: gunX,
          bottom:0,
          transform:`translateX(-50%) rotate(${gunRotation}deg)`,
          transformOrigin:'bottom center'
        }}
        className="absolute flex justify-center items-end"
      >
        <div className="relative w-16 h-32 bg-gray-700 border-2 border-white rounded-t-3xl flex justify-center items-end">
          <div className="absolute -top-12 w-6 h-16 bg-gray-300 border-2 border-yellow-400 rounded-t-full"></div>
        </div>
      </div>

      {/* Aim dots */}
      {aimDots.map((_,i)=>{
        const x = barrelTipX + Math.sin(angleRad)*i*dotSpacing;
        const y = barrelTipY - Math.cos(angleRad)*i*dotSpacing;
        return <div key={i} style={{
          position:'absolute',
          left:x-3,
          top:y-3,
          width:6,
          height:6,
          backgroundColor:'#9f7aea',
          borderRadius:'50%',
          opacity:1-i/aimDots.length
        }}></div>
      })}

      {/* Shoot button */}
      <button onClick={shootBullet} className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-yellow-500 px-6 py-2 rounded-lg text-black font-bold hover:bg-yellow-400">SHOOT</button>

      {/* Bullets */}
      {bullets.map(b=><div key={b.id} style={{
        position:'absolute',
        left:b.x-4,
        top:b.y-4,
        width:8,
        height:8,
        backgroundColor:'#ffd700',
        borderRadius:'50%'
      }}></div>)}

    </div>
  )
}

export default PerfectGunAim;


// jb ham bullet shoot krte hai to teen cheej main hai 
// start position mtlb gun se bullet kha se niklegi 
// direction kis direction me bullet chalegi 
// speed means bullet trigger hone pr hr frame me 
// bullet ki speed kya hogi .