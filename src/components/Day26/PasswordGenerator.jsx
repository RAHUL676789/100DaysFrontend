import React ,{useState} from 'react'

const PasswordGenerator = () => {
  const [password, setpassword] = useState("");
  const [option, setoption] = useState({
    upperCase:false,
    lowerCase:false,
    digits:false,
    symbol:false
  });
  const [legnth, setlegnth] = useState(8)
  const [strength, setstrength] = useState("");
  const [showPassword, setshowPassword] = useState(false)


  const handleGeneratePassword = ()=>{
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let lower = "abcdefghijklmnopqrstuvwxyz"
    let digit = "1234567890"
    let symbol = "(){}&*^%$#@!'::."
    let character = "";
    if(option.upperCase) character+=upper;
    if(option.lowerCase)character+=lower;
    if(option.digits)character+=digit;
    if(option.symbol)character+=symbol;
    if(character.length == 0){
      alert("please select one option")
      return;
    }

    let pass = "";
    console.log(character)

    for(let i = 0 ; i< legnth; i++){
      let index = Math.floor(Math.random() * character.length);
      pass = pass + character[index]
      
    }
   console.log(pass)
    setpassword(pass)
  checkStrength(pass)
  }

  const checkStrength = (pass)=>{
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    

    if(score <= 2) setstrength("weak")
      else if(score == 3 || score == 4) setstrength("moderate")
    else setstrength("strong")

  }

  const handleoptionChange =(key)=>{
    setoption((prev)=>({...prev , [key] :!option[key]}))
  }

  const  handleCopy = ()=>{
    console.log("handlcopu")
    if(password == ""){
      alert("password is empty")
      return;
    }
    navigator.clipboard.writeText(password);
    alert(`!copid`)
  }
  return (
    <div className='max-w-lg text-black  shadow-md shadow-gray-600 rounded-lg mx-auto p-5'>
      <h2 className='text-center font-semibold  text-2xl text-teal-600'>PasswordGenerator</h2>
      <div className='w-full  flex justify-around my-4 gap-3'>
         <input readOnly value={password} type={`${showPassword ? "text" :"password"}`}  className='flex-1 border bg-gray-50 p-2.5 rounded-sm focus:outline-0 focus:ring-2 focus:ring-teal-500'/>
         <button onClick={handleCopy} className='px-7 py-2 bg-teal-700 rounded-lg font-semibold border-2 border-teal-700  text-white'>copy</button>
         <button onClick={()=>setshowPassword((prev)=>!prev)} className='border bg-yellow-600 text-white rounded-lg font-semibold px-3 py-1'>showPassword</button>
      </div>

     <div>
      <label className='font-semibold text-teal-900 text-lg' htmlFor="">Password length : {legnth}</label>
       <input 
      type="range"
       name="" id="" 
       className='w-full'
       min="6"
       value={legnth}
       max="24"
       onChange={(e)=>setlegnth(e.target.value)}
       />
     </div>

<div className='grid grid-cols-2 gap-2 '>


     {
       Object.entries(option).map(([key,value])=>(
          <label key={key} className='flex items-center gap-2'>
            <input
             checked={value}
             onChange={()=>handleoptionChange(key)}
             
             type="checkbox" className='' />

           {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
       ))
     }
    </div>

    <button className='py-2 px-1 bg-teal-500  w-full my-4 rounded-lg font-semibold text-white' onClick={handleGeneratePassword}>GeneratePassword</button>
    <div className='mt-4'>
      <span
      className={
        ` ${strength == "strong" ? "text-green-700" : strength == "moderate" ? "text-amber-300" :"text-red-800"} `
      }
      >
{strength}
      </span>

    </div>
    
      
    </div>
  )
}

export default PasswordGenerator
