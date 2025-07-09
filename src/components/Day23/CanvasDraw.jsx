import React, { useRef } from 'react'

const CanvasDraw = () => {
    const canvaRef = useRef(null);
    const lastPoint = useRef({ x: 0, y: 0 });
    const isDrwaing = useRef(false);

    const getCanvacord = (e) => {
        const canva = canvaRef.current;
        const rect = canva.getBoundingClientRect();

        return {
            x: e.clientX - rect.left, y: e.clientY - rect.top
        }
    }

    const handleMouseDown = (e) => {
        isDrwaing.current = true;

        lastPoint.current = getCanvacord(e);
    }

    const handleMouseMove = (e) => {
        if (!isDrwaing.current) return;
        const canva = canvaRef.current;
        const ctx = canva.getContext("2d");
        ctx.strokeStyle = "purple";
        ctx.lineWidth = 2;
        const { x, y } = getCanvacord(e);
        const { x: lastX, y: lastY } = lastPoint.current;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        lastPoint.current = { x, y };
    }

    const handleMouseUp = (e) => {
        isDrwaing.current = false;
    }

    const clearWithResize = () => {
        const canvas = canvaRef.current;
        canvas.width = canvas.width; // Resets everything
    };
    return (
        <div>
            <canvas
                ref={canvaRef}
                height={300}
                width={400}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                className='border-2 border-blue-500 mx-auto'
            >

            </canvas>

            <button onClick={clearWithResize}>clear</button>

        </div>
    )
}

export default CanvasDraw
