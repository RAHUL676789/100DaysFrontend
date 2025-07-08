import React ,{useState} from 'react'
import {galleryData} from "./gallerData.js"
import ImageCard from "./ImageCard.jsx"
import useRevealAnimation from './userScroll.js'

const Gallery = () => {
  const [filter, setfilter] = useState("all")
  useRevealAnimation(filter);

 let  imageData = filter == "all" ? galleryData : galleryData.filter((img)=>img.category == filter)
  return (
    <div className='px-5 flex justify-center items-center flex-col  gap-5 py-4 -3xl mx-4 my-5 '>
<div className='flex gap-5'>


      {
        
        ["all","mount","city","nature","beauty"].map((cat,i)=>(
          <button
           onClick={()=>setfilter(cat)} key={i} className={`border  px-4 py-2 rounded-3xl ${filter === cat ? "bg-black  border-dashed text-white transition-all duration-300" :""}`}>
            {cat}
          </button>
        ))
      }
</div>
      <div className='columns-1 sm:columns-2 md:columns-3 p-3 gap-4 '>
        {
          imageData.map((image)=>(
            <ImageCard img={image.img}/>
          ))
        }
      </div>
      
    </div>
  )
}

export default Gallery
