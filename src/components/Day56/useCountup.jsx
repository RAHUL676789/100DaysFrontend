import { useEffect, useState } from "react";



export const useCountup = ({ target = 1000, duration = 1000 }) => {
    const [count, setcount] = useState(0);
    console.log(target)
    useEffect(() => {
        let start = count;
            let startTime = null;

        const animate = (timeStamp) => {
            console.log(timeStamp)
            if (!startTime) startTime = timeStamp;
            const end = target;
            const progress = Math.min((timeStamp - startTime) / duration,1);
            console.log(progress)
            const newValue = (start + (end - start) * progress);
            setcount(newValue)
            if (progress < 1) {
                requestAnimationFrame(animate)
            }
          
        }
          requestAnimationFrame(animate)


   
    }, [target, duration])

    return count;

}