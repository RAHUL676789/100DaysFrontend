import React, { useRef, useState, useEffect } from 'react'

const CanvasDraw = () => {
  const canvaRef = useRef();
  const [lineWidth, setLinewidth] = useState(2);
  const [stroke, setstroke] = useState("#000000");
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const isDrawing = useRef(false);
  const hasDrawan = useRef(false);

  useEffect(() => {
    const canvas = canvaRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Save initial blank state
    save();
  }, []);

  const getContext = () => {
    return canvaRef.current.getContext("2d");
  }

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const ctx = getContext();
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  }

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const ctx = getContext();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    hasDrawan.current = true;
  }

  const drawEndin = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;

    if (hasDrawan.current) {
      save(); // Only save if drawing happened
      hasDrawan.current = false;
    }
  }

  const save = () => {
    const canva = canvaRef.current;
    const url = canva.toDataURL();
    undoStack.current.push(url);
    redoStack.current = []; // clear redo on new draw
    console.log("Undo stack updated:", undoStack.current.length);
  }

  const undo = () => {
    if (undoStack.current.length <= 1) return; 
    const canva = canvaRef.current;
    const ctx = getContext();

    const current = undoStack.current.pop(); 
    redoStack.current.push(current);

    const previous = undoStack.current[undoStack.current.length - 1];
    const img = new Image();
    img.src = previous;
    img.onload = () => {
      ctx.clearRect(0, 0, canva.width, canva.height); 
      ctx.drawImage(img, 0, 0, canva.width, canva.height);
    };
  }

  const redo = () => {
    if (redoStack.current.length === 0) return;
    const canva = canvaRef.current;
    const ctx = getContext();

    const next = redoStack.current.pop();
    undoStack.current.push(next);

    const img = new Image();
    img.src = next;
    img.onload = () => {
      ctx.clearRect(0, 0, canva.width, canva.height);
      ctx.drawImage(img, 0, 0, canva.width, canva.height);
    };
  }

  return (
    <div className="text-center p-4">
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={undo} className='px-6 py-2 bg-blue-700 text-white rounded'>Undo</button>
        <button onClick={redo} className='px-6 py-2 bg-purple-700 text-white rounded'>Redo</button>
        <input type="color" value={stroke} onChange={(e) => setstroke(e.target.value)} />
        <input type="range" min="1" max="20" value={lineWidth} onChange={(e) => setLinewidth(Number(e.target.value))} />
      </div>

      <canvas
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={drawEndin}
        onMouseLeave={drawEndin}
        ref={canvaRef}
        height={400}
        width={600}
        className='border-2 border-gray-700 mx-auto rounded-lg bg-white'
      />
    </div>
  )
}

export default CanvasDraw
