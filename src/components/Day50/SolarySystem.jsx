import React,{useEffect,useState,useRef} from 'react'

const SolarSytem = () => {
const [bodyScrollLeft, setbodyScrollLeft] = useState(0)
useEffect(() => {
    const body = document.body;
    body.style.scrollBehavior = "smooth";

    setInterval(()=>{
      console.log(body.clientWidth,"this is clientwidht")
      console.log("boyd.scllwidht",body.scrollWidth)
      console.log("scrollleft",body.scrollLeft)
      body.scrollLeft+=`${300}px`
    },1000)

   
  }, []);

  return (
    <div className='h-screen w-screen container'>
      <div className="relative cot w-[520px] h-full flex justify-center items-center border-white  ">

        {/* Sun */}
        <div className="sun h-24 w-24 rounded-full bg-gradient-to-bl from-yellow-400 to-yellow-50 flex justify-center items-center shadow-xl shadow-yellow-200 absolute  translate-x-1/2 translate-y-1/2">
        </div>

        {/* Mercury orbit */}
        <div className="orbit h-32 w-32 rounded-full border border-white absolute  translate-x-1/2 translate-y-1/2">

          <div className="mercury h-4 w-4 bg-gradient-to-r from-[#0dd0f7] to-gray-200 absolute -top-2 left-1/2  translate-x-1/2 rounded-full shadow-3xl shadow-blue-600"></div>

        </div>


        {/* Venus orbit */}
        <div className="orbit-2 h-40 w-40 rounded-full border border-white absolute 
         translate-x-1/2 
         translate-y-1/2">
          <div className="venus h-7 w-7 rounded-full bg-gradient-to-r from-[#eca60e] to-[#526b8b] absolute -top-4 left-1/2 -translate-x-1/2"></div>
        </div>

        {/* Earth orbit */}

        <div className="orbit-3 h-60 w-60 rounded-full border border-white absolute  translate-x-1/2 translate-y-1/2">

          {/* Earth with its own orbit */}
          <div className="orbit-3 h-60 w-60 rounded-full border border-white absolute  translate-x-1/2 translate-y-1/2">

            {/* Earth with its own orbit */}
            <div className="relative h-full w-full animate-spin-slow">
              <div className="earth h-8 w-8 -top-3 rounded-full bg-gradient-to-r from-blue-600 to-green-600 absolute  left-1/2 -translate-x-1/2">

                {/* Moon Orbit */}
                <div className="moonOrbit h-12 w-12    rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slower">
                  {/* Moon */}
                  <div className="moonplanet h-3 w-3 bg-white rounded-full absolute top-0 left-1/2 -translate-x-1/2"></div>
                </div>

              </div>
            </div>
          </div>


         


        </div>
         <div className="orbit-4 h-90 w-90 rounded-full border border-white translate-x-1/2 translate-y-1/2">

         <div className="thurs h-12 absolute translate-x-1/2 translate-y-1/2  w-12 rounded-full bg-gradient-to-tl mask-radial-at-bottom border-white from-[#8b8b87] to-[#e74e0c]">

         </div>

          </div>

      </div>
    </div>
  )
}

export default SolarSytem
