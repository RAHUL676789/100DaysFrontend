// import { use } from "react";
import { useState,useRef } from "react";

function AutoFocusOtp(){
  const inputRef = [useRef(),useRef(),useRef(),useRef()]
  const [otp,setOtp] = useState(["","","",""]);
 

  const handleInputChange = (e,idx) =>{
    const value = e.target.value.replace(/[^0-9]/g,"").slice(0,1);
    if(!value)return;
    console.log(value,idx)
    
      let newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
    
    
    if( idx < 3 ){
   
           inputRef[idx + 1].current.focus();
    }

  }

  const handleKeyDown = (e,idx)=>{

    if(e.key == "Backspace"){
       const updateOtp = [...otp];
      if(updateOtp[idx]){
        updateOtp[idx] = "";
        setOtp(updateOtp)
      }else if(idx > 0){
        inputRef[idx - 1].current.focus();
        updateOtp[idx]  = "";
        setOtp(updateOtp)
      }
    }

 
  }

  

  const handleVerify = ()=>{

    const otpf = otp.join("");
    const n = Number(otpf)
    console.log(typeof(n))
    setOtp((prev)=>{
      return ["","","",""]
    })

  }

  const handlPaste = (e)=>{
    const paste = e.clipboardData.getData("text").slice(0,4);
    if(!/^\d+$/.test(paste))return;

    const newOtp = paste.split("");
    const paddedOtp = newOtp.concat(Array(4 - newOtp.length).fill(""));
    setOtp(paddedOtp);

    paddedOtp.forEach((val,idx)=>{
         if(val && inputRef[idx].current){
          inputRef[idx].current.value = val;
         }
    })

    if(inputRef[paste.length - 1]){
      inputRef[paste.length - 1].current.focus();
    }
  }
  return(
    <div className="fixed top-0 left-0 h-screen w-screen p-0 flex justify-center flex-col items-center bg-black ">
      <div onPaste={handlPaste} className="bg-gray-300 py-5 rounded-lg px-4 max-w-lg flex flex-col gap-5 items-center ">
        <h1 className="text-green-400 text-lg">We have sent an otp to your reigister email please verify</h1>

        <div className="flex gap-4 justify-center">
          {[0,1,2,3].map((idx)=>(
            <input 
            ref={inputRef[idx]}
            autoFocus={idx === 0}
            pattern="[0-9]*"
            inputMode="numeric"
            key={idx}
            maxLength={1}
            value={otp[idx]}
            onKeyDown={(e)=>handleKeyDown(e,idx)}
            onChange={(e)=>handleInputChange(e,idx)}
            className="outline-green-500 px-4 py-3 bg-white max-w-12"
            type="text" />
          ))}
        </div>

        <div className="flex gap-5">
          <button className=" px-7 py-2 max-h-8 text-xs text-center bg-red-600 text-white font-bold  active:translate-y-0.5 cursor-pointer">Cancel</button>
          <button onClick={handleVerify} className="border px-7 py-2 max-h-8 text-xs text-center bg-green-600 text-white font-bold active:translate-y-0.5 cursor-pointer">Verify</button>
        </div>


      </div>

    </div>
  )
  
}
export default AutoFocusOtp;