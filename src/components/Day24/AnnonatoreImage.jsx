import React, { useState, useRef, useEffect } from 'react';

const AnnotatorImage = () => {
  const [stroke, setStroke] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const hasDrawn = useRef(false);
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  useEffect(() => {
    save(); // initial blank canvas
  }, []);

  const getCtx = () => canvasRef.current.getContext('2d');

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const ctx = getCtx();
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const ctx = getCtx();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
    hasDrawn.current = true;
  };

  const handleDrawEnd = () => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    if (hasDrawn.current) {
      save();
      hasDrawn.current = false;
    }
  };

  const save = () => {
    const dataURL = canvasRef.current.toDataURL();
    undoStack.current.push(dataURL);
    redoStack.current = [];
  };

  const undo = () => {
    if (undoStack.current.length <= 1) return;
    const current = undoStack.current.pop();
    redoStack.current.push(current);
    const previous = undoStack.current[undoStack.current.length - 1];
    drawFromDataURL(previous);
  };

  const redo = () => {
    if (redoStack.current.length === 0) return;
    const next = redoStack.current.pop();
    undoStack.current.push(next);
    drawFromDataURL(next);
  };

  const drawFromDataURL = (dataURL) => {
    const ctx = getCtx();
    const canvas = canvasRef.current;
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          save();
        };
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only PNG or JPEG images are allowed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">🖌️ Image Annotator Tool</h1>

      <div className="flex flex-wrap gap-6 items-center justify-center mb-6 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col items-center gap-1">
          <label className="text-sm font-medium">Stroke Color</label>
          <input
            type="color"
            value={stroke}
            onChange={(e) => setStroke(e.target.value)}
            className="w-10 h-10 border rounded-full"
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <label className="text-sm font-medium">Line Width</label>
          <input
            type="range"
            min={1}
            max={10}
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-32"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={undo}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition shadow active:scale-95"
          >
            Undo
          </button>
          <button
            onClick={redo}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition shadow active:scale-95"
          >
            Redo
          </button>
        </div>

        <div className="flex flex-col items-center gap-1">
          <label className="text-sm font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:px-3 file:py-1 file:rounded file:border-0 file:bg-blue-600 file:text-white cursor-pointer"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleDrawEnd}
          onMouseLeave={handleDrawEnd}
          className="border-4 border-blue-400 bg-white shadow-xl rounded-lg mx-auto block"
        />
      </div>
    </div>
  );
};

export default AnnotatorImage;
