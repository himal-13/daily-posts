import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Layout from "../utils/Layout"
import {  faComment, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useUserContext } from "../utils/Context"
import { Divider} from "@mui/material"
import { Post } from "../utils/interfaces"
import PostMenu from "../components/PostMenu"
import EditProfile from "../components/EditProfile"

const Profile = () => {
    const{likePost,createPost,currentUser} = useUserContext()
    const[postContent,setPostContent] = useState('')

    useEffect(()=>{
        

    },[currentUser])


    const handlePostButton=()=>{
        if(postContent.trim() !==''){
        createPost(postContent)
        setPostContent('')
        }

    }
    const handleLike=(post:Post)=>{
        likePost(currentUser.id,post.postId)

    }



    return (
        <Layout>
            <div className="xl:w-[40vw] sm:w-[60vw] w-[90vw] min-h-[100vh]">
                <section className="mt-[10vh] mx-[15vw] flex-col justify-center items-center text-center">
                    <h3 className=""><FontAwesomeIcon icon={faUser} className="text-5xl rounded-full bg-slate-400 overflow-hidden"/></h3>
                    <h3 className="font-semibold text-2xl">{currentUser.name}</h3>
                    <h3 className="text-xl">{currentUser.username}</h3>
                    <h4>{currentUser.bio}</h4>
                    <EditProfile/>
                    
                </section>
                <Divider/>
                <section className="py-4 flex justify-center gap-2 w-full">
                    <input type="text" className="px-4 py-2 rounded-xl w-2/3" value={postContent} onChange={(e)=>setPostContent(e.target.value)} placeholder="Write a story"/>
                    <button type="button" className="bg-gray-300 px-4 py-2 rounded-lg"  onClick={handlePostButton}>post</button>
                </section>
                <section>
                    { currentUser.posts .length>0 && currentUser.posts.map(post=>( 
                            <div key={post.postId} className=" flex-col items-start gap-2 py-4 border-b-2 border-gray-200 mx-[2vw]">
                                <div className="flex justify-between  ">
                                    
                                <h3 className=" flex items-center gap-2 text-xl"> <section className="rounded-full h-[40px] w-[40px] bg-slate-300 flex justify-center items-center ">
                                <FontAwesomeIcon icon={faUser} className="text-2xl"/></section><span>{currentUser.name}</span></h3>
                                <PostMenu postId={post.postId}/>
                                </div>
                            <section className="flex-col">
                            <p className="my-2 text-2xl font-thin">{post.content}</p>
                            <div className="flex gap-6 text-sm text-gray-700"><span className="bg-slate-300 px-[9px] py-[5px] rounded-xl flex items-center gap-[2px] cursor-pointer" onClick={()=>handleLike(post)}><FontAwesomeIcon icon={faThumbsUp}/>{post.likes}</span><span className="py-2"><FontAwesomeIcon icon={faComment}/>{post.comments}</span></div>
                
                            </section>
                
                            
                            </div>

                    ))
                }
                </section>
     

            </div>
        </Layout>
    )
}

export default Profile