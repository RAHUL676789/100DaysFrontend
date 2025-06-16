

import { useState, useRef } from "react";

let Cards = [
    {   id:1,
        name: "Rahullodhi",
        profession: "ui/ux design",
        age: 21
    },
    {  id:2,
        name: "satich kumar",
        profession: "software enginerr",
        age: 22
    },
    {id:3,
        name: "divya kumar",
        profession: "software enginerr",
        age: 22
    },
    {id:4,
        name: "prachi kumar",
        profession: "software enginerr",
        age: 22
    }
]




function TestimonialSlider() {
    const [dragCards, setdragCards] = useState(Cards);
    const dragitem = useRef(null);
    const replaceItem = useRef(null);

    const handleDraStart = (index) => {

        dragitem.current = index;
    }

    const handleDragEnter = (index) => {
        console.log(index);
        replaceItem.current = index;
    }


    const handleDrop = () => {
        const dummy = [...Cards];
        let dragTemp = dummy[dragitem.current];

        dummy.splice(dragitem.current,1);
        dummy.splice(replaceItem.current,0,dragTemp);

        setdragCards(dummy);
        dragitem.current = null;
        replaceItem.current = null;
    }


    return (
        <div className="w-screen h-screen bg-gray-800 flex  justify-center items-center gap-5 flex-wrap">
            {dragCards.map((item, i) => (
                <div key={item.id}
                    onDragStart={() => handleDraStart(i)}
                    onDragEnter={() => handleDragEnter(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    draggable className="bg-white border p-5 ">

                    <p>{item.name}</p>
                    <p>{item.profession}</p>
                    <p>{item.age}</p>

                </div>
            ))

            }

        </div>
    )
}

export default TestimonialSlider;