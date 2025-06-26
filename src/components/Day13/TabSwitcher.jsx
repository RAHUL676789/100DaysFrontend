import React, { useState } from 'react'

const TabSwitcher = () => {

    const [tabName, settabName] = useState("Profile")
    const sectionClass = "min-h-screen text-center max-w-screen border px-5"
    const buttonClass = "border bg-blue-700 text-white px-7 py-2 font-bold cursor-pointer active:translate-y-0.5 transition-all duration-300 shadow-md shadow-gray-800 m-4"
    const h2Class = "text-2xl font-bold "
    return (
        <div className='flex flex-col justify-center items-center gap-5'>
            <div className="header  ">
                <button className={`${buttonClass} ${tabName == "Profile" ? "bg-pink-800" :""}`} onClick={()=>settabName("Profile")}>Profile</button>
                <button className={`${buttonClass} ${tabName == "Setting" ? "bg-pink-800" : ""}`} onClick={()=>settabName("Setting")}>Setting </button>
                <button className={`${buttonClass} ${tabName == "Activity" ?"bg-pink-800" :""}`} onClick={()=>settabName("Activity")}>Activity</button>
            </div>
            {tabName == "Profile" && <section className={sectionClass}>
                <h2 className={h2Class}>This Is Profile </h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere impedit doloribus distinctio eum temporibus, quia perspiciatis voluptatibus nulla animi, consectetur nihil esse neque voluptates, itaque exercitationem aperiam dolorum asperiores velit.
                Deserunt, dolor nihil id, nesciunt rerum dignissimos, aspernatur magnam eum vel illum consequuntur? Excepturi ipsa eos, cum est hic ab ducimus enim ex nobis velit! Amet adipisci harum iusto perspiciatis?
                Atque quod cum ipsam iste molestias, enim exercitationem laudantium tempore ullam amet a at quisquam dicta doloremque deleniti tenetur repellendus quaerat nostrum! Repellendus, enim numquam perspiciatis esse cupiditate culpa! Eaque.
                Qui omnis quaerat quam praesentium excepturi autem, aperiam repellendus voluptates possimus impedit alias ullam dignissimos cupiditate sit, quod voluptate aut asperiores! Ipsum facilis magnam officiis illo quod doloremque fuga obcaecati.
                Odio repudiandae pariatur totam sapiente corrupti reprehenderit distinctio qui quia. Odit tempora nulla sint repellat ab modi consectetur doloremque, debitis odio commodi possimus aut eligendi accusamus animi similique dolorem repellendus.</p>

            </section>}

            {tabName == "Activity" && <section className={sectionClass}>
                <h2 className={h2Class}>This Is Activity</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum nostrum, aspernatur, repellendus pariatur blanditiis ea ducimus dolorem non commodi eius accusamus sed illo eos omnis quas beatae vel quis illum Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, eaque temporibus! Distinctio praesentium excepturi laborum tenetur dolore esse reiciendis quod soluta consectetur facere eum quidem repudiandae, et inventore sit voluptatum.</p>

            </section>}
            {
                tabName === "Setting" &&
                <section className={sectionClass}>
                    <h2 className={h2Class}>This Is Setting</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, incidunt corporis, ullam placeat eos quam nobis doloribus unde id obcaecati consectetur commodi? Temporibus accusantium asperiores unde inventore facilis, harum eaque. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus explicabo ab illo ex non dolorum voluptatem molestiae, minima, reprehenderit odit minus veritatis cum! Hic rem porro similique atque possimus quod.</p>

                </section>
            }

        </div>
    )
}

export default TabSwitcher
