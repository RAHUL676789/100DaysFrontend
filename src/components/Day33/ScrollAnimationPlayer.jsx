import { useState } from 'react'

const ScrollAnimationPlayer = () => {
    const [isDownloading, setisDownloading] = useState(false);
    const [isDownloaded, setisDownloaded] = useState(false);
    const [progress, setprogress] = useState(0);
    const [imageUrl, setimageUrl] = useState("");


    const fileUrl = "https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?q=80&w=360&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


    const handleDownload = () => {
        setprogress(0);
        setisDownloading(true);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.open('GET', fileUrl, true);

        xhr.onprogress = (event) => {
            if (event.lengthComputable) {
                const percent = (event.loaded / event.total) * 100;
                setprogress(percent);
            }
        }

        xhr.onload = () => {
            if (xhr.status == 200) {
                const blob = xhr.response;
                const url = URL.createObjectURL(blob);
                setimageUrl(url);
                
                let a = document.createElement('a');
                a.href = url;
                a.download = "image.png"
                a.click();
                setisDownloaded(true);
                setisDownloading(false)
            }


        }

        xhr.onerror = ()=>{
            alert('download failde');
            return
        }


        xhr.send();

    }
    return (
        <div className='h-screen w-screen bg-white py-5  '>

            {!isDownloaded ? <div className='h-[90%] relative w-[50%]  mx-auto shadow-md shadow-gray-500 p-5 my-auto'>
                <img src={fileUrl} alt="" className='h-full w-full object-cover' />
                <button onClick={handleDownload} className='border text-white font-semibold active:translate-y-0.5 px-4 py-2 rounded-3xl absolute bottom-8 right-8 bg-blue-500'>Download</button>

                {
                    isDownloading &&
                    <div className='h-full w-full bg-black/20 absolute top-0 left-0'>
                        <div className='bg-white absolute h-16 w-48 rounded top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center flex-col'>
                            <p className='text-black font-semibold text-center animate-pulse '>DownLoading...</p>
                  <span className='text-black font-semibold'>{Math.floor(progress)}%</span>
                            <div style={{ width: `${progress}%` }} className='absolute transition-all duration-150 bottom-0 left-0 h-2  bg-green-600 '>

                            </div>

                        </div>

                    </div>}
            </div> : <div>
                <img src={imageUrl} alt="downlaode" />
            </div>}

        </div>
    )
}

export default ScrollAnimationPlayer
