import React, { useState, useEffect, useRef } from 'react'

const MindMap = () => {
    const [showNodeOptions, setshowNodeOptions] = useState({
        circleOptions: false,
        squareOptions: false
    })

    const circleRef = useRef(null);
    const squareRef = useRef(null);

    const lineRef = useRef(null);
    const div1Ref = useRef(null)
    const div2Ref = useRef(null);


    const handleNodeOptions = (e, key) => {
        e.stopPropagation();
        setshowNodeOptions((prev) => {
            return { ...prev, [key]: !prev[key] }
        })
    }

    const handleCreateNode = (className) => {
        return <div contentEditable className={className}>

        </div>
    }

    useEffect(() => {
        const handleMouseDown = (event) => {
            console.log("mousedown")

            console.log(event.target !== circleRef.current)
            console.log(event.target)
            console.log(showNodeOptions.circleOptions)

            if (event.target !== circleRef.current && (showNodeOptions.circleOptions)) {

                setshowNodeOptions((prev) => {
                    return {
                        ...prev,
                        circleOptions: prev.circleOptions ? false : true
                    }
                })
            }

            if (event.target !== squareRef.current && showNodeOptions.squareOptions) {
                setshowNodeOptions((prev) => {
                    return {
                        ...prev,
                        squareOptions: false
                    }
                })
            }

        }

        window.addEventListener("mousedown", handleMouseDown)

        return () => window.removeEventListener("mousedown", handleMouseDown)
    }, [showNodeOptions])

    function getCenter(el) {
        console.log(el)
        const rect = el.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        }
    }

    useEffect(() => {
        const hadnleMouseMove = (e) => {
            const box1Center = getCenter(div1Ref?.current);
            console.log(box1Center)
            const line = lineRef.current;

           
            line.setAttribute("x2", e.clientX);
            line.setAttribute("y2", e.clientY);

        }

        const handleClick = (e)=>{
             const line = lineRef.current;
             const container = document.querySelector(".cont")
             const rect = container.getBoundingClientRect()

            line.setAttribute("x1", rect.left - e.clientX);
            line.setAttribute("y1", rect.top - e.clientY);
        }

        document.addEventListener("mousemove", hadnleMouseMove)
        document.addEventListener("click",handleClick)

        return () => document.removeEventListener("mousedown", handleMouseDown)
    }, [])


    return (
        <div className='h-screen w-screen px-5 py-6'>
            <div className='h-full w-full flex-col flex'>
                <h1 className='text-center text-2xl font-semibold'>MindMap-App</h1>
                <header className='w-full mt-2 py-3'>
                    <div className='w-full flex border justify-center gap-4 py-2 items-center'>
                        <h3>Choose node type</h3>
                        <div className="circle relative flex justify-center items-center">
                            <div className='cursor-pointer h-6 w-6 rounded-full border'>

                            </div>
                            <i ref={circleRef} onClick={(e) => handleNodeOptions(e, "circleOptions")} className={`ri-arrow-down-s-line ${showNodeOptions.circleOptions ? "rotate-0" : "rotate-180"}`}></i>
                            <div className={`circle-options absolute  h-32 w-28 -right-22 bg-white z-50 top-6  transition-all shadow-md shadow-gray-600 duration-300 ${showNodeOptions.circleOptions ? " translate-y-0 " : "-translate-y-[2%] opacity-0"} overflow-scroll no-scrollbar flex flex-wrap `}>
                                <div className="h-8 w-8 rounded-full  border-dashed border m-2"></div>
                                <div className="h-8 w-8 rounded-full bg-purple-600 border-dashed- border-2 m-2"></div>
                                <div className="h-8 w-8 rounded-full bg-red-400 border-dashed  border m-2"></div>
                                <div className="h-8 w-8 rounded-full  border m-2"></div>
                                <div className="h-8 w-8 rounded-full bg-orange-300 border-2 border-blue-500 m-2"></div>
                                <div className="h-8 w-8 rounded-full bg-teal-400 shadow-md shadow-gray-500 m-2"></div>

                            </div>

                        </div>
                        <div className="square relative flex justify-center items-center">
                            <div className='cursor-pointer h-6 w-6 border'>

                            </div>
                            <i ref={squareRef} onClick={(e) => handleNodeOptions(e, "squareOptions")} className={`ri-arrow-down-s-line z-50 ${showNodeOptions.squareOptions ? "rotate-0" : "rotate-180"}`}></i>
                            <div className={`square-options absolute rounded h-32 w-28 -right-28 bg-white z-50 top-0 transition-all shadow-md shadow-gray-600 duration-300 ${!showNodeOptions.squareOptions ? "-translate-y-[2%] opacity-0" : "-translate-y-0"} overflow-scroll no-scrollbar flex flex-wrap`}>

                                <div className="h-8 w-8  border-dashed border m-2"></div>
                                <div className="h-8 w-8 bg-purple-600 border-dashed- border-2 m-2"></div>
                                <div className="h-8 w-8 bg-red-400 border-dashed rounded border m-2"></div>
                                <div className="h-8 w-8  border m-2"></div>
                                <div className="h-8 w-8 bg-orange-300 rounded-lg border-2 border-blue-500 m-2"></div>
                                <div className="h-8 w-8 bg-teal-400 shadow-md shadow-gray-500 m-2"></div>

                            </div>

                        </div>
                    </div>
                </header>

            </div>


            <div className='flex w-full cont mb-3 pb-5 justify-around gap-30'>
                <div ref={div1Ref} className='h-24  w-24 border bg-pink-400 '>
                    
                </div>

                <div className='h-24 w-24 border bg-purple-500'>

                </div>
                <svg id="lineCanvas" class="absolute  w-full h-full">
                        <line ref={lineRef} id="line" x1="0" y1="0" x2="0" y2="0" stroke="black" stroke-width="2" />
                    </svg>


            </div>
        </div>
    )
}

export default MindMap
