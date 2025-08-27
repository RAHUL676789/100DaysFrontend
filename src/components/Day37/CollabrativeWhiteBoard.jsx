import React, { useEffect, useRef, useState } from "react";

// LayeredWhiteboard.jsx
// Single-file React component (default export)
// Features:
// - 3 stacked canvas layers: background, drawing, UI (preview)
// - Brush + Eraser tools with size/color controls
// - Undo / Redo (snapshot-based per-stroke)
// - Export (merge layers into one image)
// - Supports mouse + touch

export default function LayeredWhiteboard({ width = 900, height = 520 }) {
  const bgRef = useRef(null);
  const drawRef = useRef(null);
  const uiRef = useRef(null);

  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // stacks store dataURLs of draw layer only
  const undoStack = useRef([]);
  const redoStack = useRef([]);

  // UI state
  const [tool, setTool] = useState("brush"); // brush | eraser | rect
  const [color, setColor] = useState("#0f172a");
  const [size, setSize] = useState(4);
  const [eraserSize, setEraserSize] = useState(24);
  const [isPointerDown, setIsPointerDown] = useState(false);

  // shape preview state (for rectangle tool)
  const rectStart = useRef(null);

  useEffect(() => {
    // initialize background layer (grid + white)
    const bg = bgRef.current;
    const ctx = bg.getContext("2d");
    ctx.clearRect(0, 0, bg.width, bg.height);
    // fill white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, bg.width, bg.height);

    // draw subtle grid
    const gap = 32;
    ctx.strokeStyle = "rgba(0,0,0,0.03)";
    ctx.lineWidth = 1;
    for (let x = gap; x < bg.width; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, bg.height);
      ctx.stroke();
    }
    for (let y = gap; y < bg.height; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(bg.width, y + 0.5);
      ctx.stroke();
    }

    // save initial blank draw layer state
    saveSnapshot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getCanvasPos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.round((clientX - rect.left) * (canvas.width / rect.width)),
      y: Math.round((clientY - rect.top) * (canvas.height / rect.height)),
    };
  }

  function beginStroke(e) {
    const draw = drawRef.current;
    const ctx = draw.getContext("2d");
    const pos = getCanvasPos(e, draw);
    isDrawing.current = true;
    lastPos.current = pos;

    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);

    // pointer state
    setIsPointerDown(true);

    // rect tool start
    if (tool === "rect") rectStart.current = pos;
  }

  function moveStroke(e) {
    if (!isDrawing.current) return;
    const draw = drawRef.current;
    const ui = uiRef.current;
    const dctx = draw.getContext("2d");
    const uictx = ui.getContext("2d");

    const pos = getCanvasPos(e, draw);

    if (tool === "rect") {
      // draw preview rectangle in UI layer
      uictx.clearRect(0, 0, ui.width, ui.height);
      uictx.setLineDash([6, 6]);
      uictx.lineWidth = 1.5;
      uictx.strokeStyle = "rgba(15,23,42,0.8)";
      const start = rectStart.current;
      if (!start) return;
      const x = Math.min(start.x, pos.x);
      const y = Math.min(start.y, pos.y);
      const w = Math.abs(pos.x - start.x);
      const h = Math.abs(pos.y - start.y);
      uictx.strokeRect(x + 0.5, y + 0.5, w, h);
      return;
    }

    // normal brush / eraser drawing on draw layer
    if (tool === "brush") {
      dctx.globalCompositeOperation = "source-over";
      dctx.strokeStyle = color;
      dctx.lineWidth = size;
      dctx.lineCap = "round";
      dctx.lineJoin = "round";
    } else if (tool === "eraser") {
      dctx.globalCompositeOperation = "destination-out";
      dctx.lineWidth = eraserSize;
      dctx.lineCap = "round";
      dctx.lineJoin = "round";
    }

    dctx.lineTo(pos.x, pos.y);
    dctx.stroke();

    lastPos.current = pos;
  }

  function endStroke(e) {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    setIsPointerDown(false);

    // commit rectangle from ui layer to draw layer
    if (tool === "rect") {
      const draw = drawRef.current;
      const dctx = draw.getContext("2d");
      const ui = uiRef.current;
      const uictx = ui.getContext("2d");
      const start = rectStart.current;
      if (start) {
        const pos = getCanvasPos(e, draw);
        const x = Math.min(start.x, pos.x);
        const y = Math.min(start.y, pos.y);
        const w = Math.abs(pos.x - start.x);
        const h = Math.abs(pos.y - start.y);

        dctx.globalCompositeOperation = "source-over";
        dctx.fillStyle = color;
        dctx.fillRect(x, y, w, h);
      }
      // clear ui preview
      uictx.clearRect(0, 0, ui.width, ui.height);
      rectStart.current = null;
    }

    // after stroke finished, push snapshot for undo
    saveSnapshot();
  }

  function saveSnapshot() {
    const draw = drawRef.current;
    if (!draw) return;
    try {
      const url = draw.toDataURL();
      undoStack.current.push(url);
      // limit stack size to avoid huge memory usage
      if (undoStack.current.length > 60) undoStack.current.shift();
      // clear redo on new action
      redoStack.current = [];
    } catch (err) {
      console.warn("snapshot failed", err);
    }
  }

  function undo() {
    if (undoStack.current.length <= 1) return; // keep at least one state
    const draw = drawRef.current;
    const ctx = draw.getContext("2d");

    const current = undoStack.current.pop();
    redoStack.current.push(current);
    const previous = undoStack.current[undoStack.current.length - 1];

    const img = new Image();
    img.src = previous;
    img.onload = () => {
      ctx.clearRect(0, 0, draw.width, draw.height);
      ctx.drawImage(img, 0, 0, draw.width, draw.height);
    };
  }

  function redo() {
    if (redoStack.current.length === 0) return;
    const draw = drawRef.current;
    const ctx = draw.getContext("2d");

    const next = redoStack.current.pop();
    undoStack.current.push(next);

    const img = new Image();
    img.src = next;
    img.onload = () => {
      ctx.clearRect(0, 0, draw.width, draw.height);
      ctx.drawImage(img, 0, 0, draw.width, draw.height);
    };
  }

  function clearAll() {
    const draw = drawRef.current;
    const ctx = draw.getContext("2d");
    ctx.clearRect(0, 0, draw.width, draw.height);
    // push blank state
    saveSnapshot();
  }

  function exportMerged() {
    // merge bg + draw + ui into temporary canvas
    const out = document.createElement("canvas");
    out.width = width;
    out.height = height;
    const octx = out.getContext("2d");

    octx.drawImage(bgRef.current, 0, 0);
    octx.drawImage(drawRef.current, 0, 0);
    octx.drawImage(uiRef.current, 0, 0);

    const url = out.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "whiteboard.png";
    a.click();
  }

  // pointer/touch friendly wrappers
  function attachPointerEvents(canvas) {
    // mouse
    canvas.onpointerdown = (e) => beginStroke(e);
    canvas.onpointermove = (e) => moveStroke(e);
    window.onpointerup = (e) => endStroke(e);

    // prevent default touch scroll on canvas
    canvas.ontouchstart = (ev) => ev.preventDefault();
  }

  useEffect(() => {
    // attach pointer events to UI canvas (receives interactions)
    const ui = uiRef.current;
    attachPointerEvents(ui);
    // make sure draw and ui canvases have same size as bg
    [bgRef.current, drawRef.current, uiRef.current].forEach((c) => {
      c.width = width;
      c.height = height;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-3 w-full max-w-5xl">
        <div className="flex gap-2">
          <button
            onClick={() => setTool("brush")}
            className={`px-3 py-1 rounded ${tool === "brush" ? "bg-sky-600 text-white" : "bg-gray-100"}`}>
            Brush
          </button>
          <button
            onClick={() => setTool("eraser")}
            className={`px-3 py-1 rounded ${tool === "eraser" ? "bg-rose-500 text-white" : "bg-gray-100"}`}>
            Eraser
          </button>
          <button
            onClick={() => setTool("rect")}
            className={`px-3 py-1 rounded ${tool === "rect" ? "bg-amber-500 text-white" : "bg-gray-100"}`}>
            Rect
          </button>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Color</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Brush</label>
          <input type="range" min={1} max={40} value={size} onChange={(e) => setSize(Number(e.target.value))} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Eraser</label>
          <input type="range" min={6} max={120} value={eraserSize} onChange={(e) => setEraserSize(Number(e.target.value))} />
        </div>

        <div className="ml-auto flex gap-2">
          <button onClick={undo} className="px-3 py-1 rounded bg-gray-100">Undo</button>
          <button onClick={redo} className="px-3 py-1 rounded bg-gray-100">Redo</button>
          <button onClick={clearAll} className="px-3 py-1 rounded bg-gray-100">Clear</button>
          <button onClick={exportMerged} className="px-3 py-1 rounded bg-emerald-500 text-white">Export</button>
        </div>
      </div>

      <div style={{ width, height }} className="relative shadow-lg border rounded overflow-hidden">
        <canvas ref={bgRef} className="absolute top-0 left-0" />
        <canvas ref={drawRef} className="absolute top-0 left-0" />
        <canvas
          ref={uiRef}
          className="absolute top-0 left-0"
          style={{ touchAction: "none", cursor: tool === "eraser" ? "crosshair" : "crosshair" }}
        />
      </div>

      <div className="text-xs text-gray-500 max-w-5xl">Tip: Use the UI layer for temporary previews (rectangle). Undo/redo only tracks the draw layer (brush & eraser strokes and committed shapes).</div>
    </div>
  );
}
