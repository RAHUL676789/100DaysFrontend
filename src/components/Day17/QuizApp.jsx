import React, { useEffect, useState } from "react";

const quizData = [
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        answer: "JavaScript",
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Cascading Simple Sheets",
            "Cars SUVs Sailboats",
        ],
        answer: "Cascading Style Sheets",
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hypertext Markup Language",
            "Hyperloop Machine Language",
            "Hyperlink Markup Language",
            "Helicopter Text Mark Language",
        ],
        answer: "Hypertext Markup Language",
    },
    {
        question: "Which year was JavaScript launched?",
        options: ["1996", "1995", "1994", "None of the above"],
        answer: "1995",
    },
];


function QuizApp() {

    const [showScore, setshowScore] = useState(false)
    const [currQ, setCurrQ] = useState(0);
    const [selectQ, setSelectQ] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft,setTimeLeft] = useState(20);


    useEffect(()=>{
        if(showScore) return;

        if(timeLeft === 0
        ){
            handleNext();
            return;
        }

        const interVal = setInterval(() => {
            
            setTimeLeft((prev)=>prev - 1)
        }, 1000);

        return ()=>clearInterval(interVal);

    },[timeLeft,showScore]);


    const handleNext = () =>{
        console.log("netToast")

        if(selectQ === quizData[currQ].answer){
            setScore((prev)=>prev + 1);
        }
        
        if(currQ + 1 < quizData.length){
            setCurrQ((prev)=>prev + 1);
        }else{
            setshowScore(true);
        }
        setTimeLeft(20);

    }


    const hanleRestart = () =>{
        setCurrQ(0);
        setSelectQ(null);
        setTimeLeft(20);
        setshowScore(false);
        setScore(0);

    }

    const handleSelectQues = (i) =>{
       
        setSelectQ(i);

    }
    return (
        <div className="max-w-lg border bg-gray-200 rounded-lg">

            {
                showScore ?
                    <div className="text-center px-5 py-7">
                        <h2 className="font-bold  mb-2">Your Score </h2>
                        <p className="mb-3 ">{score }/{ quizData.length}</p>
                        <button onClick={hanleRestart} className="bg-blue-500 rounded-lg px-9 py-2 text-white cursor-pointer">Restart Quiz</button>

                    </div> :
                    <div className="px-5 py-5 rounded-lg  ">
                        <div className="flex justify-between">
                            <span>Question {currQ + 1}/{quizData.length}</span>
                            <span>⏳  {timeLeft}s</span>

                        </div>
                        <h2 className="text-lg font-bold mb-4">{quizData[currQ].question}</h2>
                        <div className="flex-col flex gap-4  ">
                            {quizData[currQ]?.options?.map((quiz, i) => (
                                <div key={i} onClick={()=>handleSelectQues(quiz)} className={`text-center border px-5 py-3 bg-gray-100 rounded-lg cursor-pointer ${selectQ == quiz && "bg-green-600"}`}>
                                    {quiz}
                                </div>
                            ))}
                            <button onClick={handleNext} disabled={!selectQ} className="mx-auto border bg-green-600 text-white  px-7 py-2 rounded-lg disabled:opacity-50 active:translate-y-0.5 cursor-pointer">
                                {
                                    currQ + 1 == quizData.length ? "Finish" : "Next"
                                }
                            </button>
                        </div>


                    </div>
            }



        </div>
    )
}
export default QuizApp;
