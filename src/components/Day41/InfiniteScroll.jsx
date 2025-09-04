import React, { useEffect, useState , useRef} from 'react'

const InfiniteScroll = () => {
    let renderableLength = 5;
    const [ScrollElements, setScrollElements] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [totalScroll, settotalScroll] = useState(0);
    const containerRef = useRef();
    useEffect(() => {

        generateData(renderableLength);
    }, [])

    const generateData = async (dataLenght) => {
       try {
        setisLoading(true)
         const result = await generateItem();
        if (result === "success") {
            for (let i = 0; i < dataLenght; i++) {
              
                let newItem = {
                    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                    content: `${Math.random() * 99999 + 1000}`,
                    updateAt: Date.now()

                }
             
                setScrollElements((prev) => [newItem, ...prev])
            }

        }
       } catch (error) {
        console.log(error)
       }finally{
                setisLoading(false)
       }



    }

    const generateItem = async (itemsNo) => {

        return new Promise((res, rej) => {

            setTimeout(() => {


                res("success");
            }, 2000)

        })
    }


   
    const handleScroll = ()=>{
        if(!containerRef.current){
            return;
        }
    const container = containerRef.current;
    // console.log(container.scrollTop);
    // console.log(container.scrollHeight);
    // console.log(container.offsetHeight);
    if(container.scrollTop + container.offsetHeight >= container.scrollHeight){
        generateData();
    }


    }

    return (
        <div className='w-screen h-screen fixed inset-0 bg-black/20 z-50 '>
            <div ref={containerRef} onScroll={handleScroll} className='bg-white w-full md:w-[75%] rounded-lg shadow-sm shadow-gray-300 h-screen mx-auto overflow-scroll '>
                <div className='px-4 py-2 sticky bg-white border-b border-b-gray-300 text-center '>
                    <h1 className='font-semibold text-xl'>InfiniteScroll</h1>
                </div>

                <div className='px-4 py-2 w-full  relative '>
                    {ScrollElements.length > 0 ? ScrollElements.map((item,i)=>(
                        <div key={item.id} className=' w-[70%] h-[200px] shadow-sm shadow-gray-500 rounded-lg mx-auto my-5 px-5 py-1 flex justify-center items-center flex-col'> 
                        <span className='font-semibold text-xl px-5 py-2.5 rounded-full animate-bounce bg-gray-800 text-white'>{i+1}</span>
                         <p className='text-4xl font-semibold  mx-auto'> 
                              {Math.floor(item.content)}
                              </p>

                        </div>

                    )) : <div> </div> }


                 
                 {true && <div className='animate-bounce px-3 py-2 rounded-xl bg-green-800 text-white font-semibold border shadow-sm shadow-gray-500 w-fit mt-5 mx-auto'>Loadin... </div>}
                </div>

            </div>

        </div>
    )
}

export default InfiniteScroll
