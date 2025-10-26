import React, { useState, useEffect } from 'react';

const RollDivGame = () => {
  const [divList, setDivList] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const maxDivs = 10;
  const spawnInterval = 1500;

  // Spawn random divs
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setDivList(prev => {
        if(prev.length >= maxDivs){
          setGameOver(true);
          return prev;
        }
        const id = Date.now() + Math.random();
        const size = 50 + Math.random()*30;
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size - 100);
        const gradient = `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})`;
        return [...prev, {id, x, y, size, gradient}];
      });
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [gameOver]);

  // Handle div click → explode into fragments
  const handleKill = (div) => {
    setScore(prev => prev + 1);
    const fragmentsCount = 20;
    const centerX = div.x + div.size/2;
    const centerY = div.y + div.size/2;

    for(let i=0;i<fragmentsCount;i++){
      const frag = document.createElement('div');
      const moveX = (Math.random()-0.5)*150;
      const moveY = (Math.random()-0.5)*150;
      const size = 4 + Math.random()*6;
      const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      frag.style.position = 'absolute';
      frag.style.width = `${size}px`;
      frag.style.height = `${size}px`;
      frag.style.borderRadius = '50%';
      frag.style.backgroundColor = color;
      frag.style.left = `${centerX}px`;
      frag.style.top = `${centerY}px`;
      frag.style.transition = 'all 0.8s ease-out';
      frag.style.pointerEvents = 'none';
      document.body.appendChild(frag);

      setTimeout(()=>{
        frag.style.transform = `translate(${moveX}px,${moveY}px) rotate(${Math.random()*360}deg) scale(${Math.random()*1.2})`;
        frag.style.opacity = 0;
      },10);

      setTimeout(()=>frag.remove(),900);
    }

    setDivList(prev => prev.filter(d => d.id !== div.id));
  }

  return (
    <div className='h-screen w-screen bg-gradient-to-br from-purple-900 via-indigo-950 to-pink-900 relative overflow-hidden select-none'>
      <h1 className='absolute top-4 left-4 text-white text-3xl font-bold shadow-lg'>Score: {score}</h1>

      {gameOver &&
        <div className='absolute inset-0 bg-black/85 flex flex-col justify-center items-center'>
          <h2 className='text-5xl font-extrabold text-red-500 mb-4 animate-pulse'>Game Over</h2>
          <p className='text-white text-xl'>Final Score: {score}</p>
        </div>
      }

      {divList.map(div => (
        <div key={div.id} onClick={()=>handleKill(div)}
          style={{
            position:'absolute',
            left: div.x,
            top: div.y,
            width: div.size,
            height: div.size,
            background: div.gradient,
            borderRadius:'12px',
            border:'2px solid rgba(255,255,255,0.8)',
            cursor:'pointer',
            boxShadow:'4px 6px 14px rgba(0,0,0,0.6)',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'2xl',
            color:'white',
            fontWeight:'bold',
            transform:'rotate(15deg)',
            transition:'transform 0.3s, box-shadow 0.3s, opacity 0.5s'
          }}
          className='hover:scale-110 hover:shadow-2xl hover:rotate-0'
        >
          🎲
        </div>
      ))}
    </div>
  )
}

export default RollDivGame;
