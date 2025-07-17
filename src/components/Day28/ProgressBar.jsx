import React from 'react'

const ProgressBar = ({arr}) => {
  console.log(arr)
  const count = arr?.reduce((acc,curr)=>{
    if(curr.isCompleted){
      acc+=1;
    }
    return acc;
  },0)

  const pct = (count / arr?.length) *100;
 if(!pct){
  return null;
 }
  return (
    <div className='w-full h-4  bg-gray-100'>
      <div     style={{ width: `${pct}%` }} className='bg-green-500 transition-all duration-300 h-full'>

      </div>
      
    </div>
  )
}

export default ProgressBar
