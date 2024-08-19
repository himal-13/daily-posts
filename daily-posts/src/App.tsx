import { useUserContext } from "./utils/Context"
import Layout from "./utils/Layout"
import { useEffect, useState } from "react"
import { PostsHome } from "./utils/interfaces"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {   faComment,  faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons"
import './App.css'

function App() {
  const[posts,setPosts] = useState<PostsHome[]>([])
  const[activeRecent,setActiveRecent] = useState(true)

  const{usersData,likePost} = useUserContext()
  useEffect(()=>{
    const allPosts: PostsHome[] = usersData.flatMap(user =>
      user.posts.map(post=>({
        ...post,
        name:user.name,
        username:user.username,
        id:user.id

      }))
    );

    const sortedPosts = allPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setPosts(sortedPosts)

  },[likePost])

  function timeSince(date: string) {
    const now = new Date();
    const postDate = new Date(date);
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
  
    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
  
    for (const interval in intervals) {
      const time = Math.floor(seconds / intervals[interval]);
      if (time > 0) {
        return `${time} ${interval}${time > 1 ? 's' : ''} ago`;
      }
    }
  
    return 'just now';
  }



  return (
    <Layout>
      <div className=" w-[90vw] sm:w-[60vw] sm:mx-0 mx-auto xl:w-[40vw] px-[5vw]">
        <section className="h-[8vh] flex justify-center gap-[10vw] items-center fixed top-0 sm:left-[30vw] left-[10vw] w-[70vw] sm:w-[60vw] xl:w-[40vw] home-nav">
          <h3 className={`cursor-pointer font-semibold h-full flex justify-center items-center  ${activeRecent &&'border-b-4 border-blue-600'}`} onClick={()=>setActiveRecent(true)}>Recent</h3>
          <h3 className={`cursor-pointer font-semibold h-full flex justify-center items-center  ${!activeRecent &&'border-b-4 border-blue-600'}`} onClick={()=>setActiveRecent(false)}>Following</h3>

        </section>
        <div className="mt-[10vh]">
        {
          posts.map(post => (
            <div key={post.postId} className=" flex items-start gap-2 py-4 border-b-2 border-gray-200">
              <section className="rounded-full h-[40px] w-[40px] bg-slate-300 flex justify-center items-center ">
              <FontAwesomeIcon icon={faUser} className="text-2xl"/></section>
              <section className="">
                  <h3 className="text-xl">{post.username}</h3>
              <p className="my-2 text-2xl font-thin">{post.content}</p>
              <div className="flex gap-6 text-sm text-gray-700"><span className="bg-slate-300 px-[9px] py-[5px] rounded-xl flex items-center gap-[2px] cursor-pointer" onClick={()=>likePost(post.id,post.postId)}><FontAwesomeIcon icon={faThumbsUp}/>{post.likes}</span><span className="py-2"><FontAwesomeIcon icon={faComment}/>{post.comments}</span></div>
              <span>{timeSince(post.createdAt)}</span>

              </section>

              
            </div>
          ))
        }
        </div>
      
      </div>
    </Layout>

  )
}

export default App
