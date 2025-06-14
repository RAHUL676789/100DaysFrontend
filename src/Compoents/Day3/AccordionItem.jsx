import react, { useRef, useState } from "react";


function AccordionItem({ question, answer, isOpen, toggle, i }) {
    const contentRef = useRef(null)

    return (
        <div className="bg-white ">
            <button onClick={toggle} className="flex justify-between w-full p-4">
                <p><span>{i + 1}</span>  : {question}</p>
                <span className="cursor-pointer">
                    {!isOpen ? <i class="ri-add-line"></i>
                        : <i class="ri-subtract-fill"></i>}
                </span>
            </button>
            <div
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
                }}
                className={`${!isOpen &&  'max-h-0'} transition-all duration-300 overflow-hidden mx-4 mb-4`}>
                <p>{answer}</p>
            </div>

        </div>
    )
}

export default AccordionItem;