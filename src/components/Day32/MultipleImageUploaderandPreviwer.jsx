import { useRef, useState, useEffect } from 'react'

const MultipleImageUploaderandPreviwer = () => {
    const inputRef = useRef(null);
    const [imageArray, setimageArray] = useState([]);
    const [currentIdx, setcurrentIdx] = useState(0)
    const [isReading, setisReading] = useState(false)

    const handleMultipleUpload = async (e) => {
        try {
            console.log(e.target.files)
            setisReading(true);
            if (e.target.files.length > 10) {
                alert("only 10 files are allowed")
                //  setisReading(false);
                return;
            }


            setimageArray([])

            for (let i = 0; i < e.target.files.length; i++) {
                if (!e.target.files[i].type.startsWith("image/") || e.target.files[i].size > 5 * 1024 * 1024) {
                    alert("only image file allowed with 5mb")
                    //  setisReading(false);
                    continue;
                }
                const result = await handle64BaseUrl(e.target.files[i]);
                setimageArray((prev) => [...prev, result]);
               
            }
            //  setisReading(false);
        } catch (error) {
            console.log(error);
           
        }finally{
              setisReading(false);
        }



    }


    const handle64BaseUrl = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (() => {
                resolve(reader.result);

            })

            reader.onerror = (() => {
                reject(reader.error)
            })
        })
    }

    return (
        <div className='h-screen w-screen bg-black/20 '>
            <div className='fixed inset-0 w-[75%] pb-5 overflow-y-scroll  h-screen bg-white mx-auto rounded-2xl px-4'>
                <h2 className='text-black border-b border-b-gray-200  font-semibold text-xl text-center sticky top-0 py-3  z-50 bg-white'>Day 32 Multiple image Uploader </h2>
                <button onClick={() => {
                    if (inputRef.current) {
                        inputRef.current.click();
                    }
                }} className='py-1 text-black border-2 px-3 rounded-3xl border-blue-700 mt-4 cursor-pointer'>
                    upload Multiple image
                </button>
                <input onChange={handleMultipleUpload} ref={inputRef} type="file" multiple className='hidden' />
                <div className='w-full h-[80%]  no-scrollbar mt-4'>
                    {
                        imageArray.length > 0 ? <div className='flex w-full  flex-col gap-4'>
                            <img src={imageArray[currentIdx]} alt="" className='rounded   w-full object-cover' />

                            <div className='flex w-full gap-1 overflow-x-scroll no-scrollbar mb-3  '>
                                {imageArray.map((item, i) => (
                                    i !== currentIdx && <div className='h-32 w-48 relative'>
                                        <img onClick={() => setcurrentIdx(i)} src={item} className=' h-full w-full border object-cover rounded' />
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            setimageArray((prev) => prev.filter((item, idx) => idx !== i))
                                        }} className='absolute top-0 cursor-pointer text-lg right-2'>x</button>
                                    </div>
                                ))}

                            </div>


                        </div> : <div>
                            <h1 className='text-center my-auto text-4xl font-semibold text-black'>No file  selected</h1>
                        </div>
                    }

                </div>

                {
                    isReading && <div className='absolute z-50   top-1/2 left-1/2 -translate-x-1/2 h-full w-full  -translate-y-1/2 px-5 py-2 rounded-2xl bg-black/20'>
                        <h1 className='text-black'>uplaoding...</h1>
                         </div>
                }
            </div>

        </div>
    )
}

export default MultipleImageUploaderandPreviwer
