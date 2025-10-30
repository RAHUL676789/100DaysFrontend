import React,{useState} from 'react'
import Root from './Root';

const JsonTreeVisual = () => {
    const [jsonData, setjsonData] = useState(null)
    const handleTextAraChange = async(e)=>{
        console.log(e.target.value);
        const result =await JSON.parse(e.target.value);
        setjsonData(result);     
    }
  return (
    <div className='h-screen w-screen '>
        <h1 className='text-2xl font-semibold text-center'>Json Tree Visualization</h1>

        <div className='h-[90vh] w-[90vw] flex justify-between border mx-auto'>
            <textarea onChange={handleTextAraChange} name="" id="" className='border mx-2 my-3' rows={1} cols={50}>

            </textarea>
            <div className='border flex-1  mx-2 my-3' >
                 {
                    jsonData &&  <Root data={jsonData} />
                 }
            </div>

        </div>
      
    </div>
  )
}

export default JsonTreeVisual
