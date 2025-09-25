import React, { useState, useRef, useEffect } from 'react'

const ChatUi = () => {
    const [isSideOpen, setisSideOpen] = useState(false)
    const [NewChat, setNewChat] = useState(false);
    const sideRef = useRef(null);
    const newChatRef = useRef(null);
    const [filterChat, setfilterChat] = useState(false)
    const filterRef = useRef(null)
    const [inputVal, setinputVal] = useState("");

    const Users = Array.from({ length: 15 }, (_, i) => ({
        userName: `User${i + 1}`,
        messageType: i % 2 === 0 ? 'sent' : 'received',
        date: new Date().toLocaleString()
    }));

    const [messages, setmessages] = useState([])

    useEffect(() => {
        const handleClick = (e) => {

            if ((e.currentTarget !== newChatRef.current) && NewChat) {
                console.log("click")
                setNewChat(false)
            }
            if ((e.currentTarget !== filterRef.current) && filterChat) {
                setfilterChat(false)
            }
        }
        window.addEventListener("click", handleClick)

        return () => window.removeEventListener("click", handleClick)

    }, [NewChat, filterChat])

    const handleSend = ()=>{
        const newMsg = {msg:inputVal,id:Date.now()}
        setmessages((prev)=>{
           return [...prev,newMsg]
        })
        setinputVal("")
    }

    return (
        <div className='h-[100vh]  w-[100vw] overflow-hidden bg-green-200'>

            <div className='h-full w-full flex '>
                {/* leftpanel */}

                <div className='w-64  h-[100%] relative   flex  bg-white'>

                    <div className='ml-5 '>
                        <header className=' flex flex-col  py-1 px-1'>
                            <div className='flex justify-between items-center  px-3 py-1'>
                                <h2 className='font-medium'>ChatUi</h2>
                                <div className='  flex'>
                                    <i ref={newChatRef} onClick={(e) => {
                                        e.stopPropagation();
                                        setNewChat((prev) => !prev)
                                    }} className="text-gray-600 cursor-pointer ri-edit-box-line mx-2 inline relative  ">

                                        <div onClick={(e) => e.stopPropagation()} className={`w-60 px-3 shadow-md  shadow-gray-600 h-[90vh] overflow-y-scroll absolute top-full  z-50 left 
                                         bg-white rounded transition-all duration-300 transform
                                         ${NewChat ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"}`} >


                                            <header className='sticky top-0 bg-white'>
                                                <h3 className='px-3  mb-1 font-bold text-black mt-2'>New Chat</h3>
                                                <label htmlFor=" " className=' relative border-b-2 border border-gray-100 border-b-green-700 p-0 flex justify-center items-center rounded-t'>

                                                    <input placeholder='search or  start a new chat' type="text" className=' outline-0 bg-gray-50 pl-2 w-full text-left rounded text-sm h-full  py-0.5' />
                                                    <i class="ri-dashboard-line text-sm absolute rounded  px-2 bg-gray-50 bottom-0 right-0 text-gray-500"></i>
                                                </label>
                                            </header>

                                            <div className='mt-5 overflow-scroll left'>
                                                <div className='flex gap-2 mb-3'>
                                                    <div className='h-6 w-6 rounded-full border flex justify-center items-center flex-col'>
                                                        <i className="ri-group-line text-sm "></i>
                                                    </div>
                                                    <p className='font-semibold text-black'>New Group</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <div className='h-6 w-6 rounded-full border flex justify-center items-center flex-col'>

                                                        <i className="ri-contacts-line text-sm"></i>
                                                    </div>
                                                    <p className='font-semibold text-black'>New Group</p>
                                                </div>
                                                <div className='mt-2'>
                                                    <div className='mt-1 '>
                                                        <p className='text-gray-400 text-sm '>frequenty chated</p>
                                                        <div className='flex gap-2 items-center'>
                                                            <i class="ri-user-line"></i>
                                                            <p className='font-semibold text-sm'>Rahul Lodhi</p>
                                                        </div>
                                                    </div>

                                                    <div className='mt-1 '>
                                                        <p className='text-gray-400 text-sm '>All Contact</p>
                                                        {Array.from({ length: 20 }).map((_, i) => (
                                                            <div className='items-center gap-2 rounded flex justify-start py-2 mb-1 px-2 hover:bg-gray-100'>
                                                                <i class="ri-user-line"></i>
                                                                <p className='font-semibold text-sm'>Rahul Lodhi</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>



                                    </i>
                                    <i ref={filterRef} onClick={(e) => { e.stopPropagation(); setfilterChat((prev) => !prev) }} className="text-gray-600 cursor-pointer ri-menu-line relative">
                                        <div className={`w-40 px-3 shadow-md  shadow-gray-600 h-[50vh] overflow-y-scroll absolute top-full  z-50 left 
                                         bg-gray-100 rounded transition-all duration-300 transform
                                         ${filterChat ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0 pointer-events-none"}`}>
                                            <p className=' text-gray-400'>filter-chat by</p>
                                            <ul className='flex flex-col gap-2 items-start justify-center'>
                                                <li className='flex gap-1 hover:bg-gray-400 w-full px-2 py-0.5 rounded'>
                                                    <i className="ri-chat-smile-ai-line font-semibold text-black"></i> Unread</li>
                                                <li className='flex gap-1 hover:bg-gray-400 w-full px-2 py-0.5 rounded '>
                                                    <i className="ri-heart-line font-semibold text-black"></i> Favourite</li>
                                                <li className='flex gap-1 hover:bg-gray-400 w-full px-2 py-0.5 rounded'> <i className="ri-user-settings-fill font-semibold text-black"></i>Contact</li>
                                                <li className='flex gap-1 hover:bg-gray-400 w-full px-2 py-0.5 rounded'> <i className="ri-user-community-line font-semibold text-black"></i>Group</li>
                                                <li className='flex gap-1 hover:bg-gray-400 w-full px-2 py-0.5 rounded'> <i className="ri-git-pr-draft-line font-semibold text-black"></i>Draft</li>
                                            </ul>

                                        </div>
                                    </i>
                                </div>

                            </div>
                            <label htmlFor="
                            
                        " className='mt-3 relative border-b-2 border border-gray-100 border-b-green-700 p-0 flex justify-center items-center rounded-t'>
                                <i class="ri-search-line text-sm absolute rounded  px-2 bg-gray-50 bottom-0 left-0 text-gray-300"></i>
                                <input placeholder='search or  start a new chat' type="text" className=' outline-0 bg-gray-50 px-9 w-full rounded text-sm h-full  py-0.5' />
                            </label>

                        </header>

                        <main className=' max-h-[100%] overflow-scroll left'>
                            <div className='px-3 pb-7'>
                                {Users.map((item, i) => (
                                    <div className='flex items-center justify-start gap-3 px-2 py-1 hover:bg-gray-200 rounded cursor-pointer mb-1'>
                                        <div className='h-8 w-8 border rounded-full  flex justify-center items-center bg-gray-200'>
                                            <i className="ri-user-fill"></i>
                                        </div>
                                        <div className='flex justify-start items-start flex-col leading-2 relative  flex-1'>
                                            <p className='text-xs font-semibold'>{item.userName}</p>
                                            <span className='text-xs text-gray-600'>{item.messageType === "sent" ?
                                                <i className="ri-video-on-fill font-light"> video</i>
                                                : <i className="ri-image-fill font-light"> image</i>}
                                            </span>

                                            <span className='absolute right-0 top-0 text-xs text-gray-600'>{item.date.split(",")[0].split("/").join("-")}</span>

                                        </div>
                                    </div>
                                ))}

                            </div>
                        </main>

                        <div
                            ref={sideRef}
                            style={{
                                width: isSideOpen ? "150px" : "30px"
                            }}
                            className='w-8  flex flex-col  left-0 top-0 justify-between bg-gray-50 items-center font-light px-1 absolute transition-all duration-200 h-[100%]'>

                            <div

                                className='top flex flex-col items-start  w-full py-2 overflow-hidden gap-2'>

                                <div>
                                    <i onClick={() => setisSideOpen((prev) => !prev)} className="ri-menu-line  text-gray-600 font-light ">

                                    </i>
                                </div>

                                <div className='flex justify-start gap-1  w-full '>
                                    <i className="ri-chat-3-fill text-gray-600">

                                    </i>
                                    <p className='text-sm'>chat</p>
                                </div>

                                <div className='flex justify-start gap-1  w-full '>
                                    <i className="ri-phone-line text-gray-600">

                                    </i>
                                    <p className='text-sm'>phone</p>
                                </div>
                                <div className='flex justify-start gap-1  w-full '>
                                    <i className="ri-signal-tower-line text-gray-600">

                                    </i>
                                    <p className='text-sm'>status</p>

                                </div>
                                <div className='flex justify-start gap-1  w-full '>
                                    <i className="ri-gemini-line text-gray-600">

                                    </i>
                                    <p className='text-sm'>meta Ai</p>

                                </div>

                            </div>

                            <div className='bottom flex flex-col overflow-hidden w-full items-start gap-2 pb-3'>

                                <div className='flex justify-start  gap-1  w-full '>
                                    <i className="ri-shining-2-line text-gray-600"></i>
                                    <p className='line-clamp-1 text-sm'>starred messages</p>
                                </div>

                                <div className='flex justify-start gap-1  w-full '>
                                    <i className="ri-inbox-archive-fill text-gray-600"></i>
                                    <p className='text-sm'>archive</p>
                                </div>

                                <div className='flex justify-start gap-1  w-full '>
                                    <i className="ri-settings-3-line text-gray-600"></i>
                                    <p className='text-sm'>settings</p>
                                </div>
                                <div className='flex justify-start gap-1  w-full '>
                                    <i className="ri-user-line text-gray-600"></i>
                                    <p className='text-sm font-semibold'>user</p>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {/* right panel */}

                <div className='bg-white relative flex-1'>

                    {
                        messages.length === 0 ? <div className='h-full w-full flex justify-center items-center flex-col border'>

                            <div className='flex flex-col w-[50%] mx-auto items-center'>
                                <i class="ri-whatsapp-line text-5xl text-gray-400"></i>
                                <div className='flex items-center flex-col'>
                                    <h1 className='font-medium text-lg'>WhatsApp for windows</h1>
                                    <p className='text-gray-400 text-sm text-center'>send and recieve messages without keeping your mobile on Use WhatsApp on the up to 4 linked devices and 1 phone at a time </p>
                                </div>
                            </div>

                        </div> : <div className='h-full flex flex-col w-[100%] bg-white absolute top-0'>
                           <header className='w-full py-2 px-1'>
                              <div className='w-full bg-white gap-1 flex justify-start items-center'>
                               <div className='h-8 w-8 bg-gray-200 rounded-full  flex justify-center items-center border'>
                                 <i className="ri-user-line"></i>
                               </div>
                                <div className='flex leading-3.5 flex-col'>
                                    <p className='font-semibold '>Rahul Lodhi</p>
                                    <span className='text-xs '>last seen at today 12:34</span>
                                </div>
                              </div>
                           </header>

                           <div className='flex-1 bg-gray-100 overflow-scroll no-scrollbar px-1'>

                            {messages?.length > 0 && messages.map((msg,i)=>(
                                <div style={{maxWidth:"70%"}} className={`${i%2 ===0 && "ml-auto"}  h-auto w-fit py-1.5 text-wrap flex flex-wrap`}> 
                                  <p  className='text-sm px-1 py-1 leading-3.5 bg-green-100 text-wrap'>{  msg.msg}</p>
                                </div>
                            ))}

                           </div>

                        </div>
                    }


                  <label htmlFor="" className='absolute bottom-0 w-full'>
                      <input value={inputVal} onChange={(e)=>setinputVal(e.target.value)} type="text" placeholder='send message ' className='bg-gray-200 text-sm  w-full py-2 px-3 border-0 outline-0' />
                        <i onClick={handleSend} className="ri-send-plane-2-fill text-2xl absolute right-0 cursor-pointer text-teal-600"></i>
                  </label>

                </div>

            </div>

        </div>
    )
}

export default ChatUi
