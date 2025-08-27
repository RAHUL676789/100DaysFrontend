import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * LayeredWhiteboard
 *
 * Props:
 *   - boardId (optional): string id for file naming on export
 *   - width (optional): canvas width (default 900)
 *   - height (optional): canvas height (default 520)
 *
 * Features:
 *  - layered canvases: background, draw, ui (preview)
 *  - action-based history: actions = [{ id, tool, color, size, points }]
 *  - undo/redo that correctly replays actions (eraser included)
 *  - export merged PNG of background+draw+ui
 *  - pointer-friendly (pointer events)
 *
 * Usage:
 *  <LayeredWhiteboard width={900} height={520} boardId={'main-1'} />
 *
 * Notes:
 *  - No external dependencies except uuid (for simple IDs)
 *  - This is single-board; later you can wrap multiple boards in a BoardManager.
 */

export default function LayeredWhiteboard({
  boardId = null,
  width = 900,
  height = 520,
}) {
  // refs to canvases
  const bgRef = useRef(null);
  const drawRef = useRef(null);
  const uiRef = useRef(null);

  // drawing state
  const isPointerDown = useRef(false);
  const currentAction = useRef(null); // { id, tool, color, size, points: [] }

  // action history (action-based)
  const actionsRef = useRef([]); // committed actions (draw layer)
  const redoRef = useRef([]); // redo stack

  // UI state
  const [tool, setTool] = useState("brush"); // 'brush' | 'eraser' | 'rect' (rect included)
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [eraserSize, setEraserSize] = useState(24);
  const [showGuides, setShowGuides] = useState(false);
  const [maxHistory] = useState(80); // cap history to avoid memory blowup

  // ---- init canvases ----
  useEffect(() => {
    // set sizes
    [bgRef, drawRef, uiRef].forEach((r) => {
      if (r.current) {
        r.current.width = width;
        r.current.height = height;
        // ensure css size matches (avoid scaling issues)
        r.current.style.width = `${width}px`;
        r.current.style.height = `${height}px`;
      }
    });

    // draw background (white + subtle grid)
    const bg = bgRef.current.getContext("2d");
    bg.clearRect(0, 0, width, height);
    bg.fillStyle = "#ffffff";
    bg.fillRect(0, 0, width, height);

    if (showGuides) {
      const gap = 32;
      bg.strokeStyle = "rgba(0,0,0,0.03)";
      bg.lineWidth = 1;
      for (let x = gap; x < width; x += gap) {
        bg.beginPath();
        bg.moveTo(x + 0.5, 0);
        bg.lineTo(x + 0.5, height);
        bg.stroke();
      }
      for (let y = gap; y < height; y += gap) {
        bg.beginPath();
        bg.moveTo(0, y + 0.5);
        bg.lineTo(width, y + 0.5);
        bg.stroke();
      }
    }

    // ensure draw layer cleared
    const dctx = drawRef.current.getContext("2d");
    dctx.clearRect(0, 0, width, height);

    // initial actions empty
    actionsRef.current = [];
    redoRef.current = [];
  }, [width, height, showGuides]);

  // ---- utilities ----
  function getCanvasPointFromEvent(e, canvas) {
    // supports pointer events and touch fallback
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    // map to canvas coordinates (handles css scaling)
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    return { x: Math.round(x), y: Math.round(y) };
  }

  function beginAction(point) {
    currentAction.current = {
      id: uuidv4(),
      tool,
      color,
      size: tool === "eraser" ? eraserSize : brushSize,
      points: [point],
    };
    isPointerDown.current = true;
  }

  function pushPoint(point) {
    if (!currentAction.current) return;
    currentAction.current.points.push(point);
  }

  function commitAction() {
    const action = currentAction.current;
    if (!action) return;
    // small actions with <2 points can be ignored optionally
    if (!action.points || action.points.length === 0) {
      currentAction.current = null;
      isPointerDown.current = false;
      return;
    }
    // push into actions history
    actionsRef.current.push(action);
    // limit size
    if (actionsRef.current.length > maxHistory) {
      actionsRef.current.shift();
    }
    // clear redo stack on new action
    redoRef.current = [];
    currentAction.current = null;
    isPointerDown.current = false;
    // redraw draw layer
    redrawDrawLayer();
  }

  // redraw draw layer by replaying actions
  function redrawDrawLayer() {
    const canvas = drawRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // replay each action
    for (let action of actionsRef.current) {
      drawActionOnContext(ctx, action);
    }
  }

  // draw a single action on provided context
  function drawActionOnContext(ctx, action) {
    ctx.save();
    if (action.tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = action.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < action.points.length; i++) {
        const p = action.points[i];
        if (i === 0) ctx.moveTo(p.x + 0.001, p.y + 0.001); // avoid weird line at same point
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = action.color || "#000";
      ctx.lineWidth = action.size || 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i < action.points.length; i++) {
        const p = action.points[i];
        if (i === 0) ctx.moveTo(p.x + 0.001, p.y + 0.001);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // ---- pointer event handlers (attached to UI canvas) ----
  function handlePointerDown(e) {
    // left-click / primary only
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const pt = getCanvasPointFromEvent(e, drawRef.current);
    beginAction(pt);
    // If tool is rect, we preview on UI layer (we'll treat rect separately)
    if (tool === "rect") {
      // start rect stored as currentAction with first point
      // preview draws rectangle on uiRef during pointer move
    } else {
      // for brush/eraser we draw incremental immediately to draw layer for low-latency local feedback
      // start a small immediate sub-draw so there's no gap before next pointermove
      const ctx = drawRef.current.getContext("2d");
      drawActionOnContext(ctx, currentAction.current);
    }
    // ensure pointer capture so we get move/up outside canvas too
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // ignore if not supported
    }
  }

  function handlePointerMove(e) {
    if (!isPointerDown.current) {
      // could still show hover previews etc
      return;
    }
    const pt = getCanvasPointFromEvent(e, drawRef.current);
    // add point
    pushPoint(pt);

    // update UI or draw layer in an incremental fashion
    // we'll incrementally draw last segment to draw layer for immediate feedback,
    // but persistent storage is via actionsRef on commit
    const ctx = drawRef.current.getContext("2d");
    // Draw last two points as a segment to avoid replaying all actions each move
    const action = currentAction.current;
    if (!action) return;

    // For better visuals: drawActionOnContext on a copy of last segment
    ctx.save();
    if (action.tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = action.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = action.color;
      ctx.lineWidth = action.size;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
    // draw from second last to last
    const pts = action.points;
    if (pts.length >= 2) {
      const a = pts[pts.length - 2];
      const b = pts[pts.length - 1];
      ctx.beginPath();
      ctx.moveTo(a.x + 0.001, a.y + 0.001);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.restore();

    // if rect tool we should render preview on UI canvas
    if (tool === "rect") {
      const ui = uiRef.current;
      const uctx = ui.getContext("2d");
      uctx.clearRect(0, 0, ui.width, ui.height);
      const start = action.points[0];
      const x = Math.min(start.x, pt.x);
      const y = Math.min(start.y, pt.y);
      const w = Math.abs(pt.x - start.x);
      const h = Math.abs(pt.y - start.y);
      uctx.setLineDash([6, 6]);
      uctx.lineWidth = 1.5;
      uctx.strokeStyle = "rgba(10,10,10,0.8)";
      uctx.strokeRect(x + 0.5, y + 0.5, w, h);
    }
  }

  function handlePointerUp(e) {
    if (!isPointerDown.current) return;
    // release pointer capture
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}
    // For rect: commit rectangle fill to draw layer
    if (tool === "rect") {
      const action = currentAction.current;
      if (action) {
        // derive rectangle from points[0] and last point
        const p0 = action.points[0];
        const p1 = action.points[action.points.length - 1] || p0;
        const x = Math.min(p0.x, p1.x);
        const y = Math.min(p0.y, p1.y);
        const w = Math.abs(p1.x - p0.x);
        const h = Math.abs(p1.y - p0.y);
        const ctx = drawRef.current.getContext("2d");
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = action.color;
        ctx.fillRect(x, y, w, h);
        ctx.restore();
        // clear ui preview
        const uctx = uiRef.current.getContext("2d");
        uctx.clearRect(0, 0, uiRef.current.width, uiRef.current.height);
      }
    } else {
      // brush/eraser: currentAction has been partially drawn incremental; final commit will be action-based
      // BUT since we drew incremental segments directly on the draw layer, we must ensure redraw consistency.
      // Our commit stores the full action for replay on undo/redo.
    }

    // commit action to history and redraw from actionsRef to ensure canonical state
    commitAction();
  }

  // commitAction uses functions above; implement separately here to access closure
  function commitAction() {
    const action = currentAction.current;
    if (!action) {
      isPointerDown.current = false;
      return;
    }
    // minimal validation: need at least 1 point
    if (!action.points || action.points.length === 0) {
      currentAction.current = null;
      isPointerDown.current = false;
      return;
    }
    // push
    actionsRef.current.push(action);
    if (actionsRef.current.length > maxHistory) actionsRef.current.shift();
    // clear redo
    redoRef.current = [];
    // reset
    currentAction.current = null;
    isPointerDown.current = false;
    // redraw full canonical draw layer from actions
    redrawDrawLayer();
  }

  // Exposed controls: undo / redo / clear / export
  function undo() {
    if (actionsRef.current.length === 0) return;
    const a = actionsRef.current.pop();
    if (a) redoRef.current.push(a);
    redrawDrawLayer();
  }

  function redo() {
    if (redoRef.current.length === 0) return;
    const a = redoRef.current.pop();
    actionsRef.current.push(a);
    redrawDrawLayer();
  }

  function clearAll() {
    actionsRef.current = [];
    redoRef.current = [];
    const ctx = drawRef.current.getContext("2d");
    ctx.clearRect(0, 0, drawRef.current.width, drawRef.current.height);
  }

  function exportMerged() {
    // create offscreen canvas and draw bg + draw + ui
    const out = document.createElement("canvas");
    out.width = width;
    out.height = height;
    const octx = out.getContext("2d");

    // background
    octx.drawImage(bgRef.current, 0, 0);
    // draw contents (actions)
    octx.drawImage(drawRef.current, 0, 0);
    // UI (usually empty, but include)
    octx.drawImage(uiRef.current, 0, 0);

    const url = out.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `whiteboard-${boardId || uuidv4()}.png`;
    a.click();
  }

  // create a new action when pointer starts (hooked to UI element)
  // we create action object with initial point in beginAction called earlier
  // wrapper so UI buttons can toggle tools
  function startPointer(e) {
    // if pointer events are used, event passes DOM PointerEvent; transform to similar object
    const pt = getCanvasPointFromEvent(e, drawRef.current);
    beginAction(pt);
    // if tool is rect, we'll keep points to compute rect
    // else brush/eraser: already seeded
    // call handler similar to pointerdown
    // prevent default so touch doesn't scroll
    e.preventDefault && e.preventDefault();
  }

  // helper to start action using pointer events (to be attached to ui canvas)
  // We'll attach handlers directly in JSX using onPointerDown etc that call the top handlers.

  // small UI for tool toggles and sliders
  return (
    <div style={{ userSelect: "none", fontFamily: "Inter, Arial, sans-serif" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <button
            onClick={() => setTool("brush")}
            style={{
              padding: "6px 10px",
              background: tool === "brush" ? "#0ea5e9" : "#f3f4f6",
              color: tool === "brush" ? "white" : "black",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Brush
          </button>
          <button
            onClick={() => setTool("eraser")}
            style={{
              padding: "6px 10px",
              background: tool === "eraser" ? "#fb7185" : "#f3f4f6",
              color: tool === "eraser" ? "white" : "black",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Eraser
          </button>
          <button
            onClick={() => setTool("rect")}
            style={{
              padding: "6px 10px",
              background: tool === "rect" ? "#f59e0b" : "#f3f4f6",
              color: tool === "rect" ? "white" : "black",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Rect
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label style={{ fontSize: 13 }}>Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            disabled={tool === "eraser"}
          />
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label style={{ fontSize: 13 }}>Brush</label>
          <input
            type="range"
            min={1}
            max={60}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            disabled={tool === "eraser"}
          />
          <span style={{ fontSize: 13 }}>{brushSize}px</span>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label style={{ fontSize: 13 }}>Eraser</label>
          <input
            type="range"
            min={6}
            max={160}
            value={eraserSize}
            onChange={(e) => setEraserSize(Number(e.target.value))}
            disabled={tool !== "eraser"}
          />
          <span style={{ fontSize: 13 }}>{eraserSize}px</span>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={undo} style={btn}>Undo</button>
          <button onClick={redo} style={btn}>Redo</button>
          <button onClick={clearAll} style={btn}>Clear</button>
          <button onClick={exportMerged} style={{ ...btn, background: "#10b981", color: "white" }}>Export</button>
        </div>
      </div>

      <div style={{ width, height, position: "relative", borderRadius: 8, overflow: "hidden", boxShadow: "0 10px 30px rgba(2,6,23,0.15)" }}>
        <canvas ref={bgRef} style={{ position: "absolute", left: 0, top: 0 }} />

        <canvas ref={drawRef} style={{ position: "absolute", left: 0, top: 0 }} />

        {/* UI layer receives pointer events */}
        <canvas
          ref={uiRef}
          style={{ position: "absolute", left: 0, top: 0, touchAction: "none", cursor: tool === "eraser" ? "crosshair" : "crosshair" }}
          onPointerDown={(e) => {
            // prevent default to avoid scrolling on touch
            e.preventDefault();
            const pt = getCanvasPointFromEvent(e, drawRef.current);
            beginAction(pt);
            // set pointer capture so move/up fire even outside
            try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
          }}
          onPointerMove={(e) => {
            e.preventDefault();
            // if not started yet and pointer is down, start could be missing due to some edge; but we require pointerdown
            // add point & draw incrementally
            handlePointerMove(e);
          }}
          onPointerUp={(e) => {
            e.preventDefault();
            handlePointerUp(e);
          }}
          onPointerCancel={(e) => {
            e.preventDefault();
            handlePointerUp(e);
          }}
        />
      </div>
    </div>
  );
}

// small style helper
const btn = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid rgba(0,0,0,0.08)",
  cursor: "pointer",
  background: "#f3f4f6",
};
