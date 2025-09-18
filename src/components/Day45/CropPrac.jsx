import React,{useState,useRef} from 'react'

const CropPrac = () => {
   const [crop, setcrop] = useState({x:50,y:50,width:200,height:200})
   const startPos = useRef({});
   const isResizing = useRef(null);
   const resizeDirection = useRef(null);
   const isDragging = useRef(null);


   const handleMouseDown = (e)=>{
    console.log("call")
       isDragging.current = true;
       startPos.current = {
          offsetX:e.clientX - crop.x,
          offsetY : e.clientY - crop.y
       }
   }


   const handleMouseMove =(e)=>{
       if(isDragging.current){
          setcrop((prev)=>{
            return {
                ...prev,
                x:e.clientX - startPos.current.offsetX,
                y:e.clientY - startPos.current.offsetY
            }
          })
       }

       if(resizeDirection.current){
        console.log(startPos.current)
        const dx = e.clientX - startPos.current.mouseX
        const dy = e.clientY - startPos.current.mouseY
        const newCrop = {...crop}
        console.log(dy)

         switch(resizeDirection.current){
            case "top":{
                // its change the top left corner
                newCrop.y = startPos.current.cropY + dy
                newCrop.height = startPos.current.height - dy
                break;

            }

            case "right":{
                newCrop.width = startPos.current.width + dx
                break;
            }
            case "bottom":{
                newCrop.height = startPos.current.height + dy
            }
            case "bottom-right":{
                newCrop.width = startPos.current.width + dx
                newCrop.height = startPos.current.height +dy

            }

            case "top-left":{
                newCrop.y = startPos.current.cropY + dy,
                newCrop.height = startPos.current.height - dy,
                newCrop.x = startPos.current.cropX + dx,
                newCrop.width = startPos.current.width - dx
                break;
            }

            case "top-right":{
                newCrop.y = startPos.current.cropY + dy
                newCrop.height = startPos.current.height - dy
                newCrop.width= startPos.current.width + dx
            }


            
         }

         if(newCrop.height >= 20 || newCrop.width >= 20){
            setcrop(newCrop)
         }
       }
   }


   const handleResize = (e,dir)=>{
    console.log(dir)
       e.stopPropagation();
       resizeDirection.current = dir
       startPos.current = {
        mouseX:e.clientX,
        mouseY:e.clientY,
        width:crop.width,
        height:crop.height,
        cropY:crop.y,
        cropX:crop.x
       }
   }

   const handleMouseup = ()=>{
    isDragging.current=null
    resizeDirection.current=null
   }

    return (
        <div  onMouseUp={handleMouseup}
      
            className='h-screen w-screen bg-zinc-500 flex flex-col justify-center items-center'>

            <div
            onMouseMove={handleMouseMove}   

            
            className='w-[600px] h-[300px] border relative'>

                <div onMouseDown={handleMouseDown} style={{left:crop.x,top:crop.y,height:crop.height,width:crop.width}} className='absolute border'>
                    {["top", "top-right", "top-left", "right", "bottom-left", "bottom", "bottom-right", "left"].map((dir) => (
                        <div
                             onMouseDown={(e)=>handleResize(e,dir)}
                            style={{
                                ...(dir).includes("left") && { left: "-5px" },
                                ...(dir).includes("right") && { right: "-5px" },
                                ...(dir === "top" || dir === "bottom") ? { left: "50%", transform: "translateX(-50%)" } : {},
                                ...(dir).includes("top") && { top: "-5px" },
                                ...(dir).includes("bottom") && { bottom: "-5px" },
                                ...(dir === "left" || dir === "right" ) ? {top:"50%",transform:"translateY(-50%)"}:{}



                            }}
                            className='h-4 w-4 rounded-full bg-amber-500 absolute'>

                        </div>
                    ))}

                </div>

            </div>



        </div>
    )
}

export default CropPrac
