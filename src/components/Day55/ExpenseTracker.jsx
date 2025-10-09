import React, { useState, useEffect, useRef } from 'react'
import { useCountup } from './UseCountUp';
import coins from "../../assest/coins.mp3"

const ExpenseTracker = () => {
    const [showInput, setshowInput] = useState(false);
    const [animatedCategory, setanimatedCategory] = useState({})
    const [expenses, setexpenses] = useState([]);
    const [categoryExpenses, setcategoryExpenses] = useState([]);
    const [totalExpense, settotalExpense] = useState(null);
    const audioRef = useRef(null);
    const [expenseValue, setexpenseValue] = useState({
        inputValue: "",
        category: ""
    });


    const animateTotal = useCountup(totalExpense, 1000)

    const lableClass = "font-semibold text-lg w-[75%] "
    const inputClass = "border-0 outline-0 bg-gray-100 w-[75%] px-4 py-2 rounded"
    const divClass = "flex flex-col gap-2 w-[100%]  items-center"

    const handleInputChange = (e) => {
        setexpenseValue((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleAddExpense = () => {
        if (Number(expenseValue.inputValue) > 5000000 || expenseValue.category.length > 10 || expenseValue.category === "") {
            alert("the expense value should be value");
            return;
        }

        setexpenses((prev) => [...prev, expenseValue])
    }

    const calculateTotalExpense = () => {
        const totalExpense = expenses?.reduce((acc, curr) => {
            acc += Number(curr.inputValue);
            return acc;
        }, 0)

        settotalExpense(totalExpense)
    }

    const handleCalculateCategoryExpense = () => {
        const categoryExpenses = expenses?.reduce((acc, curr) => {
            acc[curr.category] = acc[curr.category] ? Number(acc[curr.category]) + Number(curr.inputValue) : Number(curr.inputValue);
            return acc;
        }, {})
        setcategoryExpenses(categoryExpenses)
    }

    useEffect(() => {
        if (expenses.length) {
            calculateTotalExpense()
            handleCalculateCategoryExpense()
            if (audioRef.current) {
                audioRef.current.play();
            }

            setTimeout(() => { audioRef.current.pause() }, 900)
        }

    }, [expenses])

   useEffect(() => {
    const animRefs = {}; // har category ka animation reference

    Object.entries(categoryExpenses).forEach(([key, value]) => {
        let start = animatedCategory[key] || 0;
        const end = value;
        const duration = 500; // 0.5s
        const startTime = performance.now();

        const animate = (time) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.round(start + (end - start) * progress);

            setanimatedCategory(prev => ({ ...prev, [key]: current }));

            if (progress < 1) {
                animRefs[key] = requestAnimationFrame(animate);
            }
        }

        animRefs[key] = requestAnimationFrame(animate);
    });

    // cleanup
    return () => Object.values(animRefs).forEach(id => cancelAnimationFrame(id));
}, [categoryExpenses]);


    console.log(animatedCategory)

    return (
        <div className='h-screen w-screen'>
            <audio src={coins} ref={audioRef} loop>

            </audio>

            <div className='w-[75%] shadow rounded items-center shadow-gray-500 h-screen mx-auto flex flex-col px-5 py-4 gap-3 overflow-scroll'>
                <h1 className='text-3xl font-semibold'>Expense Tracker</h1>

                <header className='w-full '>
                    {!showInput && <button className='border px-5 py-3 rounded bg-gray-800 text-white font-semibold hover:bg-gray-200 cursor-pointer' onClick={() => setshowInput(true)}>Add Expense</button>}
                    {showInput && <div className=' w-full h-full items-center flex  flex-col justify-center shadow shadow-gray-300 rounded py-3 px-4'>

                        <div className={divClass}>
                            <label className={lableClass} htmlFor="expense">Expense</label>
                            <input max={50000} min={0} onChange={handleInputChange} name='inputValue' className={inputClass} type="number" value={expenseValue.inputValue} placeholder='add expense' />
                        </div>
                        <div className={divClass}>
                            <label className={lableClass} htmlFor="category">Category</label>
                            <input minLength={3} maxLength={10} onChange={handleInputChange} name='category' className={inputClass} id='category' type="text" value={expenseValue.category} placeholder='@example food travel etc..' />
                        </div>
                        <div className=' w-[75%] flex gap-2 mr-auto px-4 py-3   mx-auto'>
                            <button onClick={handleAddExpense} className='px-3 py-2 rounded border hover:bg-gray-300 font-bold cursor-pointer bg-blue-700 text-white'>Add Expense</button>
                            <button onClick={() => {
                                setshowInput(false)
                                setexpenseValue({ inputValue: "", category: "" })
                            }} className='px-3 py-2 rounded border hover:bg-gray-300 font-bold cursor-pointer bg-gray-700 text-white'>Close</button>
                        </div>

                    </div>}
                </header>

                <div className='w-full '>

                    {totalExpense && <div className='w-48 rounded flex flex-col justify-center items-center gap-1 h-22 shadow px-4 mx-auto'>
                        <h2 className='font-semibold text-lg'>total expense</h2>
                        <h3 className='text-teal-600'>&#8377; {animateTotal}</h3>
                    </div>}

                    <h13 className='font-semibold text-lg mb-3'>Categories expenses</h13>

                    <div className='w-[100%] flex flex-wrap gap-3 mt-3'>

                        {
                            Object.entries(categoryExpenses).map(([key, value]) => (
                                <div className='h-24 overflow-scroll no-scrollbar w-48 shadow flex flex-col justify-center  items-center 
                            hover: shadow- gray-500'>
                                    <h3 className='text-lg font-medium' > {key}</h3>
                                    <h4 className='text-teal-400'> &#8377; {animatedCategory[key]}

                                    </h4>

                                </div>

                            ))
                        }

                    </div>


                </div>
            </div >


        </div >
    )
}

export default ExpenseTracker
