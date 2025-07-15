import React,{useState} from 'react'

const NotesCard = ({card,handleOffSet,updateBg,delteCard}) => {
    // console.log(card);
    const [bg, setbg] = useState(null)

    const upCard = (e)=>{
        const bacg = e.target.value;
        console.log(bacg);
        updateBg(bacg)

    }

    const handleDelete =(e)=>{
        e.stopPropagation();

        delteCard(card.id)
    }
  return (
    <div onMouseDown={(e)=>handleOffSet(e,card)} style={{
        backgroundColor:card.bg,
        left:card.position.x,
        top:card.position.y
        }} className='  border shadow-md shadow-gray-400 absolute cursor-grab py-3 px-4 rounded-lg h-fit select-none '>
        <div className='flex justify-between bg-white text-white gap-2 py-2 mb-3 w-full
        px-5  border rounded-lg '>
               <input onChange={upCard} type="color" className=' border' />
               
               <button onClick={handleDelete} className='border text-black rounded-lg px-7 '>delete</button>
        </div>
        <h2  className={`font-semibold text-white text-sm px-3`}>{card.content}</h2>
      
    </div>
  )
}

export default NotesCard
