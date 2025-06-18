import React from 'react'

const Modal = ({ title, content, close ,modalConfirm}) => {
    return (
        <div onClick={close } className='w-screen h-screen fixed bg-gray-950  flex justify-center items-center flex-col px-5 z-10 transition-all duration-150'>
            <div className='bg-white w-full h-48 md:w-[40%] sm:w-[50%] p-4 flex flex-col items-start gap-4 overflow-scroll over justify-center shadow-sm shadow-white'>
                <h2 className='text-2xl font-bold mb-4'>{title}</h2>
                <div>
                    <p>{content}</p>
                </div>
                <div className="btn flex gap-5">
                    <button onClick={modalConfirm} className='border px-7 py-2  bg-green-800 font-bold text-white active:translate-y-0.5'>Confirm</button>
                    <button className='border px-7 py-2  bg-red-800 font-bold text-white active:translate-y-0.5' onClick={close}>Cancel</button>
                </div>


            </div>

        </div>
    )
}

export default Modal
