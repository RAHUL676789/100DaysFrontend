import React, { useRef, useState } from 'react'
import GoalItem from './GoalItem';
import ProgressBar from './ProgressBar';

const GoalTracker = () => {
    const [AddGoalShow, setAddGoalShow] = useState(false)
    const [Goals, setGoals] = useState([]);
    const inputRef = useRef()
    const [GoalData, setGoalData] = useState({
        title:"",
        category:""
    })

    const handleOnchange = (e)=>{
        setGoalData((prev)=>{
            return{
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    const handleCreateGoal = ()=>{
        if(GoalData.category.trim() == "" || GoalData.title.trim() == ""){
            alert("category and title required");
            return;
        }

        
        const newGoal = {
            id:Date.now(),
            title:GoalData.title,
            category:GoalData.category,
            isCompleted:false,
            createdAt:Date.now(),

        }
        console.log(newGoal)
        const arr = [...Goals,newGoal];

        setGoals(arr);
        setAddGoalShow((prev)=>!prev)

    }

   const handleIsCompleted  = (card)=>{
    console.log(card)
    const completedArr = Goals.map((item,i)=>card.id == item.id ? {...item,isCompleted : !item.isCompleted}:item)
    console.log(completedArr);
    setGoals(completedArr);
   }
    return (
        <div className='w-full py-5  '>


            <div className='mx-auto rounded-lg py-3 w-full shadow-lg shadow-gray-400'>
                <h1 className='text-center text-3xl font-semibold pb-2  mb-3'>GoalTracker</h1>
                <ProgressBar arr={Goals}/>
                <div className='flex justify-between  px-5 border-b border-b-gray-200 py-2'>
                    <h2 className='text-2xl font-medium '>Add-Goal</h2>
                    <button className='border w-6 h-6 flex justify-center items-center flex-col rounded-full' onClick={() => setAddGoalShow((prev) => !prev)}>+</button>
                </div>
                <div

                    ref={inputRef} style={{ maxHeight: AddGoalShow && `${inputRef.current.scrollHeight}px` }} className={` overflow-hidden max-h-0 transition-all duration-300 flex flex-col gap-2 px-7 w-[75%] mx-auto  `}>
                        <label htmlFor="goal" className='mt-2 text-gray-500'>Goal Title</label>
                    <input name='title' onChange={handleOnchange} type="text" className='py-2.5 bg-gray-100 border-0 rounded-lg px-3  text-gray-900 focus:outline-0 focus:ring-1 focus:ring-teal-700' placeholder='write your goal' />
                    <label htmlFor="Category" className='text-gray-500'>Category</label>
                    <select onChange={handleOnchange} name='category' className='border py-3 text-gray-500  px-2 rounded-lg '>
                        <option value="Work">Work</option>
                        <option value="Study">Study</option>
                        <option value="Health">Health</option>
                        <option value="Code">Code</option>
                        <option value="Personal">Personal</option>
                    </select>
                    <button onClick={handleCreateGoal} className='border rounded-3xl active:translate-y-0.5 bg-gray-900 text-white font-semibold mb-3 px-7 py-2 w-fit self-end '>submit</button>
                </div>
            </div>
            <div className='w-full  flex gap-5 items-center  justify-center flex-wrap px-7 py-9 '>
                {Goals.length > 0 ? Goals.map((item,i)=>(
                    <GoalItem  handleIsCompleted={handleIsCompleted} goal={item} key={i}/>
                    // item.title
                )) : <div className='w-full'> <h2 className=' text-center text-2xl font-semibold'>No Goal added</h2> </div>}

            </div>
            {/* <GoalIte/> */}

        </div>
    )
}

export default GoalTracker
