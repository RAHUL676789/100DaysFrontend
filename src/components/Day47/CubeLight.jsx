import { useEffect } from "react"


const CubeLight = () => {

    useEffect(()=>{
        const handleMouseMove = (e)=>{
            createCube(e.clientX,e.clientY)
        }

        const createCube = (x,y)=>{
            console.log(y)
            const cube = document.createElement("div");
            cube.className = "h-12 w-6 opacity-70 blur-sm opacity-80 fixed smoke";
            cube.style.left = `${x}px`;
            cube.style.top =  `${y}px`;
            cube.style.transform = "translate(-50%, -50%) scale(1)"
            
         
            requestAnimationFrame(()=>{
            cube.style.transition = "all 1s  ease-out"
              cube.style.transform = "translate(-50%, -50%) scale(3)"
              cube.style.opacity="0"
            

            })

            document.querySelector("body").append(cube)

            setTimeout(()=>{
                cube.remove();
            },500)
        }


        window.addEventListener("mousemove",handleMouseMove)
        return ()=>window.removeEventListener("mousemove",handleMouseMove)
    },[])
  return (
    <div className="h-screen w-screen bg-black">
      
    </div>
  )
}

export default CubeLight
