import { faSearch, } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

const AsideComp = () => {
    const[searchInput,setSearchInput] = useState('')
    return (
        <section className="w-4/5 mx-auto">
            <div className="flex items-center search ">
                <input type="text" className="rounded-lg px-4 py-2 w-3/4 border-2 border-gray-600" placeholder="search" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
                <FontAwesomeIcon icon={faSearch} className="cursor-pointer text-2xl mx-2 p-2 bg-gray-300"/>
            </div>
            <div className="h-[30vh] overflow-y-scroll searched-items">
                <h3>Search things</h3>
            </div>
            {/* <div className="border-2 border-gray-200 ">
                <h3>People to follow</h3>
                {usersData.map(user=>
                    (
                        <div className="flex py-4 m-2 justify-between">
                            <section className="flex gap-2 text-2xl items-center">
                                <FontAwesomeIcon icon={faUser}/>
                                <span>{user.name}</span>
                            </section>
                            <button type="button" className="b">follow</button>
                            


                        </div>
                    )
                )}

            </div> */}
        </section>
    )
}

export default AsideComp