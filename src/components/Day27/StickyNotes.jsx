import React, { useRef, useState } from 'react'
import NotesCard from './NotesCard';

const StickyNotes = () => {
    const [notesArr, setnotesArr] = useState([]);

    const [content, setcontent] = useState("")
    const container = useRef(null)
    const [offSet, setoffSet] = useState({ x: 0, y: 0 });
    const [dragCard, setdragCard] = useState(null);
    const [isDragging, setisDragging] = useState(false)

    const [showAddContent, setshowAddContent] = useState(false)
    const handleShowAdd = () => {
        console.log("onClick")
        setshowAddContent((prev) => !prev)
    }

    const handleAddNotes = () => {
        if(content.trim() == ""){
            alert("add some text");
            return;
        }
        console.log(content)
        const x = Math.floor(Math.random() * 10) + 10;
        const y = Math.floor(Math.random() * 20) + 20;
        const newNotes = {
            content,
            bg: "#000000",
            id: Date.now(),
            position: { x, y }

        }
        setnotesArr((prev) => {
            return [...prev, newNotes]
        })
        setshowAddContent(false)
    }

    const handleOffSet = (e, card) => {
        console.log(card)
        setisDragging(true);
        setdragCard(card);
        const rect = container.current.getBoundingClientRect();
        const x = e.clientX - rect.left - card.position.x;
        const y = e.clientY - rect.top - card.position.y;
        setoffSet({ x, y });
    }


    const handleDragCard = (e) => {
        if (!isDragging || !container.current) return;
        const rect = container.current.getBoundingClientRect();
        const x = e.clientX - rect.left - offSet.x;
        const y = e.clientY - rect.top - offSet.y;

        const newArr = notesArr.map((item) =>
            item.id === dragCard.id ? { ...item, position: { x, y } } : item
        );
        setnotesArr(newArr);

    }

   const updateBg = (bg)=>{
      const newArr = notesArr.map((item) =>
            item.id === dragCard.id ? { ...item, bg:bg } : item
        );
        setnotesArr(newArr);
      
   }

   const delteCard = (id)=>{
    const newArra = notesArr.filter((item,i)=> item.id !== id);
    setnotesArr(newArra);
   }
    return (
        <div
            onMouseUp={() => setisDragging(false)}
            onMouseMove={handleDragCard}
            ref={container} className='h-[96vh] rounded-lg relative mx-auto mb-5 w-full md:w-[80%] shadow-md shadow-gray-700 py-2 px-5 overflow-hidden '>
            <div className='flex justify-between px-4 border-b border-b-gray-300 py-2'>
                <h2 className='text-2xl font-semibold'>StickyNotes</h2>
                <button onClick={handleShowAdd} className='border h-6 w-6 rounded-full flex justify-center items-center'>+</button>
            </div>

            {
                notesArr.length > 0 ?
                    <div className='flex  flex-wrap gap-4 mt-5  overflow-auto'>
                        {
                            notesArr.map((item, i) => (
                                <NotesCard delteCard={delteCard} updateBg={updateBg} handleOffSet={handleOffSet} card={item} key={i} />
                            ))
                        }


                    </div>
                    : <div className='flex text-center py-4 flex-col  h-full w-full '>
                        <h2 className='text-3xl font-semibold'>No Notes Added</h2>

                    </div>
            }

            <div className={`absolute w-[90%] mb-5 shadow-sm shadow-gray-800 bottom-0 ${showAddContent ? "-translate-y-[0]" : "translate-y-[120%]"}  rounded-lg transition-all duration-300    p-4`}>
                <label htmlFor="content" className='mb-3 font-semibold'>Content</label>
                <input value={content} onChange={(e) => setcontent(e.target.value)} id='content' type="text" placeholder='add content' className='w-full py-2 px-4 border rounded-lg mt-4' />
                <button onClick={handleAddNotes} className='bg-blue-500 font-semibold text-white active:translate-y-0.5 border px-7 rounded-lg mt-4 py-1.5'>add</button>
            </div>
        </div>
    )
}

export default StickyNotes
