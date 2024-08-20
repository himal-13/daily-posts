import { faBars, faHome,  faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { NavLink } from "react-router-dom"




const Navbar = () => {
    const[showNav,setShowNav] = useState(false)

    return (
        <>


        <nav className="px-[2vw]  h-[100vh] w-[20vw] fixed top-0 sm:top-[1vh] left-0  z-10 sm:left-[5vw] md:left-[9vw] flex-col items-center justify-end sm:border-r-2 sm:border-gray-300 ">
            <div className="">
                <FontAwesomeIcon icon={showNav?faXmark:faBars} className="p-2 cursor-pointer sm:hidden block text-2xl bg-white" onClick={()=>setShowNav(!showNav)}/>
            </div>
            <div className={` sm:translate-x-0 transition-transform h-full w-[50vw] sm:w-auto border-r-2 border-gray-400 sm:border-none ${showNav?'translate-x-0 bg-white z-10':'-translate-x-[100vw]'}`}>
            <h1 className="text-4xl md:text-5xl flex justify-center">D<span className="text-red-600">P</span></h1>
            <NavLink to='/' className={({ isActive }) => (isActive ? 'active-nav' : '')}><h3><FontAwesomeIcon icon={faHome}/><span>Home</span></h3></NavLink>
            <NavLink to='/profile' className={({ isActive }) => (isActive ? 'active-nav' : '')}><h3 ><FontAwesomeIcon icon={faUser}/><span>Profile</span></h3></NavLink>
            {/* <NavLink to='/explore'className={({ isActive }) => (isActive ? 'active-nav' : '')}><h3><FontAwesomeIcon icon={faSearchPlus}/><span>Explore</span></h3></NavLink>
            <h3><FontAwesomeIcon icon={faGear}/><span>Settings</span></h3> */}
            </div>
        </nav>
        </>
    )
}

export default Navbar