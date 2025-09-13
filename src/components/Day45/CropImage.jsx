import React, { useEffect, useRef, useState } from 'react'

const CropImage = () => {
    const [imageUrl, setimageUrl] = useState(null)
    const [crop, setcrop] = useState({ x: 50, y: 50, height: 200, width: 200 })
    const isDragging = useRef(false)
    const startDrag = useRef({ x: 0, y: 0 });
    const imageRef = useRef(null);
    const canvaRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) setimageUrl(URL.createObjectURL(file));
    }
    const hadleMouseDown = (e) => {
        isDragging.current = true;
        startDrag.current = {
            x: e.clientX - crop.x,
            y: e.clientY - crop.y
        }
    }

    const handleMouseup = (e) => {
        isDragging.current = false
    }
    const handleMouseMove = (e) => {
        if (!isDragging.current) return;

        setcrop((prev) => {
            return {
                ...prev,
                x: e.clientX - startDrag.current.x,
                y: e.clientY - startDrag.current.y
            }
        })

    }

    useEffect(() => {
        const canvas = canvaRef.current;
        if (!canvaRef.current) return;
        const ctx = canvas.getContext("2d");
        const { x, y, height, width } = crop;
        const img = imageRef.current;
        canvas.width = width;
        canvas.height = height;
        const scaleX = img.naturalWidth / img.clientWidth;
        const scaleY = img.naturalHeight / img.clientHeight;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, x * scaleX, y * scaleY, width, height, 0, 0, width, height);
    }, [crop, imageUrl])
    
    return (
        <div className='min-h-screen w-screen flex  justify-center items-center gap-2 bg-gray-900 '>

            <div className='h-[70vh] w-[50vw] flex gap-4'>

                <div onMouseUp={handleMouseup} onMouseMove={handleMouseMove} className='h-full w-full flex justify-center items-center rounded-2xl border border-white '>
                    {
                        !imageUrl ? <div>
                            <label htmlFor='file' className='px-4 text-white py-2 rounded  w-fit '>

                                <input onChange={handleImageChange} type="file" id='file' />
                            </label>
                        </div> : <div className='relative h-full w-full'>
                            <img ref={imageRef} src={imageUrl} alt='Image' className='h-full w-full object-cover rounded' />
                            <div
                                onMouseDown={hadleMouseDown}
                                style={{ left: crop.x, top: crop.y, height: crop.height, width: crop.width }}
                                className='absolute border-2 border-amber-500'>
                            </div>
                        </div>
                    }



                </div>


            </div>

            {
                imageUrl && <div className='flex bg-white flex-col'>
                    <p>Preview</p>
                    <canvas height={200} width={200} ref={canvaRef} className='border '></canvas>
                </div>
            }


        </div>
    )
}

export default CropImage
