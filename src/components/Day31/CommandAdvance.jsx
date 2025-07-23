import { useState, useEffect, useRef } from 'react'

const CommandAdvance = () => {
    const [showSearchModal, setshowSearchModal] = useState(false);
    const [filterdFile, setfilterFile] = useState(null);
    const inputRef = useRef();
    const [inpValue, setinpValue] = useState("")
    const [selectedFile, setselectedFile] = useState(0);

    const fileList = [
        { name: "index.html", type: "file", path: "index.html" },
        { name: "style.css", type: "file", path: "style.css" },
        { name: "app.js", type: "file", path: "app.js" },
        {
            name: "src",
            type: "folder",
            children: [
                { name: "Dashboard.jsx", type: "file", path: "src/Dashboard.jsx" },
                { name: "Profile.jsx", type: "file", path: "src/Profile.jsx" },
            ],
        },
        {
            name: "utils",
            type: "folder",
            children: [
                { name: "helpers.js", type: "file", path: "utils/helpers.js" },
            ],
        },
        { name: "data.json", type: "file", path: "data.json" },
    ];



    const flattenFiles = (files) => {
        console.log(files)
        let flat = [];

        files.forEach((file) => {
            if (file.type == "file") {
                flat.push(file);
            } else if (file.type == "folder" && file.children) {
                flat = flat.concat(flattenFiles(file.children));
            }

        });

        return flat;
    }


    useEffect(() => {
        if (showSearchModal && inputRef.current) {
            inputRef.current.focus()
        }

        const handleKeyDown = (e) => {



            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
                e.preventDefault();
                setshowSearchModal(true)
                setfilterFile(flattenFiles(fileList))

            } else if (e.key === "ArrowDown") {
                //  setfilterFile(flattenFiles(fileList))
                if (!filterdFile) {
                    setfilterFile(flattenFiles(fileList))
                }
                if (selectedFile < filterdFile?.length - 1) {

                    setselectedFile((prev) => prev + 1)
                }
            } else if (e.key === "ArrowUp" && filterdFile) {

                if (selectedFile > 0) {

                    setselectedFile((prev) => prev - 1)
                }
            }

            if (e.key === "Escape") {
                setinpValue("");
                setfilterFile(null);
                setshowSearchModal(false);
                setselectedFile(0);
            }

            if (e.key === "Enter" && filterdFile?.length > 0) {
                alert(` opening file ${filterdFile[selectedFile].name}`)

            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedFile, showSearchModal])


    const handleSearch = (e) => {
        const value = e.target.value;
        setinpValue(value);

        const results = flattenFiles(fileList).filter((file, i) =>
            file.name.toLowerCase().includes(value.toLowerCase()) || file.path.toLowerCase().includes(value.toLowerCase())
        )
        setfilterFile(results);

    }
    const itemRef = useRef([]);

    useEffect(() => {
        itemRef.current = []

    }, [filterdFile])

    useEffect(() => {
        if (itemRef.current[selectedFile]) {
            itemRef.current[selectedFile].scrollIntoView({
                block: "nearest",
                behavior: "smooth"
            })
        }
    }, [selectedFile])



    return (
        <div >

            {showSearchModal && <div className='fixed inset-0  bg-black/40 '>
                <div onClick={(e) => e.stopPropagation()} className='w-full mx-auto max-w-xl rounded-md border border-black/40 bg-[#1e1e1e] '>
                    <input

                        ref={inputRef}
                        value={inpValue}
                        onChange={handleSearch}
                        // onChange={(e)=>setinpValue(e.target.value)}
                        type='text' placeholder='> select to open a file' className='px-4 py-1 bg-[#252526] text-white w-full placeholder-gray-400 rounded-md outline-1 outline-black/50' />

                    <div className='max-h-[300px] px-5  overflow-y-auto no-scrollbar'>
                        {
                            filterdFile?.map((file, i) => (
                                <div
                                    key={i}
                                    ref={(el) => itemRef.current[i] = el}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        alert(`opening ${file.name}`)
                                    }}
                                    className={`flex mt-2 justify-between items-center hover:bg-[#2c2c2c] ${selectedFile == i ? "bg-blue-500 ring-2 ring-white/60" : ""} px-3 rounded-md py-1 cursor-pointer  transition-colors duration-150`}>

                                    <div >
                                        <p className="text-white font-medium text-sm">{file.name}</p>
                                        <p className="text-gray-400 text-xs">{file.path}</p>
                                    </div>

                                    <span className='px-4 py-1 bg-black/40 rounded-3xl'>{file.type}</span>

                                </div>

                            ))

                        }

                    </div>
                    {filterdFile?.length === 0 && (
                        <p className="text-gray-500 text-sm py-4 text-center">No matching files found.</p>
                    )}

                </div>



            </div>}


            <div className='h-screen w-full flex justify-center items-center flex-col border'>

                <h2 className='text-center text-2xl font-semibold text-white '>Press cnrtl / cmd + r to open the search Box</h2>
            </div>

        </div>
    )
}

export default CommandAdvance
