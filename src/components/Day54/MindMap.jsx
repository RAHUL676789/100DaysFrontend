import React, { useState, useRef, useEffect } from 'react'

const MindMap = () => {
    const [nodes, setnodes] = useState([]);
    const [lines, setlines] = useState([]);
    const containerRef = useRef(null)
    const drawingRef = useRef(null);
    const [moveableDiv, setmoveableDiv] = useState(null)
    const handleCreateNode = (e) => {
        if (!containerRef.current) return;


        const rect = containerRef.current.getBoundingClientRect();
        console.log(rect)
        console.log(e.clientX, e.clientY)
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newNodePos = { x, y };
        setnodes((prev) => [...prev, newNodePos])


    }

    const handdivMouseDown = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x1 = rect.left + rect.width / 2;
        const y1 = rect.top + rect.height / 2;
        const newLines = { x1, y1, x2: x1, y2: y1 };
        setlines((prev) => [...prev, newLines]);
        console.log(lines)
        drawingRef.current = lines.length;

    }

    const handleMouseMove = (e) => {

     if (drawingRef.current === null || drawingRef.current === undefined) return;


        if(moveableDiv < 0 || moveableDiv === null){
               const updateLines = [...lines];
        updateLines[drawingRef.current] = {
            ...updateLines[drawingRef.current],
            x2: e.clientX,
            y2: e.clientY
        }

        setlines(updateLines)
        }

        if(moveableDiv>=0){
            const updateNode = [...nodes];
            updateNode[moveableDiv]={
                x:e.clientX,
                y:e.clientY
            }
            setnodes(updateNode)
            const updateLines = [...lines];
            updateLines[drawingRef.current]={
                ...updateLines[drawingRef.current],
                x1:e.clientX,
                y1:e.clientY
            }
        }

    }
    const handlemouseUp = (e) => {
        e.stopPropagation()
        drawingRef.current = null;
        setmoveableDiv(null)
    }

    const handleLineMosueDown = (ind) => {
        console.log("handleLineClick")
        drawingRef.current = ind;
    }

    const handleDivClick = (e,i)=>{
        e.stopPropagation();
        setmoveableDiv(i)
    }

  

    return (
        <div onMouseUp={handlemouseUp} onMouseMove={handleMouseMove} ref={containerRef} onDoubleClick={handleCreateNode} className='min-h-screen w-screen border relative overflow-scroll'>
            {/* <h1 className='text-center text-3xl font-semibold'>MindMap-app</h1> */}
            <svg className='absolute  w-full h-full'>
                {
                    lines.length > 0 && lines.map((item, i) => (
                        <line onMouseDown={() => handleLineMosueDown(i)} key={i} stroke='blue' strokeWidth="4" x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2}>
                            line

                        </line>
                    ))
                }

            </svg>

            {
                nodes.length > 0 && nodes.map((node, i) => (
                    <div contentEditable onClick={(e)=>handleDivClick(e,i)} onMouseDown={handdivMouseDown} key={i} style={{ top: node.y, left: node.x }} className='absolute select-none h-12 w-12 border rounded-full bg-pink-700 flex justify-center items-center overflow-scroll no-scrollbar text-[10px] text-white '>
                        hello

                    </div>
                ))
            }


        </div>
    )
}

export default MindMap
