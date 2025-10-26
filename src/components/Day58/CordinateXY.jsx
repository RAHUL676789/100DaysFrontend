import React, { useState, useEffect, useRef } from 'react'


const CordinateXY = () => {
    const [angle, setangle] = useState(90);
    const parentRef = useRef(null); // parent container (screen)
    const [bullets, setbullets] = useState([]);
    const [target, settarget] = useState({ x: 100, y: 50, height: 50, width: 50 });
    const [showFragement, setshowFragement] = useState(false)

    useEffect(() => {
        const moveBullets = () => {
            setbullets(prev =>
                prev.map((b) => {
                    const rad = (b.angle * Math.PI) / 180;

                    // new position
                    const newX = b.x + 8 * Math.cos(rad);
                    const newY = b.y - 8 * Math.sin(rad);

                    // hit detection
                    if (
                        newX > target.x &&
                        newX < target.x + target.width &&
                        newY > target.y &&
                        newY < target.y + target.height
                    ) {
                        console.log('Hit!');

                        setshowFragement(true);
                        setTimeout(() => {
                             setshowFragement(false);
                        }, 1000);
                        return null; 
                    } else if(newX < 0 || newY < 0) {
                      return null;
                    }

                    return { ...b, x: newX, y: newY };
                }).filter(Boolean)
            );

            requestAnimationFrame(moveBullets);
        };

        moveBullets();
    }, [target]);

    const handleShoot = () => {
        if (!parentRef.current) return;

        const rect = parentRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height - 50; // gun position bottom-ish

        setbullets(prev => [...prev, { x: centerX, y: centerY, angle }]);
    };



    return (
        <div ref={parentRef} className='h-screen relative w-screen border bg-gray-300 flex flex-col justify-end items-center'>
            <h1 className='absolute top-4 text-2xl font-semibold text-blue-800'>Movement with angle</h1>
            <h2 className='absolute top-12 text-red-800 font-semibold text-lg'>Angle: {angle}°</h2>

            {/* Target */}
            {
                !showFragement && <div
                    style={{
                        height: target.height,
                        width: target.width,
                        top: target.y,
                        left: target.x,
                    }}
                    className='absolute border bg-gradient-to-b from-orange-500 to-green-700'
                >



                </div>
            }

            {showFragement && Array.from({ length: 34 }).fill("_").map((item, i) => {

                const moveX = Math.floor(Math.random() * (-200) + 100); const moveY = Math.floor(Math.random() * (-200) + 100);
                const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

                return <div style={{
                    top:target.y,
                    left:target.x,
                    "--moveX": `${moveX}px`,
                    "--moveY": `${moveY}px`,
                    animation: `blast 700ms forwards ease-out`,
                    backgroundColor: randomColor
                }} className='animate-[blast_1000ms_forwards] h-1 absolute w-1 '>
                </div>

            })}

            {/* Bullets */}
            {
                bullets.map((b, i) => (
                    <div
                        key={i}
                        style={{ left: b.x, top: b.y }}
                        className='h-2 w-2 rounded-full bg-purple-900 absolute'
                    ></div>
                ))
            }

            {/* Controls */}
            <div className='flex mb-8'>
                <button
                    onClick={() => setangle(prev => prev + 10)}
                    className='px-4 py-2 rounded bg-blue-900 m-2 text-white font-semibold cursor-pointer'
                >
                
                </button>
                <button
                    onClick={() => setangle(prev => prev - 10)}
                    className='px-4 py-2 rounded bg-blue-900 m-2 text-white font-semibold cursor-pointer'
                >
                    Decrease angle
                </button>
                <button
                    onClick={handleShoot}
                    className='px-4 py-2 rounded bg-yellow-500 m-2 text-white font-semibold cursor-pointer'
                >
                    Shoot
                </button>
            </div>

           
        </div >
    );
};

export default CordinateXY;
