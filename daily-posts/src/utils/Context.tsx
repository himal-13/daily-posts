import { createContext, ReactNode, useContext,  useState } from "react"
import { defaultAdminUser, Post, User } from "./interfaces"



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











const usersDetails:User[] = [
    { id: 1, name: "John Doe", username: "@johndoe", bio: "Tech enthusiast, coder, and coffee lover.", followersCount: 1200, followingCount: 180, posts: [
    { postId: 101, content: "Just finished a great coding session!", likes: 150, comments: 20, createdAt: "2024-08-14T12:34:56Z" },
    { postId: 102, content: "Loving the new JavaScript features in ES2024!", likes: 200, comments: 30, createdAt: "2024-08-13T10:20:30Z" }
    ] },

    { id: 2, name: "Jane Smith", username: "@janesmith", bio: "Designer, traveler, and foodie.", followersCount: 950, followingCount: 300, posts: [
    { postId: 201, content: "Exploring new design trends for 2024.", likes: 100, comments: 15, createdAt: "2024-08-12T08:15:45Z" },
    { postId: 202, content: "Had an amazing time hiking this weekend!", likes: 220, comments: 40, createdAt: "2024-08-11T14:22:10Z" }
    ] },

    { id: 3, name: "Alex Johnson", username: "@alexjohnson", bio: "Entrepreneur, speaker, and mentor.", followersCount: 5000, followingCount: 1200, posts: [
    { postId: 301, content: "Just launched my new startup!", likes: 500, comments: 80, createdAt: "2024-08-10T09:45:20Z" },
    { postId: 302, content: "Thank you to everyone who attended my talk today.", likes: 300, comments: 50, createdAt: "2024-08-09T16:30:00Z" }
    ] },

    { id: 4, name: "Emily Carter", username: "@emilycarter", bio: "Passionate about art, photography, and traveling.", followersCount: 3400, followingCount: 950, posts: [
    { postId: 401, content: "Captured this stunning sunset at the beach.", likes: 420, comments: 60, createdAt: "2024-08-14T18:20:00Z" },
    { postId: 402, content: "Exploring the local art gallery today!", likes: 280, comments: 30, createdAt: "2024-08-12T11:45:30Z" }
    ] },

    { id: 5, name: "Michael Brown", username: "@michaelbrown", bio: "Fitness trainer and healthy living advocate.", followersCount: 2600, followingCount: 600, posts: [
    { postId: 501, content: "Early morning workout done! Feeling great.", likes: 300, comments: 25, createdAt: "2024-08-14T06:30:15Z" },
    { postId: 502, content: "Healthy meals for the week planned out.", likes: 450, comments: 50, createdAt: "2024-08-13T14:10:40Z" }
    ] },

    { id: 6, name: "Sophia Lee", username: "@sophialee", bio: "Book lover, writer, and cat person.", followersCount: 1800, followingCount: 450, posts: [
    { postId: 601, content: "Just finished reading an amazing book!", likes: 270, comments: 35, createdAt: "2024-08-13T22:15:50Z" },
    { postId: 602, content: "Writing a new story about a mysterious cat.", likes: 320, comments: 45, createdAt: "2024-08-11T10:30:00Z" }
    ] },

    { id: 7, name: "David Green", username: "@davidgreen", bio: "Photographer with a love for nature and landscapes.", followersCount: 5000, followingCount: 1200, posts: [
    { postId: 701, content: "Exploring the mountains today.", likes: 600, comments: 70, createdAt: "2024-08-10T09:45:20Z" },
    { postId: 702, content: "Morning dew on the leaves.", likes: 480, comments: 55, createdAt: "2024-08-09T07:00:00Z" }
    ] },

    { id: 8, name: "Emma Wilson", username: "@emmawilson", bio: "Music lover and aspiring musician.", followersCount: 2200, followingCount: 700, posts: [
    { postId: 801, content: "Learning to play the guitar.", likes: 350, comments: 40, createdAt: "2024-08-12T15:20:30Z" },
    { postId: 802, content: "Favorite songs on repeat all day.", likes: 280, comments: 30, createdAt: "2024-08-11T20:10:45Z" }
    ] },

    { id: 9, name: "James King", username: "@jamesking", bio: "Traveler and adventurer.", followersCount: 4300, followingCount: 1200, posts: [
    { postId: 901, content: "Just arrived in Japan, can't wait to explore!", likes: 520, comments: 65, createdAt: "2024-08-08T14:00:00Z" },
    { postId: 902, content: "Visited an ancient temple today.", likes: 490, comments: 60, createdAt: "2024-08-07T17:30:00Z" }
    ] },

    { id: 10, name: "Lily Evans", username: "@lilyevans", bio: "Fashion blogger and designer.", followersCount: 3800, followingCount: 850, posts: [
    { postId: 1001, content: "New summer collection out now!", likes: 450, comments: 55, createdAt: "2024-08-05T12:00:00Z" },
    { postId: 1002, content: "Behind the scenes of my latest photoshoot.", likes: 420, comments: 50, createdAt: "2024-08-04T09:00:00Z" }
    ] },

    { id: 11, name: "Chris Martin", username: "@chrismartin", bio: "Chef and food critic.", followersCount: 3500, followingCount: 900, posts: [
    { postId: 1101, content: "Cooked a delicious new recipe today.", likes: 400, comments: 45, createdAt: "2024-08-03T18:30:00Z" },
    { postId: 1102, content: "Tried out a new restaurant in town.", likes: 380, comments: 40, createdAt: "2024-08-02T20:00:00Z" }
    ] },

    { id: 12, name: "Olivia White", username: "@oliviawhite", bio: "Mother of two, sharing my parenting journey.", followersCount: 2900, followingCount: 650, posts: [
    { postId: 1201, content: "Fun day at the park with the kids.", likes: 300, comments: 35, createdAt: "2024-08-10T14:00:00Z" },
    { postId: 1202, content: "Homemade snacks for the little ones.", likes: 280, comments: 30, createdAt: "2024-08-09T11:00:00Z" }
    ] },

    { id: 13, name: "William Harris", username: "@williamharris", bio: "Fitness coach, helping you stay in shape.", followersCount: 4700, followingCount: 1100, posts: [
    { postId: 1301, content: "Morning run by the beach.", likes: 420, comments: 50, createdAt: "2024-08-07T06:00:00Z" },
    { postId: 1302, content: "Healthy smoothie recipes for breakfast.", likes: 400, comments: 45, createdAt: "2024-08-06T08:00:00Z" }
    ] },

    { id: 14, name: "Grace Thompson", username: "@gracethompson", bio: "Yoga instructor and mindfulness coach.", followersCount: 3200, followingCount: 800, posts: [
    { postId: 1401, content: "Sunrise yoga is the best way to start the day.", likes: 450, comments: 55, createdAt: "2024-08-04T05:30:00Z" },
    { postId: 1402, content: "Practicing mindfulness and meditation.", likes: 380, comments: 40, createdAt: "2024-08-03T07:00:00Z" }
    ] },

    { id: 15, name: "Lucas Young", username: "@lucasyoung", bio: "Tech geek, sharing the latest in gadgets and apps.", followersCount: 4900, followingCount: 1200, posts: [
    { postId: 1501, content: "Unboxing the latest smartphone.", likes: 520, comments: 65, createdAt: "2024-08-08T09:00:00Z" },
    { postId: 1502, content: "Top apps to boost productivity.", likes: 490, comments: 60, createdAt: "2024-08-07T11:00:00Z" }
    ] },

    { id: 16, name: "Hannah Scott", username: "@hannahscott", bio: "Traveler, sharing my adventures around the world.", followersCount: 3700, followingCount: 950, posts: [
    { postId: 1601, content: "Exploring the streets of Paris.", likes: 430, comments: 55, createdAt: "2024-08-06T16:00:00Z" },
    { postId: 1602, content: "Visiting ancient ruins in Greece.", likes: 410, comments: 50, createdAt: "2024-08-05T17:00:00Z" }
    ] },

    { id: 17, name: "Ethan Brown", username: "@ethanbrown", bio: "Gamer and streamer.", followersCount: 4500, followingCount: 1000, posts: [
    { postId: 1701, content: "Streaming my latest gameplay tonight!", likes: 520, comments: 70, createdAt: "2024-08-04T18:00:00Z" },
    { postId: 1702, content: "New game review coming soon.", likes: 480, comments: 60, createdAt: "2024-08-03T20:00:00Z" }
    ] },

    { id: 18, name: "Ava Wright", username: "@avawright", bio: "Fashion and beauty influencer.", followersCount: 5200, followingCount: 1300, posts: [
    { postId: 1801, content: "My favorite skincare products.", likes: 550, comments: 70, createdAt: "2024-08-08T08:00:00Z" },
    { postId: 1802, content: "Summer fashion trends 2024.", likes: 530, comments: 65, createdAt: "2024-08-07T10:00:00Z" }
    ] },

    { id: 19, name: "Henry Taylor", username: "@henrytaylor", bio: "Entrepreneur and business coach.", followersCount: 6000, followingCount: 1500, posts: [
    { postId: 1901, content: "Tips for starting your own business.", likes: 620, comments: 75, createdAt: "2024-08-02T08:00:00Z" },
    { postId: 1902, content: "Networking strategies that work.", likes: 600, comments: 70, createdAt: "2024-08-01T10:00:00Z" }
    ] },

    { id: 20, name: "Mia Davis", username: "@miadavis", bio: "Blogger and digital nomad.", followersCount: 3400, followingCount: 900, posts: [
    { postId: 2001, content: "Working from a beachside cafe today.", likes: 420, comments: 55, createdAt: "2024-08-07T14:00:00Z" },
    { postId: 2002, content: "How to stay productive while traveling.", likes: 400, comments: 50, createdAt: "2024-08-06T10:00:00Z" }
    ] }
];
