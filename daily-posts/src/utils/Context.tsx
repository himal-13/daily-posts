import { createContext, ReactNode, useContext,  useState } from "react"
import { defaultAdminUser, Post, User } from "./interfaces"
import { usersDetails } from "./UserDetails.ts"



interface UsersContextType{
    usersData:User[],
    currentUser:User,
    followList:User[]
    getUsersById:(id:number)=>User|undefined,
    createPost:(content:string)=>void,
    editPost: ( postId: number, newContent: string) => void;
    deletePost: ( postId: number) => void
    updateUserName: ( newName: string) => void
    likePost:(userId:number,postId:number)=>void
    updateName:(newName:string)=>void,
    updateBio:(newBio:string)=>void,
    addToFollowList:(userId:number)=>void,
    removeFromFollowList:(userId:number)=>void

}

const UsersContext = createContext<UsersContextType | undefined>(undefined)

export const UserProvider = ({children}:{children:ReactNode}) => {
    const[usersData,setUsersData]=useState<User[]>([defaultAdminUser,...usersDetails])
    const[currentUser,setCurrentUser] = useState<User>(defaultAdminUser)
    const[followList,setFollowList]= useState<User[]>([usersData[Math.ceil(Math.random() *19)]])

    const addToFollowList=(userId:number)=>{
        const user = usersData.find(user=>user.id===userId)
        if(user)
        setFollowList([user,...followList])

    }
    const removeFromFollowList=(userId:number)=>{
        setFollowList(followList.filter(user=>user.id !== userId))
    }



    const getUsersById =(id:number)=>usersData.find(user=>user.id===id);

        const createPost = (content: string) => {
            const newPost: Post = {
            postId: Date.now(),
            content,
            likes: 0,
            createdAt: new Date().toISOString(),
            comments:0
            };
        
            setUsersData((prevUsers) =>
            prevUsers.map((user) =>
                user.id === currentUser.id
                ? {
                    ...user,
                    posts: [newPost, ...user.posts],
                    }
                : user
            )
            );
        
            // Update currentUser to include the new post
            setCurrentUser((prevUser) => ({
            ...prevUser,
            posts: [newPost, ...prevUser.posts],
            }));
        };
        
        const editPost = (postId: number, newContent: string) => {
            setUsersData((prevUsers) =>
            prevUsers.map((user) =>
                user.id === currentUser.id
                ? {
                    ...user,
                    posts: user.posts.map((post) =>
                        post.postId === postId ? { ...post, content: newContent } : post
                    ),
                    }
                : user
            )
            );
        
            // Update currentUser to reflect the edited post
            setCurrentUser((prevUser) => ({
            ...prevUser,
            posts: prevUser.posts.map((post) =>
                post.postId === postId ? { ...post, content: newContent } : post
            ),
            }));
        };
        
        const deletePost = (postId: number) => {
            setUsersData((prevUsers) =>
            prevUsers.map((user) =>
                user.id === currentUser.id
                ? {
                    ...user,
                    posts: user.posts.filter((post) => post.postId !== postId),
                    }
                : user
            )
            );
        
            // Update currentUser to remove the deleted post
            setCurrentUser((prevUser) => ({
            ...prevUser,
            posts: prevUser.posts.filter((post) => post.postId !== postId),
            }));
        };

            const likePost = (userId: number, postId: number) => {
                setUsersData((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId
                    ? {
                        ...user,
                        posts: user.posts.map((post) =>
                            post.postId === postId ? { ...post, likes: post.likes + 1 } : post
                        ),
                        }
                    : user
                )
                );
            
                if (currentUser.id === userId) {
                setCurrentUser((prevUser) => ({
                    ...prevUser,
                    posts: prevUser.posts.map((post) =>
                    post.postId === postId ? { ...post, likes: post.likes + 1 } : post
                    ),
                }));
                }
            };
            const updateUserName=(newName:string)=>{
                setCurrentUser((prevUser)=>({
                    ...prevUser,
                    username:newName

                }
                ))
            }
            const updateName=(newName:string)=>{
                setCurrentUser((prevUser)=>({
                    ...prevUser,
                    name:newName
                }))
            }
            const updateBio = (newBio:string)=>{
                setCurrentUser((prevUser)=>({
                    ...prevUser,
                    bio:newBio
                    
                }))
            }

        
    return(
        <UsersContext.Provider value={{usersData,getUsersById,createPost,editPost,deletePost,updateUserName,likePost,currentUser,updateName,updateBio,removeFromFollowList,addToFollowList,followList}}>
            {children}

        </UsersContext.Provider>
    )
}

export const useUserContext = ()=>{
    const context = useContext(UsersContext)
    if(!context){
        throw new Error('context not found')

    }

    return context;
}
