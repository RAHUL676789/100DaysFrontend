import { useState,useEffect } from "react"


export const useCounter = (target,duration = 2000)=>{
    const [count, setcount] = useState(0)
    const [width, setwidth] = useState(0)
    const [percentage, setpercentage] = useState(0)


    useEffect(()=>{
        let start;
        let startTime = null;

        function animate(frame){
            if(target == 0)return;
            // console.log("started")
            if(!startTime) startTime = frame;
            const progress = frame - startTime;
            const progressRation = Math.min(progress / duration,1);
            const current = Math.floor(progressRation * target);
            setcount(current);
            setwidth(progress);
            setpercentage(progressRation * 100)
            if(progress < duration){
                requestAnimationFrame(animate)
            }else{
                setcount(target);
            }
             
        }

        requestAnimationFrame(animate)

    },[target,duration])


    return {count,width,percentage};

}