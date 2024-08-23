import AsideComp from "../components/AsideComp"
import Navbar from "../components/Navbar"

const Explore = () => {
  return (
    
    <div className="flex justify-center sm:justify-start w-[50vw] mx-auto">
        <Navbar/>
        <section className="ml-0 sm:ml-[29vw] w-[60vw] sm:w-[40vw] pt-[2vh] flex-col items-center  " >

            <AsideComp/>
          
        </section>

    </div>
  )
}

export default Explore