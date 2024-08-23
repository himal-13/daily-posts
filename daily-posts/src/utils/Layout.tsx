import { ReactNode } from "react"
import Navbar from "../components/Navbar"
import '../App.css'
import AsideComp from "../components/AsideComp"
import { Fab } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"

const Layout = ({children}:{children:ReactNode}) => {
  return (
    <>
    <div className="flex justify-center sm:justify-start ">
        <Navbar/>
        <main className="ml-0 sm:ml-[29vw] xl:border-r-2 xl:border-gray-300 ">
        {children}
        </main>
        <aside className="fixed pt-[1vh] top-0 px-[5vw] left-[70vw] hidden xl:block mx-auto p-3  h-[90vh] overflow-y-scroll ">
          <AsideComp/>
        </aside>
        <div className="fixed bottom-4 xl:left-[65vw]  left-[80vw]">
        <Fab color="primary" aria-label="add" >
        <FontAwesomeIcon icon={faAdd} />
      </Fab></div>
    </div>
    </>
  )
}

export default Layout