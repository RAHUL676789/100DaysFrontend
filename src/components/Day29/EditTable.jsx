import React,{useRef, useState} from 'react'

const EditTable = () => {
const [tableData, settableData] = useState([]);
const [showForm, setshowForm] = useState(false)
const [formData, setformData] = useState({
    name:"",
    role:"",
    email:""
})

const formRef = useRef()

const inputClass = `w-full bg-gray-200 focus:outline-0 focus:ring-1 focus:ring-teal-400 py-2.5 rounded-lg px-3`
const labelClass = "text-sm text-gray-900"
const divClass = `flex flex-col gap-2`

const handleInputChaneg  = (e) =>{
    
}

  return (
    <div>

      

       <div className='w-[80%] border-b py-3 px-5  flex justify-between mx-auto'>
         <h2 className='text-lg font-semibold'>Editable</h2>
        <button onClick={()=>setshowForm((prev)=>!prev)} className='h-5 w-5 border rounded-full flex justify-center items-center flex-col'>+</button>
       </div>
       <div ref={formRef} style={{
        maxHeight:showForm ? `${formRef.current.scrollHeight}px`:0
       }} className=' overflow-hidden transition-all duration-200'>
          <form className='mx-auto w-[80%] shadow-md shadow-gray-400 my-4 rounded-lg px-5 py-2'>
            <div className={divClass}>
                <label  className={labelClass} htmlFor="name">name</label>
                <input name='name' className={inputClass} type="text" placeholder='enter your name' />
            </div>
             <div className={divClass}>
                <label  className={labelClass} htmlFor="email">email</label>
                <input name='email' className={inputClass} type="email" placeholder='enter your email id' />
            </div>
             <div className={divClass}>
                <label  className={labelClass} htmlFor="role">role</label>
                <input name='role' className={inputClass} type="enter your role" />
            </div>

            <button className='border px-5 py-1.5 rounded-lg my-2 bg-gray-600 text-white font-semibold'>Submit</button>
        </form>
        </div>
     
          {
            tableData.length > 0 ? <table>

            </table> :<div className='text-center my-20'> 
                <h2 className='text-2xl font-semibold'>table data not found</h2>
            </div>
          }
      </div>
      

  )
}

export default EditTable
