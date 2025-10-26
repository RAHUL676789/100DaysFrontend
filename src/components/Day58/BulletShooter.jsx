import React, { useState, useEffect, useRef, useCallback } from "react";



const BulletShooter = () => {
    // angle: 0 = right, 90 = up, 180 = left, etc (we keep same UX as your original)
    const [angle, setAngle] = useState(90);
    const parentRef = useRef(null);
    const bulletsRef = useRef([]); // mutable array of bullets for RAF loop
    const [bullets, setBullets] = useState([]); // used to render bullets (mirrors bulletsRef)
    const targetRef = useRef({ x: 100, y: 120, width: 60, height: 60 });
    const [target, setTarget] = useState(targetRef.current);
    const [showFragments, setShowFragments] = useState(false);
    const [fragments, setFragments] = useState([]); // stores fragment data for pixel explosion
    const rafIdRef = useRef(null);
    const hitCooldownRef = useRef(false);
    const maxMisses = 5;

    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Colors for N2 (Neon Matrix Hacker)
    const COLORS = {
        bg: "rgb(6,10,10)",
        neon: "#0aff8b", // toxic green
        neonDim: "#08c06b",
        neonAccent: "#66ffb3",
    };

    // Initialize and run RAF loop once
    useEffect(() => {
        let lastTime = performance.now();

        const move = (time) => {
            const dt = (time - lastTime) / 16.6667; // ~frames scale (1 == 60fps)
            lastTime = time;

            const bArr = bulletsRef.current;
            for (let i = bArr.length - 1; i >= 0; i--) {
                const b = bArr[i];
                const rad = (b.angle * Math.PI) / 180;
                const speed = 10; // pixels per frame baseline
                b.x += Math.cos(rad) * speed * dt;
                b.y -= Math.sin(rad) * speed * dt;

                // hit detection (use current targetRef)
                const t = targetRef.current;
                if (b.x > t.x && b.x < t.x + t.width && b.y > t.y && b.y < t.y + t.height) {
                    // remove bullet
                    bArr.splice(i, 1);
                    // trigger hit only if not in cooldown
                    if (!hitCooldownRef.current) {
                        handleTargetHit();
                    }
                    continue;
                }

                // out of bounds
                if (b.x < -50 || b.y < -50 || b.x > window.innerWidth + 50 || b.y > window.innerHeight + 50) {
                    bArr.splice(i, 1);
                      handleMiss();
                }
            }

            // update state for rendering
            if (bArr.length !== bullets.length) {
                setBullets(bArr.slice());
            } else if (bArr.length > 0) {
                // still update positions to animate smoothly
                // to avoid excessive setState we can throttle, but here it's fine
                setBullets(bArr.slice());
            }

            rafIdRef.current = requestAnimationFrame(move);
        };

        rafIdRef.current = requestAnimationFrame(move);

        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once

    // Keep targetRef in sync
    useEffect(() => {
        targetRef.current = target;
    }, [target]);

    // Shoot handler
    const handleShoot = useCallback(() => {
        if (!parentRef.current) return;
        // parent is placed inside the main container; compute gun tip center
        const rect = parentRef.current.getBoundingClientRect();
        // center horizontally, a bit above center to align with gun
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const newBullet = {
            x: centerX,
            y: centerY,
            angle: angle, // degrees
            id: Date.now() + Math.random(),
        };

        // add to the mutable ref array
        bulletsRef.current.push(newBullet);
        // mirror to state for render
        setBullets(bulletsRef.current.slice());

        // small recoil effect (visual only)
        parentRef.current.animate(
            [
                { transform: "translateY(0px)" },
                { transform: "translateY(-4px)" },
                { transform: "translateY(0px)" },
            ],
            { duration: 120, easing: "cubic-bezier(.2,.9,.2,1)" }
        );
    }, [angle]);

    // When target is hit: show pixel explosion & relocate target
    const handleTargetHit = useCallback(() => {
        // cooldown to avoid multiple hits in the same frame
        hitCooldownRef.current = true;
        setShowFragments(true);

        // generate fragments (B1 pixel explosion)
        const count = 34;
        const frag = Array.from({ length: count }).map(() => {
            const speed = Math.random() * 6 + 3; // px/frame baseline
            const angle = Math.random() * Math.PI * 2;
            return {
                id: Math.random().toString(36).slice(2, 9),
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                // initial position from current targetRef
                x: targetRef.current.x + targetRef.current.width / 2,
                y: targetRef.current.y + targetRef.current.height / 2,
                color: randomNeonColor(), // neon green variations
            };
        });
        setFragments(frag);

        // hide fragments after animation & respawn target
        setTimeout(() => {
            setShowFragments(false);
            // new random position within viewport bounds (avoid edges)
            const newX = Math.floor(Math.random() * (window.innerWidth - 200)) + 80;
            const newY = Math.floor(Math.random() * (window.innerHeight - 260)) + 120;
            const newTarget = { x: newX, y: newY, width: 60, height: 60 };
            setTarget(newTarget);
            setScore((prev)=>prev + 10)
            targetRef.current = newTarget;
            // release cooldown after short delay
            setTimeout(() => {
                hitCooldownRef.current = false;
            }, 250);
        }, 900);
    }, []);

    // helper: random neon green shade
    function randomNeonColor() {
        const greens = ["#00ff6a", "#0aff8b", "#03d976", "#08c06b", "#66ffb3"];
        return greens[Math.floor(Math.random() * greens.length)];
    }

    // fragments animation loop (moves fragment positions)
    useEffect(() => {
        if (!showFragments) return;

        let running = true;
        const fragRef = { data: fragments.slice() };
        // initialize fragRef.data with current fragments if blank
        if (fragRef.data.length === 0) {
            // safety: in case fragments not set yet
            fragRef.data = fragments.slice();
        }

        let last = performance.now();
        const tick = (t) => {
            if (!running) return;
            const dt = (t - last) / 16.6667;
            last = t;
            // integrate velocities with slight gravity and drag
            let changed = false;
            fragRef.data.forEach((f) => {
                f.vy += 0.3 * dt; // gravity-ish
                f.vx *= 0.995; // drag
                f.vy *= 0.995;
                f.x += f.vx * dt;
                f.y += f.vy * dt;
                changed = true;
            });
            if (changed) {
                // update state for render
                setFragments(fragRef.data.slice());
            }
            requestAnimationFrame(tick);
        };
        const id = requestAnimationFrame(tick);

        return () => {
            running = false;
            cancelAnimationFrame(id);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showFragments]);

    // Utility: clamp angle between 0 and 360 for display
    const displayAngle = ((angle % 360) + 360) % 360;

    const handleMiss = () => {
        setMisses((p) => {
            const updated = p + 1;
            if (updated >= maxMisses) {
                setGameOver(true);
            }
            return updated;
        });
    };


    const handleRestart = () => {
        setScore(0);
        setMisses(0);
        setGameOver(false);
        bulletsRef.current = [];
        setBullets([]);
        const newX = Math.floor(Math.random() * (window.innerWidth - 200)) + 80;
        const newY = Math.floor(Math.random() * (window.innerHeight - 260)) + 120;
        const newTarget = { x: newX, y: newY, width: 60, height: 60 };
        setTarget(newTarget);
        targetRef.current = newTarget;
    };

    return (
        <div
            className="w-screen h-screen relative overflow-hidden select-none"
            style={{ background: `radial-gradient(ellipse at top left, rgba(0,8,0,0.6), ${COLORS.bg})` }}
        >
            {/* Top-right HUD */}
            <div className="absolute right-6 top-6 text-sm text-green-200/90 font-mono text-right">
                <div className="text-lg font-semibold text-green-400">Score: {score}</div>
                <div className="flex justify-end gap-1 mt-1">
                    {Array.from({ length: maxMisses }).map((_, i) => (
                        <div
                            key={i}
                            className="h-2 w-6 bg-red-500 rounded"
                            style={{ opacity: misses > i ? 0.2 : 1, transition: "opacity 0.3s" }}
                        />
                    ))}
                </div>
            </div>

            {/* embedded styles for keyframes + neon glow */}
            <style>{`
        .neon-target {
          box-shadow: 0 0 10px ${COLORS.neon}, 0 0 30px ${COLORS.neonDim}, inset 0 0 6px rgba(0,0,0,0.4);
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .bullet {
          box-shadow: 0 0 8px ${COLORS.neon}, 0 0 18px rgba(6, 255, 150, 0.12);
          transform: translate(-50%,-50%);
        }

        .gun-bottom {
          box-shadow: 0 4px 18px rgba(0,0,0,0.7), 0 0 16px ${COLORS.neonDim};
        }

        @keyframes pixel-pop {
          0% { transform: translate(0,0) scale(1); opacity: 1; filter: drop-shadow(0 0 6px ${COLORS.neon}); }
          100% { transform: translate(var(--tx), var(--ty)) scale(0.9); opacity: 0; }
        }

        /* muzzle flash */
        .muzzle-flash {
          animation: flash 140ms ease-out;
        }
        @keyframes flash {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.6); }
        }
      `}</style>

            {/* Header / HUD */}
            <div className="absolute left-6 top-6 text-sm text-green-200/90">
                <div className="font-mono text-xs mb-1">NEON MATRIX SHOOTER</div>
                <div className="font-semibold text-lg" style={{ color: COLORS.neonAccent }}>
                    Angle: {Math.round(displayAngle)}°
                </div>
            </div>

            {/* Target */}
            {!showFragments && (
                <div
                    className="neon-target absolute flex items-center justify-center"
                    style={{
                        left: target.x,
                        top: target.y,
                        width: target.width,
                        height: target.height,
                        background: `linear-gradient(180deg, rgba(10,40,10,0.95), rgba(0,20,0,0.85))`,
                    }}
                >
                    <div
                        className="w-[28px] h-[28px] rounded-full"
                        style={{
                            boxShadow: `0 0 12px ${COLORS.neon}, 0 0 28px ${COLORS.neonDim}`,
                            background: `radial-gradient(circle at 30% 30%, ${COLORS.neonAccent}, ${COLORS.neon})`,
                        }}
                    />
                </div>
            )}

            {/* Pixel Fragments (B1) */}
            {showFragments &&
                fragments.map((f) => {
                    // compute transform and size
                    const tx = `${Math.round(f.x - (targetRef.current.x + targetRef.current.width / 2))}px`;
                    const ty = `${Math.round(f.y - (targetRef.current.y + targetRef.current.height / 2))}px`;
                    const size = Math.max(2, Math.floor(Math.random() * 4));
                    return (
                        <div
                            key={f.id}
                            className="absolute"
                            style={{
                                left: targetRef.current.x + targetRef.current.width / 2,
                                top: targetRef.current.y + targetRef.current.height / 2,
                                width: size,
                                height: size,
                                borderRadius: 1,
                                background: f.color,
                                transform: `translate(-50%,-50%)`,
                                // animate using keyframes but we set target translation via inline variable
                                // we emulate CSS variable by using 'animation' + directly setting transform each frame via fragments state updates
                                // here we use CSS animation for fade but rely on state for position
                                boxShadow: `0 0 8px ${f.color}`,
                                // use transform for position (we already update f.x/f.y via RAF and state)
                                left: f.x,
                                top: f.y,
                                opacity: 1,
                                transition: "opacity 500ms linear",
                            }}
                        />
                    );
                })}

            {/* Bullets */}
            {bullets.map((b) => (
                <div
                    key={b.id}
                    className="bullet absolute rounded-full"
                    style={{
                        left: b.x,
                        top: b.y,
                        width: 8,
                        height: 8,
                        background: `radial-gradient(circle at 30% 30%, ${COLORS.neonAccent}, ${COLORS.neon})`,
                    }}
                />
            ))}

            {/* Gun + Controls container (bottom center) */}
            <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
                <div className="mb-4 text-green-200/80 font-mono text-xs">Use buttons to rotate & shoot</div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setAngle((p) => p + 5)}
                        className="px-4 py-2 rounded bg-transparent border border-green-800 text-green-200 hover:bg-green-900/10"
                        title="Rotate left (+5°)"
                    >
                        ◀
                    </button>

                    {/* gun container */}
                    <div
                        ref={parentRef}
                        className="relative w-40 h-24 flex items-center justify-center"
                        style={{
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15))",
                            borderRadius: 12,
                            padding: 8,
                            boxShadow: `0 8px 30px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,120,0.02)`,
                        }}
                    >
                        {/* gun pivot */}
                        <div
                            className="relative"
                            style={{
                                transform: `rotate(${90 - angle}deg)`, // same math as your original
                                transition: "transform 120ms linear",
                                transformOrigin: "50% 65%",
                            }}
                        >
                            {/* barrel */}
                            <div
                                className="gun-bottom rounded-md"
                                style={{
                                    width: 10,
                                    height: 64,
                                    background: "linear-gradient(180deg,#012,#022)",
                                    borderRadius: 8,
                                    position: "absolute",
                                    left: "50%",
                                    marginLeft: -5,
                                    top: "50%",
                                    marginTop: -32,
                                }}
                            />
                            {/* barrel tip (muzzle) */}
                            <div
                                id="muzzle"
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: 12,
                                    marginLeft: -6,
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    background: `radial-gradient(circle at 30% 30%, ${COLORS.neonAccent}, ${COLORS.neon})`,
                                    boxShadow: `0 0 12px ${COLORS.neon}, 0 0 30px ${COLORS.neonDim}`,
                                }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setAngle((p) => p - 5)}
                        className="px-4 py-2 rounded bg-transparent border border-green-800 text-green-200 hover:bg-green-900/10"
                        title="Rotate right (-5°)"
                    >
                        ▶
                    </button>

                    <button
                        onClick={() => {
                            // muzzle flash (tiny element that appears & fades)
                            const muzzle = document.getElementById("muzzle");
                            if (muzzle) {
                                muzzle.classList.add("muzzle-flash");
                                setTimeout(() => muzzle.classList.remove("muzzle-flash"), 160);
                            }
                            handleShoot();
                        }}
                        className="px-4 py-2 rounded bg-gradient-to-r from-green-400 to-green-600 text-black font-semibold shadow-lg"
                    >
                        SHOOT
                    </button>
                </div>
            </div>

            {gameOver && (
  <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold text-white mb-4">GAME OVER</h1>
    <h2 className="text-xl text-white mb-4">Score: {score}</h2>
    <button
      onClick={handleRestart}
      className="px-4 py-2 rounded bg-yellow-500 font-semibold text-white"
    >
      Restart
    </button>
  </div>
)}


            {/* small footer HUD */}
            <div className="absolute left-6 bottom-6 text-xs text-green-300/70 font-mono">
                Bullets: {bullets.length}
            </div>
        </div>
    );
};

export default BulletShooter;
