import React, { useEffect, useRef, useState } from "react";

const CropImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [crop, setCrop] = useState({ x: 50, y: 50, width: 200, height: 200 });
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const resizeDirection = useRef(null);
  const startPos = useRef({ x: 0, y: 0, width: 0, height: 0, cropX: 0, cropY: 0 });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImageUrl(URL.createObjectURL(file));
  };

  // ---- Move ----
  const handleMouseDown = (e) => {
    if (e.target.dataset.handle) return; // skip if clicked on resize handle
    isDragging.current = true;
    startPos.current = {
      x: e.clientX - crop.x,
      y: e.clientY - crop.y,
    };
  };

  // ---- Resize ----
  const handleResizeStart = (e, dir) => {
    e.stopPropagation();
    isResizing.current = true;
    resizeDirection.current = dir;
    startPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: crop.width,
      height: crop.height,
      cropX: crop.x,
      cropY: crop.y,
    };
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      setCrop((prev) => ({
        ...prev,
        x: e.clientX - startPos.current.x,
        y: e.clientY - startPos.current.y,
      }));
    }

    if (isResizing.current) {
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      let newCrop = { ...crop };

      switch (resizeDirection.current) {
        case "right":
          newCrop.width = startPos.current.width + dx;
          break;
        case "bottom":
          newCrop.height = startPos.current.height + dy;
          break;
        case "bottom-right":
          newCrop.width = startPos.current.width + dx;
          newCrop.height = startPos.current.height + dy;
          break;
        case "left":
          newCrop.x = startPos.current.cropX + dx;
          newCrop.width = startPos.current.width - dx;
          break;
        case "top":
          newCrop.y = startPos.current.cropY + dy;
          newCrop.height = startPos.current.height - dy;
          break;
        case "top-left":
          newCrop.x = startPos.current.cropX + dx;
          newCrop.width = startPos.current.width - dx;
          newCrop.y = startPos.current.cropY + dy;
          newCrop.height = startPos.current.height - dy;
          break;
        case "top-right":
          newCrop.y = startPos.current.cropY + dy;
          newCrop.height = startPos.current.height - dy;
          newCrop.width = startPos.current.width + dx;
          break;
        case "bottom-left":
          newCrop.x = startPos.current.cropX + dx;
          newCrop.width = startPos.current.width - dx;
          newCrop.height = startPos.current.height + dy;
          break;
        default:
          break;
      }

      if (newCrop.width > 20 && newCrop.height > 20) {
        setCrop(newCrop);
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isResizing.current = false;
    resizeDirection.current = null;
  };

  // ---- Canvas Preview ----
  useEffect(() => {
    if (!canvasRef.current || !imageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y, width, height } = crop;
    const img = imageRef.current;

    const scaleX = img.naturalWidth / img.clientWidth;
    const scaleY = img.naturalHeight / img.clientHeight;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(
      img,
      x * scaleX,
      y * scaleY,
      width * scaleX,
      height * scaleY,
      0,
      0,
      width,
      height
    );
  }, [crop, imageUrl]);

  return (
    <div
      className="min-h-screen w-screen flex justify-center items-center gap-6 bg-gray-900 text-white"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      
      {/* Image + Cropper */}
      <div className="relative h-[70vh] w-[50vw] flex justify-center items-center border select-none border-gray-400 rounded-lg overflow-hidden">
        {!imageUrl ? (
          <label className="px-4 py-2 bg-purple-600 rounded cursor-pointer">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        ) : (
          <div className="relative w-full h-full">
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Crop target"
              className="h-full w-full object-contain"
            />

            {/* Crop Box */}
            <div
              onMouseDown={handleMouseDown}
              style={{
                top: crop.y,
                left: crop.x,
                width: crop.width,
                height: crop.height,
              }}
              className="absolute border-2 border-yellow-400 bg-yellow-400/10"
            >
              {/* Handles */}
              {[
                "top-left",
                "top",
                "top-right",
                "right",
                "bottom-right",
                "bottom",
                "bottom-left",
                "left",
              ].map((dir) => (
                <div
                  key={dir}
                  data-handle
                  onMouseDown={(e) => handleResizeStart(e, dir)}
                  className="absolute w-3 h-3 bg-white border border-black rounded-full"
                  style={{
                    cursor: `c-resize`,
                    ...(dir.includes("top") && { top: "-6px" }),
                    ...(dir.includes("bottom") && { bottom: "-6px" }),
                    ...(dir.includes("left") && { left: "-6px" }),
                    ...(dir.includes("right") && { right: "-6px" }),
                    ...(dir === "top" || dir === "bottom"
                      ? { left: "50%", transform: "translateX(-50%)" }
                      : {}),
                    ...(dir === "left" || dir === "right"
                      ? { top: "50%", transform: "translateY(-50%)" }
                      : {}),
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      {imageUrl && (
        <div className="flex flex-col items-center bg-white text-black p-4 rounded shadow-lg">
          <p className="font-semibold mb-2">Preview</p>
          <canvas ref={canvasRef} className="border rounded" />
        </div>
      )}
    </div>
  );
};

export default CropImage;
