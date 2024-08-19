 export interface Post{
    postId:number,
    likes:number,
    content:string
    comments:number,
    createdAt:string

}

export interface PostsHome{
    name:string
    id:number
    username:string,
    postId:number,
    likes:number,
    content:string
    comments:number,
    createdAt:string
}

export interface User{
    id:number,
    name:string
    username:string
    bio:string,
    followersCount:number,
    followingCount:number,
    posts:Post[]

}
export const defaultAdminUser: User = {
    id: 0,
    name: "yourname",
    username: "@username",
    bio: "This is bio you can edit it",
    followersCount: 1000,
    followingCount: 100,
    posts:[
        { postId: 2002, content: "Welcome to Daily post this is a demo post.", likes: 400, comments: 50, createdAt: "2024-08-06T10:00:00Z" }
    ]

  };
