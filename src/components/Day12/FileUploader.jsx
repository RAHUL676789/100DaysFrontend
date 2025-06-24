

import { useState,useRef } from "react";


function FileUploader(){

    const inputRef = useRef(null);
    const [preview, setpreview] = useState(null);
    const [file, setfile] = useState(null);

    const handleInputChange = (e)=>{
        const selected = e.target.files[0];
        console.log(selected);

        if(!selected.type.startsWith("image/" ) && selected.type != "application/pdf"){
            alert("only image and pdf are allowed");
            return;
        }
  


        const reader = new FileReader();
        reader.onload = ()=>{
            setpreview(reader.result)
        }
        reader.readAsDataURL(selected);
        setfile(selected);
       
    }
     console.log(preview)
    return(
    
    <div className="max-w-xl ">

        <div  onClick={()=>inputRef.current.click()} className="border  border-dashed rounded-lg px-5 py-7  w-full  mb-5 text-center">
              
          {file ? <p className="text-green-600">file uploded</p> : <p className="px-5 py-5 text-gray-800">upload or drag file </p>}

            <input type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleInputChange} />

            

          
        

        </div>
          {
                file?.type.startsWith("image/") && preview  &&  <img src={preview} title="uploaded image" className="w-64 h-64 rounded-lg object-center"/> 
            }
            {
            file?.type == "application/pdf" && preview  &&  <iframe src={preview} title="uploaded pdf mt-8 " className="h-[700px]"/> 
            }

    </div>

    )
}

export default FileUploader;