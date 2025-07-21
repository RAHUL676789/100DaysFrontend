import React from 'react'
import AnimatedCounter from './AnimatedCounter'

const Index = () => {

  const animate = [
    {target:1000,label:"user"},
     {target:750,label:"client"},
      {target:250,label:"projects"}

  ]
  return (
    <div>
      <div className='min-h-[200vh] w-screen bg-gray-100'></div>
      <div className='flex h-screen justify-center items-center py-5 gap-5'>
  {
        animate.map((an,i)=>(
          <AnimatedCounter key={i} target={an.target} label={an.label}/>
        ))
      }
      </div>
    
    
    </div>
  )
}

export default Index
