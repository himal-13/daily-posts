import { useParams } from "react-router-dom"
import { useUserContext } from "../utils/Context"
import Layout from "../utils/Layout"
import { useEffect, useState } from "react"
import { User } from "../utils/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons"
import { Divider } from "@mui/material"

const UserPage = () => {
    const{usersData,likePost,addToFollowList,removeFromFollowList,followList} = useUserContext()
    const[currentUser,setCurrentUser]= useState<User>( )
    const[isFollowed,setIsFollowed]= useState<boolean>()//followList.map(list=>list.id).includes(currentUser!.id)
    const params = useParams();


    const loadCurrentUser=()=>{
        const user=usersData.find(user=>user.username == params.userName)
        if(user){
        setCurrentUser(user)
            setIsFollowed(followList.some(list => list.id === user.id))

        }
    }
    useEffect(()=>{

        loadCurrentUser()

        // if()

    },[likePost,params.userName,followList])

    const handleFollwedBtn=()=>{
        if(!currentUser){
            return;
        }
        if(isFollowed){
            removeFromFollowList(currentUser!.id)

        }else{
            addToFollowList(currentUser!.id)

        }
        setIsFollowed(!isFollowed)
    }

    if(!currentUser){
        return(
            <h1>Current user is undefined</h1>
        )
    }

    return (
        <Layout>
            <div className="xl:w-[40vw] sm:w-[60vw] w-[90vw] min-h-[100vh]">
                <section className="mt-[10vh] mx-[15vw] flex-col justify-center items-center text-center">
                    <h3 className=""><FontAwesomeIcon icon={faUser} className="text-5xl rounded-full bg-slate-400 overflow-hidden"/></h3>
                    <h3 className="font-semibold text-2xl">{currentUser?.name}</h3>
                    <h3 className="text-xl">{currentUser?.username}</h3>
                    <h4>{currentUser?.bio}</h4>
                    <button type="button" className="px-3 py-1 border-2 border-gray-400 rounded-xl my-4" onClick={()=>handleFollwedBtn()}>{isFollowed?'unfollow':'follow'}</button>
                    
                </section>
                <Divider/>
                
                    { currentUser!.posts .length>0 && currentUser?.posts.map(post=>( 
                            <div key={post.postId} className=" flex-col items-start gap-2 py-4 border-b-2 border-gray-200 mx-[2vw]">
                                <div className="flex justify-between  ">
                                    
                                <h3 className=" flex items-center gap-2 text-xl"> <section className="rounded-full h-[40px] w-[40px] bg-slate-300 flex justify-center items-center ">
                                <FontAwesomeIcon icon={faUser} className="text-2xl"/></section><span>{currentUser.name}</span></h3>
                                </div>
                            <section className="flex-col">
                            <p className="my-2 text-2xl font-thin">{post.content}</p>
                            <div className="flex gap-6 text-sm text-gray-700"><span className="bg-slate-300 px-[9px] py-[5px] rounded-xl flex items-center gap-[2px] cursor-pointer" onClick={()=>likePost(currentUser.id,post.postId)}><FontAwesomeIcon icon={faThumbsUp}/>{post.likes}</span><span className="py-2"><FontAwesomeIcon icon={faComment}/>{post.comments}</span></div>
                
                            </section>
                
                            
                            </div>

                    ))
                }
                </div>
     

        </Layout>
    )
}

export default UserPage