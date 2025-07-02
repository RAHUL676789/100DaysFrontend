

import react ,{useState,useEffect} from "react"

const Navbar = () => {

const [lastScrollY, setlastScrollY] = useState(0);
const [showNavbar, setshowNavbar] = useState(false);
const [toggle, settoggle] = useState(false)

useEffect(()=>{
   console.log(window.scrollY)
   const handleScroll = ()=>{
       
    if(window.scrollY > lastScrollY && window.scrollY > 50){
   
      setshowNavbar(true);
    }else{
      setshowNavbar(false);
    
    }

    setlastScrollY(window.scrollY);
   

   }
    window.addEventListener("scroll",handleScroll);

    return ()=>window.removeEventListener("scroll",handleScroll);
},[lastScrollY])

let navLinkClass = "relative pb-1  inline-block px-2 py-1 trasition-all duration-500 after:absolute after:w-0 after:h-0.5    after:left-0 after:bottom-0 after:bg-white hover:after:w-full after:transion-all after:duration-300 ";

  return (
    <nav className={` border shadow-md shadow-white fixed top-0 transition-all duration-150 left-0 bg-teal-900 flex justify-around w-full h-16 py-4  ${!showNavbar ? "translate-y-0" :"-translate-y-full "}`}>
      <h2 className="logo cursor-pointer text-2xl font-bold text-white">
        Logo
      </h2>
      <div className={`destop-menu hidden w-[50%] md:flex text-white font-bold justify-between `}>
        <a href="#" className={`${navLinkClass}`}>Home</a>
        <a href="#" className={`${navLinkClass}`}>About</a>
        <a href="#" className={`${navLinkClass}`}>Projects</a>
        <a href="#" className={`${navLinkClass}`}>Skills</a>
        <a href="#" className={`${navLinkClass}`}>Contacts</a>
      </div>

      <div className="menu md:hidden">
        <i onClick={()=>settoggle(true)} class="ri-menu-3-line text-2xl text-white  font-bold cursor-pointer"></i>
      </div>

      <div className={`mobil-menu absolute w-screen bg-teal-900 flex flex-col  left-0 top-0 justify-center items-center py-5 text-white gap-5 font-bold transition-all duration-700 ${toggle ? "translate-y-0 opacity-100" :"-translate-y-full opacity-0"}`}>
        <i onClick={()=>settoggle(false)} class="ri-close-line absolute top-5 right-8 cursor-pointer text-2xl"></i>
         <a href="#" className={`${navLinkClass}`}>Home</a>
        <a href="#" className={`${navLinkClass}`}>About</a>
        <a href="#" className={`${navLinkClass}`}>Projects</a>
        <a href="#" className={`${navLinkClass}`}>Skills</a>
        <a href="#" className={`${navLinkClass}`}>Contacts</a>

      </div>

    </nav>

  )
}

export default Navbar;