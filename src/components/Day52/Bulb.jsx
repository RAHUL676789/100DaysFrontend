import React,{useState} from 'react'

const Bulb = () => {
    const [switchOnn, setswitchOnn] = useState(false)
    return (
        <div className='h-screen w-screen flex justify-center items-center bg-black flex-col py-6'>

            <button onClick={()=>setswitchOnn((prev)=>!prev)} className='border border-white text-black px-5 py-3 rounded-3xl bg-white font-semibold '>Switch on</button>

            <div className={`bulb border   w-full h-full flex justify-around pt-5 $`}>

                <div className={` h-42 w-42 rounded-full  relative shadow-2xl ${switchOnn ? "lights" :"bg-white"} `}>

                    <div className={`holder h-22 w-18 border  rounded-4xl  absolute -bottom-10 left-[50%] -translate-x-1/2 top-[55%] translate-y-12 $ bg-black`}>

                        <div className='h-0.5 rounded-lg w-full bg-white absolute top-[50%]'>

                        </div>

                        <div className="cur absolute h-0.5 w-8 bg-white rounded-b-3xl bottom-1 left-[50%] -translate-x-1/2">

                        </div>
                        <div className="cur absolute h-0.5 w-10 bg-white rounded-b-3xl bottom-2 left-[50%] -translate-x-1/2">

                        </div>

                        <div className="cur absolute h-0.5 w-12 bg-white rounded-b-3xl bottom-3 left-[50%] -translate-x-1/2">

                        </div>



                    </div>


                    <div className={`cur absolute h-12 w-32 bg-black rounded-b-3xl -bottom-5 left-[50%] -translate-x-1/2`}>
           
                    </div>

                </div>

                <div className="fan relative  w-48 h-64">


          <div className={` z-50 h-10 w-10 border border-white absolute -translate-x-1/2 top-[35%] rounded-full left-[50%] flex items-center justify-center flex-col bg-zinc-700 ${switchOnn ? "motor" :"nonde"}  `}>

                        <div className={` h-8 w-8 z-50 border border-white rounded-full bg-yellow-700 `}>

                        </div>

                        <div className="wing-1 absolute h-44 w-6 bg-white -rotate-45 border rounded-tr-full rounded-bl-full">

                        </div>

                         <div className="wing-1 border rounded-tl-full rounded-br-full absolute h-44 w-6 bg-white rotate-45">

                        </div>

                    </div>

                    <div className="stand h-36 w-4 bg-red-800 absolute top-[50%] left-[50%] -translate-x-1/2 rounded-t-3xl">

                    <div className="stan-pad h-12 w-24 border border-white absolute -bottom-6 z-50 bg-black  -left-[240%] rounded-t-full">

                        <div className="redlight absolute h-4 bottom-0 left-[50%] w-2 bg-red-800 -translate-x-1/2">

                        </div>
                        <div className="bluelighgt absolute bg-green-600 bottom-0 left-[30%] -translate-x-1/2 h-4 w-2">

                        </div>

                    </div>

                    </div>

                </div>


            </div>

        </div>
    )
}

export default Bulb
