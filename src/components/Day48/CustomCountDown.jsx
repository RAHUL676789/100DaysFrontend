import React, { useState, useEffect, useRef } from 'react'
import { counterContext } from '../Context/context'

const CustomCountDown = () => {
    const divClass = "shadow-md shadow-gray-500 h-18 w-18 rounded-full flex justify-center items-center flex-col"
    const pClass = "font-semibold text-lg"
    const spanClass = "font-bold text-sm "
    const [TagetDateTime, setTagetDateTime] = useState(null);
    const [showInputOption, setshowInputOption] = useState(false)
    const [DateCounter, setDateCounter] = useState({ days: 0, hours: 0, min: 0, sec: 0 })
    const [CounterTime, setCounterTime] = useState(null)
    const timer = useRef(null)
    const [stop, setstop] = useState(false)

    // ab mere pass 154000 itne second k diff hai

    useEffect(() => {
        console.log("useEffect")
        if (TagetDateTime) {
            const createCounter = () => {
                const now = Date.now();
                const target = new Date(TagetDateTime);

                const diff = (target - now) / 1000;

                if (diff <= 0) {
                    console.log("return")
                    clearInterval(timer.current)
                    setCounterTime(0);

                    return;
                } else {
                    console.log("else")
                    setCounterTime(diff)
                }



            }
            createCounter()
        }

    }, [TagetDateTime])

    useEffect(() => {
        if (CounterTime <= 0) {

            return;
        }
       
       if(!stop){
        console.log("!stop")
         const days = Math.floor(CounterTime / 86400)

        console.log(days)
        const hoursSec = CounterTime - (86400 * days);
        const hours = Math.floor(hoursSec / 3600)
        console.log(hours)
        const minSec = CounterTime - (86400 * days) - (3600 * hours);
        // console.log(Math.floor(minSec/60));
        const min = Math.floor(minSec / 60);
        const sec = Math.floor(CounterTime - (86400 * days) - (3600 * hours) - (60 * min));
        console.log(sec);
        const newDate = { days, hours, min, sec };
        setDateCounter(newDate)

       }


    }, [CounterTime,stop])

    useEffect(() => {
      
        if (TagetDateTime && !stop) {
            timer.current = setInterval(() => {
                setCounterTime((prev) => prev - 1)
            }, 1000)
        }
    }, [TagetDateTime,stop])

    const handleReset = () => {
        clearInterval(timer.current);
        setDateCounter({ days: 0, hours: 0, min: 0, sec: 0 });
        setTagetDateTime(null);
        setCounterTime(null);
        setshowInputOption(false);
    };

    

    const handleStop = () => {
         setstop((prev)=>{
            if(!prev){
                console.log("if")
                timer.current =setInterval(()=>{
                    console.log("mchu")
                    setCounterTime((prev)=>prev - 1)
                },1000)
            }else{
               
                clearInterval(timer.current)
            }
          return !prev;
         }
       
        )
       clearInterval(timer.current )
    };


    return (
        <div className='h-screen w-screen'>


            <div className='h-full w-[75%] mx-auto bg-gray-50 shadow-md shadow-gray-600'>
            <div className='flex justify-center items-center gap-6'>
                    <h1 className='text-2xl font-semibold text-center'>CustomCountDown</h1>
          <h2 className='text-lg font-sans font-medium'>TargetTime :{TagetDateTime?.split("T").join("-time:") } </h2>
            </div>
                <div className=' flex justify-center items-center gap-5 py-3'>
                    {!showInputOption && <button onClick={() => setshowInputOption(true)} className='px-5 py-2 rounded-lg bg-gray-950 text-white'>Set-Target</button>}
                    {
                        showInputOption && <input type='datetime-local' onChange={(e) => {
                            setshowInputOption(false)
                            setTagetDateTime(e.target.value)
                        }} />
                    }

                    <button onClick={()=>handleReset()} className='px-5 py-2 rounded-lg border bg-blue-900 text-white font-semibold cursor-pointer'>Reset</button>
                    <button onClick={handleStop } className='px-5 py-2 rounded-lg border bg-pink-600 text-white font-semibold cursor-pointer'>Stop</button>
                </div>
                <div className=' flex justify-center items-center gap-3'>
                    <div className={`${divClass} bg-pink-800 text-white`}>
                        <p className={pClass}>Days</p>
                        <span className={spanClass}>{DateCounter.days}</span>
                    </div>
                    <div className={`${divClass} bg-blue-900 text-white`}>
                        <p className={pClass}>Hours</p>
                        <span className={spanClass}>{DateCounter.hours}</span>
                    </div >
                    <div className={`${divClass} bg-green-900 text-white`}><p className={pClass}>Mins</p>
                        <span className={spanClass}>{DateCounter.min}</span></div>
                    <div className={`${divClass} bg-purple-950 text-white`}>
                        <p className={pClass}>Sec</p>
                        <span className={spanClass}>{DateCounter.sec}</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CustomCountDown
