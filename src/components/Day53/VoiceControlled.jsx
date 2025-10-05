import React, { useState, useEffect, useRef } from 'react'

const VoiceControlled = () => {
    const [textValue, settextValue] = useState("")
    const recoginitionRef = useRef(null);
    const listeningRef = useRef(false);

    useEffect(()=>{

        const SpeechRecoginition = window.SpeechRecoginition || window.webkitSpeechRecognition;
        if(!SpeechRecoginition){
            alert("your browser does not support SpeechRecoginition")
            return;        }
        const newSpeech = new SpeechRecoginition();
        newSpeech.continuous = true;
        newSpeech.lang = "en-US";

        newSpeech.onresult = (event)=>{
            console.log(event.results)
            const transcript = event.results[event.resultIndex][0].transcript;
            console.log("you said",transcript)
            console.log("textValue",textValue)
            settextValue((prev)=>prev + " " + transcript)
        }

        newSpeech.onend = (event)=>{
            if(listeningRef.current){
                console.log("eniding mic ")
               newSpeech.start()
            }
        }

        recoginitionRef.current = newSpeech;

    },[listeningRef])

    const hadleStart = ()=>{
        if(recoginitionRef.current && !listeningRef.current){
            recoginitionRef.current.start();
            listeningRef.current = true;

        }
    }

    const handleStop = ()=>{
        if(listeningRef.current){
            recoginitionRef.current.stop()
            listeningRef.current = false
        }
    }


    const handleClear = ()=>{
        settextValue("")
    }

    const btnClass = "px-3 py-2 rounded border "
    return (
        <div className='h-screen w-screen font-semibold cursor-pointer '>

            <div className='w-[75%] bg-white mx-auto h-screen '>
                <h1 className='text-3xl font-semibold text-center'>Voice Controlled Notes App</h1>

                <div className='flex flex-col gap-3 justify-center py-3 px-4'>
                    <textarea name="" id="" cols={60} rows={10} className=' ' readOnly value={textValue}>

                    </textarea>

                    <div className='flex justify-center gap-4 '>
                        <button onClick={hadleStart} className={`${btnClass} text-green-500 bg-gray-900`}>
                            Start
                        </button>
                        <button onClick={handleStop}  className={`${btnClass} text-red-700 bg-black`}>Stop</button>
                        <button onClick={handleClear}  className={`${btnClass} text-blue-500 bg-white`}>Clear</button>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default VoiceControlled
