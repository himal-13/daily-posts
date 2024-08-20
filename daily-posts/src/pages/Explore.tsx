import AsideComp from "../components/AsideComp"
import Navbar from "../components/Navbar"

const Explore = () => {
  return (
    
    <div className="flex justify-center sm:justify-start ">
        <Navbar/>
        <section className="ml-0 sm:ml-[29vw] w-[60vw] sm:w-[40vw] pt-[2vh] flex-col sm:border-r-2 border-gray-300 h-[40vh] " >

            <AsideComp/>
            <div className="border-2 border-gray-300 w-4/5 px-[10vw] mx-auto">
                <h3>People you may know</h3>
                <div className="w-full">
                    {}

                </div>


            </div>

        </section>

    </div>
  )
}

export default Explore