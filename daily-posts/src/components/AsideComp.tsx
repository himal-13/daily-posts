import { useEffect, useState } from "react"
import { useUserContext } from "../utils/Context"
import { Link } from "react-router-dom"
import { PostsHome, User } from "../utils/interfaces"
interface UsersPost{
    name:string,
    username:string,
    content:string
}



const AsideComp = () => {
    const[searchInput,setSearchInput] = useState('')
    const{usersData} = useUserContext()
    const[usersName,setUsersName] = useState<string[]>([])
    const[usersPost,setUsersPost]= useState<UsersPost[]>([])
    const[hintPersonSearch,setHintPersonSearch]= useState<string[]>([])
    const[hintPostsSearch,setHintPostsSearch]= useState<UsersPost[]>([])

    const[searchPerson,setSearchPerson]= useState(true)

    const allPosts:PostsHome[] = usersData.flatMap(user =>
        user.posts.map(post=>({
        ...post,
        name:user.name,
        username:user.username,
        id:user.id
    
    })))

    useEffect(()=>{
        const users:User[]=usersData.filter(user=>user.id !== 0)
        setUsersName(users.map(name=>name.username))
        setUsersPost(allPosts.map(post=>({
            name:post.name,
            username:post.username,
            content:post.content
        })
            
        ))


        if(searchPerson){
            setHintPersonSearch(usersName.filter(name=>name.includes(searchInput)))

        }else{
            setHintPostsSearch(usersPost.filter(post=>post.content.includes(searchInput)))

        }


    },[searchPerson,searchInput])

 

    const handleInputChange =(value:string)=>{
        setSearchInput(value)
 

    }
    return (
        <section className="relative w-[40vw] xl:w-[15vw]">
            <div className="flex-col items-center search fixed min-w-[15vw] bg-white top-0 py-[2vh]">
                <input type="text" className="rounded-lg px-4 py-2 w-3/4 border-2 border-gray-600" placeholder="search" value={searchInput} onChange={(e)=>handleInputChange(e.target.value)}/>
                <ul className="flex gap-4 text-xl  py-[1vh]   ">
                        <li className={`px-4 py-2 cursor-pointer rounded-lg ${searchPerson && 'bg-gray-300'}`} onClick={()=>setSearchPerson(true)}>Person</li>
                        <li className={`px-4 py-2 cursor-pointer rounded-lg ${!searchPerson && 'bg-gray-300'}`} onClick={()=>setSearchPerson(false)}>Post</li>

                    </ul>
            </div>
            <div className=" searched-items mt-[15vh]">
                {hintPersonSearch.length>0  && searchPerson?
                    <div className="">
        
                    {hintPersonSearch.map((hint,index)=>(
                        <Link to={`/user/${hint}`} key={index}><section  className="max-w-full my-2 py-2 px-4 bg-slate-100 rounded-lg">
                            <h3 className=" text-xl">
                                {hint}
                            </h3>
                        </section></Link>
                    ))}
                </div>
                
                :
                    hintPostsSearch.length>0 && !searchPerson?
                    <>
                    
                    <div className="">
    
                        {hintPostsSearch.map((hint,index)=>(
                            <Link to={`/user/${hint.username}`} key={index}><section key={index} className="max-w-full my-2 py-2 px-4 bg-slate-100 rounded-lg">
                                <article className=" text-xl ">
                                    <span className="font-thin">{hint.content}</span>
                                    <p>by {hint.name}</p>
                                </article>
                            </section></Link>
                        ))}
                    </div>
                    </>
                    :
                    <h3 className="my-4">nothing to show</h3>
                }
            </div>
            <hr className="py-2 w-full"/>
        
        </section>
    )
}

export default AsideComp