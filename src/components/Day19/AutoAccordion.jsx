import React,{useState} from 'react'
import AutoAccordionItem from './AutoAccordionItem';

const AutoAccordion = () => {
   const accordionData = [
  {
    id: 1,
    title: "Product A - Website Builder",
    tabs: [
      {
        label: "Overview",
        content: "Product A is a powerful drag-and-drop website builder that allows users to build responsive sites without coding."
      },
      {
        label: "Pricing",
        content: "Basic: $10/mo, Pro: $20/mo, Business: $50/mo. All plans include free hosting and SSL."
      },
      {
        label: "Reviews",
        content: "⭐️⭐️⭐️⭐️☆ - 4.5/5 from 500+ users. Known for ease of use and fast support."
      }
    ]
  },
  {
    id: 2,
    title: "Product B - Email Marketing Tool",
    tabs: [
      {
        label: "Overview",
        content: "Product B helps you send beautiful email campaigns, automate follow-ups, and grow your audience."
      },
      {
        label: "Pricing",
        content: "Starter: Free, Growth: $15/mo, Premium: $40/mo. Unlimited emails in all plans."
      },
      {
        label: "Reviews",
        content: "⭐️⭐️⭐️⭐️ - 4.0/5 from 800+ users. Highly rated for automation and analytics."
      }
    ]
  },
  {
    id: 3,
    title: "Product C - CRM System",
    tabs: [
      {
        label: "Overview",
        content: "Product C is a CRM designed for small businesses to manage customer data, track interactions, and automate tasks."
      },
      {
        label: "Pricing",
        content: "Essential: $25/mo, Pro: $60/mo, Enterprise: Custom Pricing. Includes team collaboration tools."
      },
      {
        label: "Reviews",
        content: "⭐️⭐️⭐️⭐️⭐️ - 4.8/5 from 300+ users. Loved for its custom pipelines and intuitive dashboard."
      }
    ]
  }
];

    const [isOpen, setisOpen] = useState(null)

    const handleIsopne = (id)=>{
        if(isOpen == id){
            setisOpen(null);
            return;
        }
        setisOpen(id);
    }


  return (
    <div className=' bg-gray-400 w-screen text-white py-5'>
        <h2 className='text-2xl font-semibold text-center text-black mb-5 '> Day19 / AutoAccordion </h2>

        <div className='flex flex-col max-w-xl mx-auto h-96  bg-gray-200  px-7 py-9 shadow-lg shadow-black rounded-lg max-h-xl overflow-scroll no-scrollbar'>
            <button className='bg-blue-500 border px-7 py-2 max-w-fit self-end '>view more</button>
            {accordionData.map((item,i)=>(
                <AutoAccordionItem
                 isOpen={isOpen === item.id}
                  item={item} key={item.id}
                  handleIsopne={handleIsopne}
                  />
            ))

            }
        </div>
      
    </div>
  )
}

export default AutoAccordion
