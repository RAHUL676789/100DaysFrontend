import { useState, useEffect } from "react";



export const useCountup = (targetValue, duration = 500) => {
    const [count, setcount] = useState(0);
    console.log(targetValue)

    useEffect(() => {
        let startValue = count;
        let startTime = null;
        const animate = (timeStamp) => {
          
            if (!startTime) startTime = timeStamp;
            const progress = Math.min((timeStamp - startTime) / duration, 1);
            const newValue = Math.floor(startValue + (targetValue - startValue) * progress)
            setcount(newValue)
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
         requestAnimationFrame(animate); 
    }, [targetValue, duration])

    return count;
}