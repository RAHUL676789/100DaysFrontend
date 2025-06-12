import React, { useState } from 'react'
import AccordionItem from './AccordionItem';

const Accordion = () => {
    const faqData = [
  {
    question: "What is CreatoMarket?",
    answer: "CreatoMarket is a digital marketplace where creators can sell and buy digital assets like graphics, templates, and code."
  },
  {
    question: "How do I become a seller?",
    answer: "To become a seller, sign up for an account, complete your profile, and start uploading your assets for review."
  },
  {
    question: "Is there any commission on sales?",
    answer: "Yes, CreatoMarket takes a small commission from each sale to maintain the platform and offer support services."
  },
  {
    question: "Can I use items commercially?",
    answer: "Yes, most items come with commercial licenses. However, always check the license terms before using them in commercial projects."
  },
  {
    question: "How do I withdraw my earnings?",
    answer: "Earnings can be withdrawn via PayPal or direct bank transfer once you reach the minimum payout threshold."
  }
];
  
const [isOpenIndex, setisOpenIndex] = useState(null);
const [viewMore,setViewMore] = useState(false);
let faqvisData = viewMore ? faqData : faqData.slice(0,1);
  return (
    <div className='w-screen min-h-screen bg-gray-800 flex justify-start items-center flex-col px-5 gap-5'>
        <h2 className='text-5xl text-white'>#Days3</h2>
        <button onClick={()=>setViewMore((prev)=>!prev)} className='text-white border self-end px-7 py-3 bg-pink-900'>{viewMore ? "viewLess" :"viewMore"}</button>
        <div className="accoriaitem w-full ">
            {faqvisData.map((item,i)=>(
                <AccordionItem question={item.question}
                 answer={item.answer}
                isOpenIndex={isOpenIndex === i } 
                i={i}
                toggle={()=>( console.log("helo"),setisOpenIndex(isOpenIndex === i ? null :  i))}/>
            ))}
        </div>
      
    </div>
  )
}

export default Accordion
